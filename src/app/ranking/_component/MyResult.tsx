'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import style from './myResult.module.scss';
import { useGameStore } from '@/store/game-store';
import { getMyLevelResult } from '@/common/lib/getMyLevelResult';
import { calcTime } from '@/common/util/calcTime';
import { useAuth } from '@clerk/nextjs';

interface MyResultProp {
  level : string;
}

type MyResultType = {
  rank: number;
  serverId: number;
  userId: string;
  levelId: number;
  id: string;
  completionTime: number;
  achievedAt: Date;
};

export default function MyResult({level}:MyResultProp) {
  const { userId, isLoaded } = useAuth();
  const userPrevData = useGameStore((state) => state.userPrevData);

  const [myResult, setMyResult] = useState<MyResultType|null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [name, setName] = useState<string>('^ ㅡ ^');

  const MinSecMs = useMemo(()=>{
    if (!myResult) return '00 : 00 : 000';
    const {minutes, seconds, ms} = calcTime(myResult.completionTime);
    return `${String(minutes).padStart(2,'0')} : ${String(seconds).padStart(2,'0')} : ${String(ms).padStart(3,'0')}`
  }, [myResult]);


  const AchievedTime = useMemo(()=>{
    if (!myResult) return '0000-00-00';
    const {achievedAt} = myResult;
    return `${achievedAt.getFullYear()}-${String(achievedAt.getMonth()+1).padStart(2,'0')}-${String(achievedAt.getDate()).padStart(2, '0')}`
  }, [myResult]);

  const fetchResult = useCallback(async ()=>{
    setIsPending(true);
    const cachedData = localStorage.getItem('myRanking');
    if (!userPrevData && !cachedData) return;
    try {
      if (cachedData){
        const parsed = JSON.parse(cachedData);
        const data = await getMyLevelResult(parsed.user.userId, level);
        setMyResult(data);
        setName(parsed.user.username);
      }
      else if (userPrevData){
        const data = await getMyLevelResult(userPrevData.user.userId, level);
        setMyResult(data);
        setName(userPrevData.user.username);
      }
    }
    catch (error){
      console.log(error);
    } finally {
      setIsPending(false);
    }
  }, [level, userPrevData]);



  useEffect(()=>{
    if (userPrevData){
      localStorage.setItem('myRanking', JSON.stringify(userPrevData));
    }
    fetchResult();
  }, [fetchResult, userPrevData, userId]);


  if (!userId && isLoaded) return (
    <div className={style.container}>
      로그인이 필요합니다.
    </div>
  )

  if (!myResult && !isPending) return (
    <div className={style.container}>
      기록이 없습니다.
    </div>
  );
  if (isPending) return (
    <div className={style.container}>
      Loading ...
    </div>
  )
  if (myResult){
    return (
      <div className={style.container}>
        <div>{myResult.rank}등</div>
        <div className={style.username}><p>{name}</p></div>
        <div>Level {level}</div>
        <div className={style.time}>{MinSecMs}</div>
        <div className={style.noneborder}>{AchievedTime}</div> {/*getFullYear(), getMonth(), getDate()*/}
      </div>
    );
  }
}

