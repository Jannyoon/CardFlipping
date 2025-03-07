'use client';
import React, { useCallback, useEffect, useState } from 'react';
import style from './myResult.module.scss';
import { useGameStore } from '@/store/game-store';
import { getMyLevelResult } from '@/common/lib/getMyLevelResult';
import { calcTime } from '@/common/util/calcTime';

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
  const {userPrevData} = useGameStore();
  const [myResult, setMyResult] = useState<MyResultType|null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const {minutes, seconds, ms} = calcTime(myResult? myResult.completionTime : null);

  const fetchResult = useCallback(async ()=>{
    try {
      setIsPending(true);
      if (!userPrevData) return;
      const data = await getMyLevelResult(userPrevData.user.userId, level);
      setMyResult(data);
    }
    catch (error){
      console.log(error);
    } finally {
      setIsPending(false);
    }
  }, [level, userPrevData]);


  useEffect(()=>{
    fetchResult();
  }, [fetchResult]);

  console.log("받아온 result", myResult);

  if (!userPrevData) return (
    <div className={style.container}>
      로그인 후 이용해주세요.
    </div>
  );
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
    const {achievedAt} = myResult;
    return (
      <div className={style.container}>
        <div>{myResult.rank}등</div>
        <div className={style.username}><p>{userPrevData.user.username}</p></div>
        <div>Level {level}</div>
        <div className={style.time}>{String(minutes).padStart(2,'0')} : {String(seconds).padStart(2,'0')} : {String(ms).padStart(3,'0')}</div>
        <div className={style.noneborder}>
          {`${achievedAt.getFullYear()}-${String(achievedAt.getMonth()+1).padStart(2,'0')}-${String(achievedAt.getDate()).padStart(2, '0')}`}
        </div> {/*getFullYear(), getMonth(), getDate()*/}
      </div>
    );
  }
}

