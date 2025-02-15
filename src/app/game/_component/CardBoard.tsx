'use client';
import React, { useEffect } from 'react';
import Card from './_card/Card';
import style from './cardBoard.module.scss'
import { useGameStore } from '@/store/game-store';

export default function CardBoard() {
  const { remaining, setGameState, level } = useGameStore();

  useEffect(()=>{
    console.log(remaining);
    if (remaining===0){
      setGameState('end');
      return;
    }
  }, [remaining, setGameState]);

  return (
    <div className={style.cardBoard}>
      <div className={`${style.container} ${level===1? style.level1 : (level===2 ? style.level2 : style.level3)}`}>
        <Card content={'11'}/>
        <Card content={'31'}/>
        <Card content={'22'}/>
        <Card content={'11'}/>
        <Card content={'22'}/>
        <Card content={'11'}/>
        <Card content={'31'}/>
        <Card content={'22'}/>
        <Card content={'11'}/>
        <Card content={'11'}/>
        <Card content={'22'}/>
        <Card content={'11'}/>
        <Card content={'31'}/>
        <Card content={'22'}/>
        <Card content={'11'}/>
        <Card content={'11'}/>
      </div>
    </div>
  );
}

/*
  <Card content={'11'}/>
  <Card content={'31'}/>
  <Card content={'22'}/>
*/

