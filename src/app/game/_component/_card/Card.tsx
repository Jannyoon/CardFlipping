'use client';
import React, { useState } from 'react';
import style from './card.module.scss';

export default function Card() {
  const [clickable, setClickable] = useState<boolean>(true);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const handleClick = ()=>setIsFlipped(prev => !prev);

  return (
    <div 
      className={`${style.card} ${isFlipped ? style.flipped : ''}`}
      onClick = {handleClick}
    >
      <div className={style.cardInner}>

        <div className={style.back}>Back</div>       
        <div className={style.front}>front</div>
      </div>
    </div>
  );
}

