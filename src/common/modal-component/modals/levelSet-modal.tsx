'use client';
import React, { useState } from 'react';
import style from './levelSet-modal.module.scss';
import { useModal } from '@/store/modal-store';
import type { StaticImageData } from '$/next/image';

import { CircleChevronLeft, CircleChevronRight } from 'lucide-react';
import { useGameStore } from '@/store/game-store';
import { GameCardsShuffle } from '@/common/util/cardShuffle';

const convertToWebp = (pngSrc: string | StaticImageData):Promise<string> => {
  const src = typeof pngSrc==="string" ? pngSrc : pngSrc.src;
  return new Promise((resolve, reject)=>{
    const img = new Image();
    img.crossOrigin = "anonymous"; //CORS 이슈 방식
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx){
        reject("Canvas context is not supported");
        return;
      }
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/webp", 0.8)); //png => webp, 80% quality
    };

    img.onerror = (error) => reject(error);
  })
}


export default function LevelSetModal() {
  const { type, closeModal } = useModal();
  const { onStart } = useGameStore();
  const [level, setLevel] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLeftClick = () => {
    if (level===1) setLevel(3);
    else setLevel(prev => prev-1);
  };

  const handleRightClick = () => {
    if (level===3) setLevel(1);
    else setLevel(prev => prev+1);
  };

  const handleButtonClick = async () => {
    /*카드를 랜덤하게 선택*/
    const cardList = GameCardsShuffle(level===1 ? 5 : (level===2 ? 6 : 8));
    try {
      setIsLoading(true);
      const convertedCardList: (string | StaticImageData)[][] = await Promise.all(
        cardList.map(async ([text, pngSrc]) => [text, await convertToWebp(pngSrc)])
      );
      onStart(level, convertedCardList);
      closeModal();
    } catch (error) {
      console.error("PNG to WEBP conversion failed:", error)
    } finally {
      setIsLoading(false);
    }
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
          {!isLoading && <button onClick={handleButtonClick}>확인</button>}
          {isLoading && <p>로딩 중...</p>}
        </div>
      </div>
    </div>
  );

  return (<div></div>)
}

