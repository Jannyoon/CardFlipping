'use client';
import React from 'react';
import style from './levelSet-modal.module.scss';
import { useGameStore } from '@/store/game-store';
import { useRouter } from '$/next/navigation';
import timeDiff from '@/common/util/timeDiff';
import { useAuth } from '@clerk/clerk-react'
import axios from '$/axios';

export default function ResultModal(){
  const { userId } = useAuth();
  const router = useRouter();
  const { gameState, onReset, startTime, endTime, level } = useGameStore();
  const {difference, minutes, seconds, ms} = timeDiff(startTime, endTime)
  const handleButtonClick = ()=>{
    console.log("difference", difference)
    const postResult = async ()=>{
      if (!userId) return;
      try {
        const response = await axios.post('/api/result', {userId, level, endTime, diff:difference});
        console.log("성공한 응답", response);
      }catch (error){
        console.log(error);
      }
    }
    postResult();
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

