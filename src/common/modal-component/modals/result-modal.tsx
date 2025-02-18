'use client';
import React from 'react';
import style from './levelSet-modal.module.scss';
import { useGameStore } from '@/store/game-store';
import { useRouter } from '$/next/navigation';
import timeDiff from '@/common/util/timeDiff';



export default function ResultModal(){
  const router = useRouter();
  const { gameState, onReset, startTime, endTime } = useGameStore();
  const {minutes, seconds, ms} = timeDiff(startTime, endTime)
  
  const handleButtonClick = ()=>{
    onReset();
    router.push('/ranking');
  }
  
  if (gameState==='end') return (
    <div className={style.modalScreen}>
      <div className={style.content}>
        <div className={style.topLevelContainer}>
          <div className={style.levelContainer}>
            <p>{minutes} : {seconds} : {ms}</p>
  
          </div>
          <button onClick={handleButtonClick}>확인</button>
        </div>
      </div>
    </div>
  );

  return (<div></div>)
}

