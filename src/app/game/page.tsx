'use client';
import { useModal } from '@/store/modal-store';
import React, { useEffect } from 'react';
import style from './page.module.scss';
import { useGameStore } from '@/store/game-store';
import dynamic from '$/next/dynamic';

const GameBoard = dynamic(()=> import('./_component/CardBoard'), 
{loading : ()=>(<div>로딩 중...</div>), ssr: false})


export default function Gamepage() {
  const { gameState, remaining, level, startTime } = useGameStore(); 
  const {openModal} = useModal();
  useEffect(()=>{
    openModal('gameSet');
  },[openModal]);

  if (!gameState) console.log(gameState, remaining, level, startTime);

  return (
    <div className={style.gamePage}>
      {!!gameState && (<GameBoard/>)}
    </div>
  );
}

