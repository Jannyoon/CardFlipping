'use client';
import React, { useEffect, useMemo } from 'react';
import axios from '$/axios';
import style from './result-modal.module.scss';
import { useGameStore } from '@/store/game-store';
import { useRouter } from '$/next/navigation';
import { useAuth } from '@clerk/clerk-react'
import { calcTime } from '@/common/util/calcTime';
import timeDiff from '@/common/util/timeDiff';
import { PiCrownFill } from "react-icons/pi";
import { useShallow } from '$/zustand/react/shallow';


export default function ResultModal(){
  const { userId } = useAuth();
  const router = useRouter();
  const { userPrevData, gameState, onReset, startTime, endTime, level } = useGameStore(
    useShallow(({ userPrevData, gameState, onReset, startTime, endTime, level })=>(
      { 
        userPrevData, 
        gameState, 
        onReset, 
        startTime, 
        endTime, 
        level 
      }
    ))
  );
  const {difference, minutes, seconds, ms} = timeDiff(startTime, endTime)
  
  const prevLevelResult = useMemo(()=>{
    const prevCompletionTime = userPrevData?.user.result.find((val)=>val.levelId===level)?.completionTime||null;
    const {minutes, seconds, ms} = calcTime(prevCompletionTime);
    return {prevCompletionTime, minutes, seconds, ms}
  },[level, userPrevData?.user.result]);

  useEffect(()=>{
    const postResult = async ()=>{
      if (!userId || !endTime) return;
      try {
        const response = await axios.post('/api/result', {userId, level, endTime, diff:difference});
        console.log("성공한 응답", response);
      }catch (error){
        console.log("result modal 에러", error);
      }
    }
    postResult();
  },[difference, endTime, level, userId]);
  

  const handleButtonClick = ()=>{
    onReset();
    router.push('/ranking');
  }

  if (gameState==='end') return (
    <div className={style.modalScreen}>
      <div className={style.content}>
        <div className={style.topLevelContainer}>
          <div className={style.topHeader}>
            <p style={{'width':'100%', 'textAlign':'center'}}>
              {userId && `${(prevLevelResult.prevCompletionTime===null) 
              ?'신' 
              :((difference<prevLevelResult.prevCompletionTime)
              ?'신'
              :'')}`}기록!</p>
           {!userId && <p className={style.desc}>비회원은 랭킹 등록이 되지 않습니다.</p>}
           {userId && <p className={style.prevResult}>이전 기록 {prevLevelResult.minutes}:{prevLevelResult.seconds}:{prevLevelResult.ms}</p>}
          </div>
          <div className={style.levelContainer}>
            <PiCrownFill className={style.crown}/>
            <p>{String(minutes).padStart(2,'0')} : {String(seconds).padStart(2,'0')} : {String(ms).padStart(3,'0')}</p>
          </div>
          <button onClick={handleButtonClick}>랭킹 보러가기</button>
        </div>
      </div>
    </div>
  );

  return (<div></div>)
}

