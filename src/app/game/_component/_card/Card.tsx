'use client';
import React, { useEffect, useState } from 'react';
import style from './card.module.scss';
import { useGameStore } from '@/store/game-store';
import type { StaticImageData } from '$/next/image';
import Image from '$/next/image';

import { GoHeartFill } from "react-icons/go";
import { useShallow } from '$/zustand/react/shallow';

interface CardProp {
  content : [string, string | StaticImageData]
}

export default function Card({content}:CardProp) {
  const [nickname, convertedUrl] = content;

  const {
    remaining,
    setRemaining,
    prevCard, 
    onFlipCard, 
    resetStack, 
    matchedList, 
    matchPush
  } = useGameStore(
    useShallow(({ remaining, setRemaining, prevCard, onFlipCard, resetStack, matchedList, matchPush }) => ({
      remaining,
      setRemaining,
      prevCard,
      onFlipCard,
      resetStack,
      matchedList,
      matchPush,
    }))
  );
  
  const [clickable, setClickable] = useState<boolean>(true);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const handleClick = ()=>{
    if (!clickable || matchedList.includes(nickname)) return;
    setClickable(false);
    setIsFlipped(true);

    if (!prevCard){
      //첫 번째 짝을 선택했을 경우
      onFlipCard(nickname);
    } else if (prevCard!==nickname){
      //카드가 짝이 맞지 않을 경우
      setTimeout(()=>{       
        resetStack();   
        setIsFlipped(false);
        setClickable(true);
      }, 200);
    } else if (prevCard===nickname){
      matchPush(nickname);
      setClickable(false);
      resetStack();
      setRemaining(remaining-1);
    }
  }


  useEffect(()=>{
    if (!matchedList.includes(nickname) && isFlipped && !prevCard){
      //이미 뒤집어져 있는 카드패를 되돌린다
      setIsFlipped(false);
      setClickable(true);
      return;
    }
  }, [nickname, prevCard, isFlipped, matchedList])

  return (
    <div 
      className={`${style.card} ${isFlipped ? style.flipped : ''}`}
      onClick = {handleClick}
    >
      <div className={style.cardInner}>
        <div className={style.back}>
          <Image alt="card" src={convertedUrl} fill sizes='100%'/>
        </div>       
        <div className={style.front}>
          <GoHeartFill/>
        </div>
      </div>
    </div>
  );
}

