'use client';
import { SignedIn, SignedOut, useAuth, UserButton } from '@clerk/nextjs'

import style from './page.module.scss';
import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { User } from '$/.prisma/client';
import axios from '$/axios';
import { useModal } from '@/store/modal-store';


const Home = () => {
  //const [userId, setUserId] = useState<string|null>(null);
  const { userId } = useAuth();
  const [nowUser, setNowUser] = useState<User|null>(null);
  const [username, setUsername] = useState<string>("");

  console.log("db에 저장된 nowUser, username 출력", nowUser, username);
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


  const { openModal } = useModal();

  //type, data, callback
  useEffect(()=>{
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/api/user');
        console.log("data를 출력합시다", data);
        if (!data.user){
          alert("유저가 존재하지 않습니다.") //debug
          openModal("signUp", {userId: userId}, (username)=>handleAddSubmit(username));
        }
        if (data.user) setNowUser(data.user);
      } catch (error){
        alert("서버 오류가 발생했습니다.");
        console.log("fetch Error", error);
      }
    }

    if (userId) fetchUser();
  },[userId, username, openModal, handleAddSubmit]);


  return (
    <div id={style.home}>
      <div className={style.title}>카드 뒤집기</div>
      <div className={style.btns}>
        <SignedOut>
          <Link href={"/sign-in"} className={style.btn}>로그인</Link>
          <Link href={"/game"} className={style.btn}>비회원</Link>
        </SignedOut>
        <SignedIn>
          <UserButton/>
          <Link href={"/game"} className={style.btn}>게임하기</Link>
        </SignedIn>
        <Link href={"/ranking"} className={style.btn}>랭킹</Link>
      </div>
    </div>
  );  
  
}
 
export default Home;
