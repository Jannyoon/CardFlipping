'use client';
import React, { useState } from 'react';
import style from './page.module.scss';
import AllResultContainer from './_component/AllResult/AllResultContainer';
import MyResult from './_component/MyResult';
import { House } from 'lucide-react';
import { useRouter } from '$/next/navigation';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


export default function RankingPage() {
  const router = useRouter();
  const [level, setLevel] = useState<string>('1');
  const queryClient = new QueryClient();

  const handleClickButton = (e:React.MouseEvent<HTMLButtonElement>)=>{
    console.log(e.currentTarget.name);
    setLevel(e.currentTarget.name);
  }

  const handleHomeClick = ()=>{
    router.push('/');
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className={style.rankingPage}>
        <div className={style.title}>
          <button 
            className={style.home}
            onClick={handleHomeClick}
          ><House/></button>Ranking #Lv.{level}
        </div>
        <div className={style.btnContainer}>
          <button name='1' onClick={handleClickButton} className={`${level==='1' ? style.selected : ''}`}>Level 1</button>
          <button name='2' onClick={handleClickButton} className={`${level==='2' ? style.selected : ''}`}>Level 2</button>
          <button name='3' onClick={handleClickButton} className={`${level==='3' ? style.selected : ''}`}>Level 3</button>
        </div>
        <AllResultContainer level={level}/>
        <MyResult level={level}/>      
      </div>
    </QueryClientProvider>
  );
}

