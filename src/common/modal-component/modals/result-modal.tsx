'use client';
import React, { useEffect, useMemo } from 'react';
import style from './result-modal.module.scss';
import { useGameStore } from '@/store/game-store';
import { useRouter } from '$/next/navigation';
import timeDiff from '@/common/util/timeDiff';
import { useAuth } from '@clerk/clerk-react'

import { PiCrownFill } from "react-icons/pi";
import axios from '$/axios';

const calcTime = (time : number|null)=>{
  if (!time) return {minutes:'00', seconds:'00', ms:'00'};
  const secInMs = Math.floor(time / 1000);
  const minInMs = Math.floor(secInMs / 60);
  const ms = time % 1000;
  const seconds = secInMs % 60;
  const minutes = minInMs % 60;
  return {
    minutes: String(minutes).padStart(2,'0'), 
    seconds: String(seconds).padStart(2,'0'), 
    ms: String(ms).padStart(2,'0'), 
  } 
}

export default function ResultModal(){
  const { userId } = useAuth();
  const router = useRouter();
  const { userPrevData, gameState, onReset, startTime, endTime, level } = useGameStore();
  const {difference, minutes, seconds, ms} = timeDiff(startTime, endTime)
  
  const prevLevelResult = useMemo(()=>{
    const prevCompletionTime = userPrevData?.user.result.find((val)=>val.levelId===level)?.completionTime||null;
    const {minutes, seconds, ms} = calcTime(prevCompletionTime);
    return {prevCompletionTime, minutes, seconds, ms}
  },[level, userPrevData?.user.result]);
  console.log("이전 결과 출력", prevLevelResult);

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

  console.log(prevLevelResult, "디버깅");
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
            <p>{String(minutes).padStart(2,'0')} : {String(seconds).padStart(2,'0')} : {ms}</p>
          </div>
          <button onClick={handleButtonClick}>랭킹 보러가기</button>
        </div>
      </div>
    </div>
  );

  return (<div></div>)
}

