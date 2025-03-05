'use client';
import React from 'react';
import style from './singleResult.module.scss';


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
  return (
    <div className={style.container}>
      <div>{result.rank}등</div>
      <div className={style.username}><p>{result.user.username}</p></div>
      <div>Level {result.levelId}</div>
      <div className={style.time}>{result.completionTime}</div>
      <div className={style.noneborder}>2025-02-24</div> {/*getFullYear(), getMonth(), getDate()*/}
    </div>
  );
}

