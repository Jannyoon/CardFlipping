'use client';
import { SignedIn, SignedOut, SignOutButton, useAuth } from '@clerk/nextjs'
import {
  useQuery,
} from '@tanstack/react-query';
import Image from '$/next/image';
import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { User } from '$/.prisma/client';
import axios from '$/axios';

import { useGameStore } from '@/store/game-store';
import { useModal } from '@/store/modal-store';
import { useShallow } from 'zustand/react/shallow';
import style from './page.module.scss';

const fetchUser = async () => {
  const { data } = await axios.get('/api/user');
  return data; //api에서 유저 없으면 알아서 user : null이 될 거임
};

const Home = () => {
  const { userId } = useAuth();  

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
    enabled : !!userId,
    retry : 1,
    staleTime : 1000*60*5,
    throwOnError : true
  })


  console.log("reactQuery 결과", data);
  //보류
  const handleAddSubmit = useCallback(async (nickname:string) => {
    if (!userId || !nickname){
      console.log("userId 존재하지 않음. api 중단.");
      return;
    }
    try {
      const response = await axios.post('/api/user', {userId, username:nickname});
      console.log("성공한 응답", response);
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
    if (!data) return;
    if (!data.user || !data.user?.userId){
      alert("유저가 존재하지 않습니다."); //debug
      openModal("signUp", {userId: userId}, (username)=>handleAddSubmit(username));
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
          <Image src="/Main.png" alt="banner" fill 
            sizes='(min-width:1536px) 100vw, 0px'
            loading="lazy" 
            quality={80}
          />
        </div>)
      }
      <div className={style.title}>카드 뒤집기</div>
      <div className={style.btns}>
        <SignedOut>
          <Link href={"/sign-in"} className={`${style.btn} ${isLoading ? style.loading : ""}`}>{isLoading ? "로딩 중" : "로그인"}</Link>
          <Link href={"/game"} className={`${style.btn} ${isLoading ? style.loading : ""}`}>게임하기(비회원)</Link>
        </SignedOut>
        <SignedIn>
          {data && <p><span>{data?.user.username}</span> 님 반가워요!</p>}  
          <SignOutButton>
            <button className={`${style.logOutBtn} ${isLoading ? style.loading : ""}`}>{isLoading ? "로딩 중" : "로그아웃"}</button>
          </SignOutButton>
          <Link href={"/game"} className={`${style.btn} ${isLoading ? style.loading : ""}`}>게임하기</Link>
        </SignedIn>
        {data && <Link href={"/ranking"} className={`${style.btn} ${(isLoading) ? style.loading : ""}`}>랭킹</Link>}
      </div>
      {data && (
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
