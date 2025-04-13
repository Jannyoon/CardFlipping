'use client';

import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
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

const fetchUser = async () => {
  console.log('fetched');
  const cached = localStorage.getItem('cachedUser');
  if (cached){
    console.log("캐시 유저 있다!", cached);
    const parsed = JSON.parse(cached);
    const now = Date.now();
    const savedAt = parsed.savedAt ?? 0;

    if ((now - savedAt)< 1000*60*5){ //캐싱 예정 시간보다 적으면
      return parsed.data;
    }
  }
  const { data }:{data:DataType} = await axios.get('/api/user');
  if (data?.user?.userId){
    //console.log("데이터 캐싱한다!", data);
    localStorage.setItem('cachedUser', JSON.stringify({ 
      data, 
      savedAt: Date.now() 
    }));
  }
  return data; //api에서 유저 없으면 알아서 user : null이 될 거임
};

const Home = () => {
  const { userId, isLoaded } = useAuth();  
  const [username, setUsername] = useState<string|null>(null);
  const {setUserPrevData, onReset} = useGameStore(
    useShallow((state)=>({
      setUserPrevData : state.setUserPrevData,
      onReset: state.onReset
    }))
  );

  const { openModal, closeModal } = useModal(
    useShallow((state)=>({ 
      openModal : state.openModal, 
      closeModal:state.closeModal 
    }))
  )

  const {data, isLoading, error}= useQuery({
    queryKey:['user', userId],
    queryFn : fetchUser,
    enabled : isLoaded && !!userId,
    retry : 1,
    staleTime : 1000*60*5,
    throwOnError : true
  })

  //보류
  const handleAddSubmit = useCallback(async (nickname:string) => {
    if (!userId || !nickname){
      return;
    }
    try {
      const response = await axios.post('/api/user', {userId, username:nickname});
      console.log("성공한 응답", response);
      setUsername(nickname);
    } catch (error){
      alert("유저 등록 실패");
      if (axios.isAxiosError(error)) {
        console.log("Axios 에러:", error.response?.data || error.message);
      } else {
        console.log("기타 에러:", error);
      }
    }
  }, [userId]);

  useEffect(()=>{
    if (!data){
      const cached = localStorage.getItem('cachedUser');
      if (cached) localStorage.removeItem('cachedUser');
      return;}
    if (!data?.user?.userId){
      alert("유저가 존재하지 않습니다."); //debug
      openModal("signUp", {userId: userId}, (username)=>{
        handleAddSubmit(username);
      });
    }
    if (data.user?.userId){
      setUserPrevData(data);
    }
    if (error){
      console.log(error);
      alert("서버 오류가 발생했습니다.")
    }
  }, [data, openModal, userId, handleAddSubmit, setUserPrevData, error])


  useEffect(()=>{
    closeModal();
    onReset();
  },[closeModal, onReset]);

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
