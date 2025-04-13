'use client';
import { useModal } from '@/store/modal-store';
import React, { useEffect } from 'react';
import style from './page.module.scss';
import { useGameStore } from '@/store/game-store';

import TopBanner from './_component/TopBanner';
import Spinner from '@/common/Spinner';
import CardBoard from './_component/CardBoard';
//import dynamic from '$/next/dynamic';
/*const GameBoard = dynamic(()=> import('./_component/CardBoard'), 
{loading : ()=>(<div>로딩 중...</div>)})*/


export default function Gamepage() {
  const { gameState } = useGameStore(); 
  const {openModal} = useModal();
  useEffect(()=>{
    openModal('gameSet');
  },[openModal]);

  return (
    <div className={style.gamePage}>

      {!!gameState 
        ? (<div className={style.inner}>
            <TopBanner/>
            <CardBoard/>
          </div>)
        : (<div className={style.inner}>
            <Spinner width={3} height={3} color='white'/>
          </div>)
        }
    </div>
  );
}

