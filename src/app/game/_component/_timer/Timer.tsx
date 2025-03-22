import { useGameStore } from '@/store/game-store';
import React, { useEffect, useState } from 'react';
import style from './timer.module.scss';
import { useShallow } from '$/zustand/react/shallow';

export default function Timer() {
  const [time, setTime] = useState<number>(0);
  const { gameState, endTime } = useGameStore(
    useShallow((state)=>({gameState: state.gameState, endTime: state.endTime}))
  );

  
  const secInMs = Math.floor(time / 1000);
  const minInMs = Math.floor(secInMs / 60);

  const ms = time % 1000;
  const seconds = secInMs % 60;
  const minutes = minInMs % 60;


  useEffect(()=>{
    let interval: ReturnType<typeof setInterval>;
    if (gameState==='running'){
      interval = setInterval(()=>{
        setTime(prev => prev+13)
      }, 13);   
    }
    return ()=>clearInterval(interval);
  }, [gameState]); 


  return (
    <div className={style.container}>
      {!endTime && <>
        {minutes.toString().padStart(2, '0')} : {seconds.toString().padStart(2, '0')} : {ms.toString().padStart(3,'0')}
      </>}
      {endTime && <>00 : 00 : 00</>}
    </div>
  );
}

