'use client';
import React from 'react';
import { SignedIn, SignedOut, SignOutButton } from '@clerk/nextjs';
import style from '@/app/page.module.scss';
import Link from 'next/link';
interface ClerkComponentProps {
  isLoading : boolean;
  data:any;
  username : string|null;
}

export default function MenuComponents({isLoading, data, username}:ClerkComponentProps) {
  return (
    <>
      <SignedOut>
        <Link href={"/sign-in"} prefetch className={`${style.btn} ${isLoading ? style.loading : ""}`}>{isLoading ? "로딩 중" : "로그인"}</Link>
        <Link href={"/game"} prefetch className={`${style.btn} ${isLoading ? style.loading : ""}`}>게임하기(비회원)</Link>
      </SignedOut>
      <SignedIn>
        {username && <p><span>{ username}</span> 님 반가워요!</p>}  
        {!username && <p><span>{ data?.user.username || username}</span> 님 반가워요!</p>}  
        <SignOutButton>
          <button className={`${style.logOutBtn} ${isLoading ? style.loading : ""}`}>{isLoading ? "로딩 중" : "로그아웃"}</button>
        </SignOutButton>
        <Link href={"/game"} prefetch className={`${style.btn} ${isLoading ? style.loading : ""}`}>게임하기</Link>
      </SignedIn>
      {data && <Link prefetch href={"/ranking"} className={`${style.btn} ${(isLoading) ? style.loading : ""}`}>랭킹</Link>}
    </>
  );
}

