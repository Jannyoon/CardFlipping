'use client';
import React, { useEffect } from 'react';
import Card from './_card/Card';
import style from './cardBoard.module.scss'
import { useGameStore } from '@/store/game-store';

export default function CardBoard() {
  const {remaining} = useGameStore();

  useEffect(()=>{
    console.log(remaining);
    if (remaining===0){
      alert("모두 완성!");
      return;
    }
  }, [remaining]);

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

