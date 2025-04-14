import React from 'react';
import { SignedIn, SignedOut, SignOutButton } from '@clerk/nextjs';
import style from '@/app/page.module.scss';
import Link from 'next/link';
import Spinner from './Spinner';
import { Result, User } from '$/.prisma/client';


interface DataType {
  user ?: User,
  result ?: Result[]
}

interface ClerkComponentProps {
  isLoading : boolean;
  data?:DataType;
  username : string|null;
}

export default function MenuComponents({isLoading, data, username}:ClerkComponentProps) {
  if (isLoading){
    return <Spinner width={2.5} height={2.5}/>
  }
  return (
    <>
      <SignedOut>
        <Link href={"/sign-in"} prefetch className={style.btn}>로그인</Link>
        <Link href={"/game"} prefetch className={style.btn}>게임하기(비회원)</Link>
      </SignedOut>
      <SignedIn>
        {username && <p><span>{username}</span> 님 반가워요!</p>}  
        {!username && <p><span>{data?.user?.username || username}</span> 님 반가워요!</p>}  
        <SignOutButton>
          <button className={style.logOutBtn}>로그아웃</button>
        </SignOutButton>
        <Link href={"/game"} prefetch className={style.btn}>게임하기</Link>
      </SignedIn>
      {data && <Link prefetch href={"/ranking"} className={style.btn}>랭킹</Link>}
    </>
  );
}

