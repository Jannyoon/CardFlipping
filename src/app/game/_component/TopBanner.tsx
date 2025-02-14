'use client';
import React from 'react';
import style from './topBanner.module.scss';
import { useRouter } from '$/next/navigation';
import { useGameStore } from '@/store/game-store';

import { House } from 'lucide-react';
import { RotateCcw } from 'lucide-react';
import { useModal } from '@/store/modal-store';


export default function TopBanner() {
  const router = useRouter();
  const { level, onReset } = useGameStore();
  const { openModal } = useModal();

  const handleButtonClick = ()=>{
    router.replace("/");
  }

  const handleRefreshClick = ()=>{
    onReset();
    openModal("gameSet")

  }

  return (
    <div className={style.top}>
      <button 
        className={style.home}
        onClick={handleButtonClick}
      ><House/></button>
      <div className={style.content}>
        <div className={style.level}>Level {level}</div>
        <button onClick={handleRefreshClick}><RotateCcw/></button>
      </div>
    </div>
  );
}

