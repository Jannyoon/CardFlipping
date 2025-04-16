'use client';

import { useAuth } from '@clerk/nextjs';
import Image from '$/next/image';
import { useEffect, useCallback, useState } from 'react';
import axios from '$/axios';

import { useGameStore } from '@/store/game-store';
import { useModal } from '@/store/modal-store';
import { useShallow } from 'zustand/react/shallow';
import style from './page.module.scss';
import MenuComponents from '@/common/ClerkComponent';
import { Result, User } from '$/.prisma/client';

interface DataType {
  user ?: User,
  result ?: Result[]
}



const Home = () => {
  const { userId, isLoaded } = useAuth();  
  const [data, setData] = useState<DataType|null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string|null>(null);
  const onReset = useGameStore((state)=> state.onReset);

  const { openModal, closeModal } = useModal(
    useShallow((state)=>({ 
      openModal : state.openModal, 
      closeModal:state.closeModal 
    }))
  )


  //보류
  const handleAddSubmit = useCallback(async (nickname:string) => {
    if (!userId || !nickname) return;
    try {
      const response = await axios.post('/api/user', {userId, username:nickname});
      console.log("성공한 응답", response);
      setUsername(nickname);
      const userKey = {
        userId,
        username: nickname
      };
      localStorage.setItem('userKey', JSON.stringify(userKey));
    } catch (error){
      alert("유저 등록 실패");
      if (axios.isAxiosError(error)) {
        console.log("Axios 에러:", error.response?.data || error.message);
      } else {
        console.log("기타 에러:", error);
      }
    } 
  }, [userId]);


  const fetchUser = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      const { data }:{data:DataType} = await axios.get('/api/user');
      if (!data) return;
      if (data && !data.user?.userId){
        alert("유저가 존재하지 않습니다."); //debug
        openModal("signUp", {userId: userId}, (username)=>{
          handleAddSubmit(username);
        });
      }
      if (data.user?.username){
        console.log("현재 데이터를 출력", data.user);
        const userKey = {
          userId,
          username: data.user.username
        };
        localStorage.setItem('userKey', JSON.stringify(userKey));
        localStorage.setItem('userData', JSON.stringify(data));
      }
      setData(data); //api에서 유저 없으면 알아서 user : null이 될 거임
      if (data.user && data.user.username) setUsername(data.user.username);
    } catch(error){
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [userId, handleAddSubmit, openModal]);

  useEffect(()=>{
    closeModal();
    onReset();

    if (typeof window==='undefined') return;
    const savedUserKey = localStorage.getItem('userKey');
    console.log("현재 userId", userId, 'localStorage Key', savedUserKey);

    if (savedUserKey && JSON.parse(savedUserKey).userId!==userId){
      console.log("유저 변경 감지");
      localStorage.removeItem('userKey');
      localStorage.removeItem('userData');
      setUsername(null);
      setData(null);
      return
    }
    if (!userId){
      localStorage.removeItem('userKey');
      localStorage.removeItem('userData');
      setUsername(null);
      setData(null);
      return
    }

    if (isLoaded && userId){
      fetchUser();
    }
  },[closeModal, onReset, isLoaded, userId, username, fetchUser]);



  return (
    <div id={style.home}>
      {data && (
        <div className={style.bannerImage}>
          <Image src="/MainWebP.webp" alt="banner" fill 
            sizes='(min-width:1536px) 100vw'
            loading="lazy" 
            quality={80}
          />
        </div>)
      }
      <div className={style.title}>카드 뒤집기</div>
      <div className={style.btns}>
        <MenuComponents isLoading={isLoading} data={data} username={username}/>
      </div>
      {data && (
        <div style={{'textAlign':'center', 'fontSize':'0.8rem', 'color':'black'}}>
          <p>개발 - @즈토</p>
          <p>일러스트 - @0312</p>
          <p>아이디어 - @솔로몬</p>
        </div>
      )}
    </div>
  );  
  
}
 
export default Home;
