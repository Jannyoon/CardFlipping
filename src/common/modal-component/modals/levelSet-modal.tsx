'use client';
import React, { useState } from 'react';
import style from './levelSet-modal.module.scss';
import { useModal } from '@/store/modal-store';

import { CircleChevronLeft, CircleChevronRight } from 'lucide-react';
import { useGameStore } from '@/store/game-store';


export default function LevelSetModal() {
  const { type, closeModal } = useModal();
  const { onStart } = useGameStore();
  const [level, setLevel] = useState<number>(1);

  const handleLeftClick = () => {
    if (level===1) setLevel(3);
    else setLevel(prev => prev-1);
  };

  const handleRightClick = () => {
    if (level===3) setLevel(1);
    else setLevel(prev => prev+1);
  };

  const handleButtonClick = () => {
    onStart(level);
    closeModal();
  }
  
  if (type==='gameSet') return (
    <div className={style.modalScreen}>
      <div className={style.content}>
        <div className={style.topLevelContainer}>
          <div className={style.levelContainer}>
            <p>Level</p>
            <div className={style.arrowContainer}>
              <CircleChevronLeft className={style.arrow} onClick={handleLeftClick}/>
              <div className={style.level}>{level}</div>
              <CircleChevronRight className={style.arrow} onClick={handleRightClick}/>
            </div>
          </div>
          <button onClick={handleButtonClick}>확인</button>
        </div>
      </div>
    </div>
  );

  return (<div></div>)
}

