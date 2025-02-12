'use client';
import React, { useEffect, useState } from 'react';
import style from './card.module.scss';
import { useGameStore } from '@/store/game-store';

interface CardProp {
  content : string
}
export default function Card({content}:CardProp) {
  const {
    remaining,
    setRemaining,
    prevCard, 
    onFlipCard, 
    resetStack, 
    matchedList, 
    matchPush
  } = useGameStore();
  const [clickable, setClickable] = useState<boolean>(true);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const handleClick = ()=>{
    if (!clickable || matchedList.includes(content)) return;
    setClickable(false);
    setIsFlipped(true);

    if (!prevCard){
      //첫 번째 짝을 선택했을 경우
      onFlipCard(content);
    } else if (prevCard!==content){
      //카드가 짝이 맞지 않을 경우
      setTimeout(()=>{       
        resetStack();   
        setIsFlipped(false);
        setClickable(true);
      }, 200);
    } else if (prevCard===content){
      matchPush(content);
      setClickable(false);
      resetStack();
      setRemaining(remaining-1);
    }
  }


  useEffect(()=>{
    if (!matchedList.includes(content) && isFlipped && !prevCard){
      //이미 뒤집어져 있는 카드패를 되돌린다
      setIsFlipped(false);
      setClickable(true);
      return;
    }
  }, [content, prevCard, isFlipped, matchedList])

  return (
    <div 
      className={`${style.card} ${isFlipped ? style.flipped : ''}`}
      onClick = {handleClick}
    >
      <div className={style.cardInner}>
        <div className={style.back}>{content}</div>       
        <div className={style.front}>front</div>
      </div>
    </div>
  );
}

