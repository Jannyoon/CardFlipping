'use client';
import React, { useState } from 'react';
import style from './levelSet-modal.module.scss';
import { useModal } from '@/store/modal-store';
import type { StaticImageData } from '$/next/image';

import { CircleChevronLeft, CircleChevronRight } from 'lucide-react';
import { useGameStore } from '@/store/game-store';
import { GameCardsShuffle } from '@/common/util/cardShuffle';
import { useShallow } from '$/zustand/react/shallow';
import { convertToWebp } from '@/common/util/convertToWebp';
import workerCode from './webWorker/webpWorker';

export default function LevelSetModal() {
  const { type, closeModal } = useModal(
    useShallow((state)=>({
      type : state.type,
      closeModal : state.closeModal
    }))
  );
  const onStart  = useGameStore((state)=>state.onStart);

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

    const blob = new Blob([workerCode], {type:'application/javascript'});
    const worker = new Worker(URL.createObjectURL(blob));
    if (!worker) return;
    console.log("newWorker 생성 완료", worker);
    /*카드를 랜덤하게 선택*/
    const cardList = GameCardsShuffle(level===1 ? 5 : (level===2 ? 6 : 8));
    const startTime = performance.now();

    try {
      setIsLoading(true);
      const convertedCardList: [string, string | StaticImageData][] = await Promise.all(
        cardList.map(async (val) => 
          await convertToWebp(val[1], worker).then((webpUrl) => [val[0], webpUrl] as [string, string | StaticImageData])
        )
      );
      onStart(level, convertedCardList);
      closeModal();
    } catch (error) {
      console.error("PNG to WEBP conversion failed:", error)
    } finally {
      setIsLoading(false);
      const endTime = performance.now();
      console.log("카드 변환시간", (endTime - startTime)/1000);
      worker.terminate();
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

