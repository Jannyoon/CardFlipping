'use client';
import React from 'react';
import style from './singleResult.module.scss';
import { calcTime } from '@/common/util/calcTime';
import { useGameStore } from '@/store/game-store';


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
  const {userPrevData} = useGameStore();
  const {achievedAt} = result;
  const {minutes, seconds, ms} = calcTime(result.completionTime);

  return (
    <div className={`${style.container} ${userPrevData?.user.userId===result.userId ? style.mine : ''}`}>
      <div>{result.rank}등</div>
      <div className={style.username}><p>{result.user.username}</p></div>
      <div>Level {result.levelId}</div>
      <div className={style.time}>{String(minutes).padStart(2,'0')} : {String(seconds).padStart(2,'0')} : {String(ms).padStart(3,'0')}</div>
      <div className={style.noneborder}>
        {`${achievedAt.getFullYear()}-${String(achievedAt.getMonth()+1).padStart(2,'0')}-${String(achievedAt.getDate()).padStart(2, '0')}`}
      </div> {/*getFullYear(), getMonth(), getDate()*/}
    </div>
  );
}

