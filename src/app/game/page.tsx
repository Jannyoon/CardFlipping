'use client';
import { useModal } from '@/store/modal-store';
import React, { useEffect, useState } from 'react';
import style from './page.module.scss';
import { useGameStore } from '@/store/game-store';


export default function Gamepage() {
  const { gameState, remaining, level, startTime } = useGameStore(); 
  const {openModal} = useModal();
  useEffect(()=>{
    openModal('gameSet');
  },[openModal]);

  if (!gameState) console.log(gameState, remaining, level, startTime);

  return (
    <div className={style.gamePage}>
      {!!gameState &&
      (<>
        <p>{level}</p>
        <p>{gameState}</p>
        <p>{remaining}</p>
      </>)
      }
    </div>
  );
}

