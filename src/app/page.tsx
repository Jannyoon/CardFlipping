'use client';
import { SignedIn, SignedOut, SignOutButton, useAuth } from '@clerk/nextjs'

import style from './page.module.scss';
import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { User } from '$/.prisma/client';
import axios from '$/axios';

import Image from '$/next/image';
import { useGameStore } from '@/store/game-store';
import { useModal } from '@/store/modal-store';

const Home = () => {
  const { userId } = useAuth();
  const {userPrevData, setUserPrevData} = useGameStore();
  const [nowUser, setNowUser] = useState<User|null>(null); //
  const [username, setUsername] = useState<string>(""); //
  

  //보류
  const handleAddSubmit = useCallback(async (nickname:string) => {
    if (!userId || !nickname){
      console.log("userId 존재하지 않음. api 중단.");
      return;
    }
    try {
      const response = await axios.post('/api/user', {userId, username:nickname});
      console.log("성공한 응답", response);
      if (response.data){
        setNowUser(response.data);      
        setUsername(nickname);    
      }
    } catch (error){
      alert("유저 등록 실패");
      if (axios.isAxiosError(error)) {
        console.log("Axios 에러:", error.response?.data || error.message);
      } else {
        console.log("기타 에러:", error);
      }
    }
  }, [userId]);


  const { openModal, closeModal } = useModal();
  const { gameState, onReset } = useGameStore();

  //type, data, callback
  useEffect(()=>{
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/api/user');
        console.log("fetch 완료. data를 출력합시다", data);
        if (!data.user?.userId){
          alert("유저가 존재하지 않습니다.") //debug
          openModal("signUp", {userId: userId}, (username)=>handleAddSubmit(username));
        }
        if (data.user?.userId){
          setNowUser(data.user);
          setUserPrevData(data);
        }
      } catch (error){
        alert("서버 오류가 발생했습니다.");
        console.log("fetch Error", error);
      }
    }

    if (userId && !nowUser){
      fetchUser();
    }
    if (!userId){
      setNowUser(null);
      setUsername("");
      setUserPrevData(null);
    }
    console.log("store에 저장된 prevData", userPrevData);
  },[userId, username, nowUser, openModal, handleAddSubmit, gameState, onReset, userPrevData, setUserPrevData]);


  useEffect(()=>{
    closeModal();
    onReset();
  },[closeModal, onReset]);

  return (
    <div id={style.home}>
      {nowUser && userId && (
        <div className={style.bannerImage}>
          <Image src="/Main.png" alt="banner" fill 
          sizes='(min-width:1536px) 100vw, 0px'/>
        </div>)
      }
      <div className={style.title}>카드 뒤집기</div>
      <div className={style.btns}>
        <SignedOut>
          <Link href={"/sign-in"} className={style.btn}>로그인</Link>
          <Link href={"/game"} className={style.btn}>게임하기(비회원)</Link>
        </SignedOut>
        <SignedIn>
          {nowUser && userId && <p><span>{nowUser.username}</span> 님 반가워요!</p>}  
          <SignOutButton>
            <button className={style.logOutBtn}>로그아웃</button>
          </SignOutButton>
          <Link href={"/game"} className={style.btn}>게임하기</Link>
        </SignedIn>
        <Link href={"/ranking"} className={style.btn}>랭킹</Link>
      </div>
      {nowUser && userId && (
        <div style={{'textAlign':'center', 'fontSize':'0.8rem'}}>
          <p>개발 - @즈토</p>
          <p>일러스트 - @0312</p>
          <p>아이디어 - @솔로몬</p>
        </div>
      )}
    </div>
  );  
  
}
 
export default Home;
