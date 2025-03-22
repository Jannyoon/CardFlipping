'use client';
import React, { useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import style from './cardBoard.module.scss'
import { useGameStore } from '@/store/game-store';

import Card from './_card/Card';
import Timer from './_timer/Timer';
import { useShallow } from '$/zustand/react/shallow';


export default function CardBoard() {
  const { remaining, setEndTime, setGameState, startTime, level, cardList} = useGameStore(
    useShallow(({ remaining, setEndTime, setGameState, startTime, level, cardList})=>({ 
      remaining, 
      setEndTime, 
      setGameState, 
      startTime, 
      level, 
      cardList
    }))
  );

  //매 렌더링 때마다 uuid가 새로 생성되는 것을 방지하기 위함
  const cardListId = useMemo(()=>{
    return cardList.map((value)=>{return {id : uuidv4(), content: value}})
  },[cardList]);

  useEffect(()=>{
    if (remaining===0){
      setGameState('end');
      setEndTime();
      return;
    }
  }, [remaining, startTime, setGameState, setEndTime]);

  return (
    <div className={style.cardBoard}>
      <div className={`${style.container} ${level===1? style.level1 : (level===2 ? style.level2 : style.level3)}`}>
        <Timer/>
        {cardListId.map((val)=><Card key={val.id} content={val.content}/>)}
      </div>
    </div>
  );
}

