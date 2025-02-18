'use client';
import { useModal } from '@/store/modal-store';
import React, { useEffect } from 'react';
import style from './page.module.scss';
import { useGameStore } from '@/store/game-store';
import dynamic from '$/next/dynamic';
import TopBanner from './_component/TopBanner';

const GameBoard = dynamic(()=> import('./_component/CardBoard'), 
{loading : ()=>(<div>로딩 중...</div>), ssr: false})


export default function Gamepage() {
  const { gameState } = useGameStore(); 
  const {openModal} = useModal();
  useEffect(()=>{
    openModal('gameSet');
  },[openModal]);

  return (
    <div className={style.gamePage}>

      {!!gameState && (
        <div className={style.inner}>
          <TopBanner/>
          <GameBoard/>
        </div>)}
    </div>
  );
}

