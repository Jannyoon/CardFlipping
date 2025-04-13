'use client';
import React, { useMemo } from 'react';
import style from './singleResult.module.scss';
import { calcTime } from '@/common/util/calcTime';


interface Result {
  id : string;
  userId : string;
  levelId : number;
  completionTime : number;
  achievedAt : Date;
  serverId : number;
  user: { userId: string; username: string }; // user 정보 추가 (필요한 필드만 포함)
  rank : number;
}

export default function SingleResult({result}:{result:Result}) {

  const MinSecMs = useMemo(()=>{
    const {minutes, seconds, ms} = calcTime(result.completionTime);
    return `${String(minutes).padStart(2,'0')} : ${String(seconds).padStart(2,'0')} : ${String(ms).padStart(3,'0')}`
  }, [result]);


  const AchievedTime = useMemo(()=>{
    const {achievedAt} = result;
    return `${achievedAt.getFullYear()}-${String(achievedAt.getMonth()+1).padStart(2,'0')}-${String(achievedAt.getDate()).padStart(2, '0')}`
  }, [result]);


  return (
    <div className={style.container}>
      <div>{result.rank}등</div>
      <div className={style.username}><p>{result.user.username}</p></div>
      <div>Level {result.levelId}</div>
      <div className={style.time}>{MinSecMs}</div>
      <div className={style.noneborder}>{AchievedTime}
      </div> {/*getFullYear(), getMonth(), getDate()*/}
    </div>
  );
}

