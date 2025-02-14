'use client';
import React, { useEffect } from 'react';
import Card from './_card/Card';
import style from './cardBoard.module.scss'
import { useGameStore } from '@/store/game-store';

export default function CardBoard() {
  const { remaining, setGameState } = useGameStore();

  useEffect(()=>{
    console.log(remaining);
    if (remaining===0){
      setGameState('end');
      return;
    }
  }, [remaining, setGameState]);

  return (
    <div className={style.cardBoard}>
      <div></div>
      <Card content={'11'}/>
      <Card content={'31'}/>
      <Card content={'22'}/>
      <Card content={'31'}/>
      <Card content={'11'}/>
      <Card content={'22'}/>
      <Card content={'ak'}/>
      <Card content={'ak'}/>
      <Card content={'5'}/>
      <Card content={'5'}/>
    </div>
  );
}

