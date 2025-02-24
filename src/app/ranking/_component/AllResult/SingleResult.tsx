'use client';
import React from 'react';
import style from './singleResult.module.scss';

interface SingleResultProp {
  rank : number; //index로 받아옴
  username : string;
  completionTime : number;
}

export default function SingleResult({

}:SingleResultProp) {
  return (
    <div className={style.container}>
      <div>0000등</div>
      <div className={style.username}><p>usernaddddddddddddddddddddddddddddddme</p></div>
      <div>Level 3</div>
      <div className={style.time}>00:00:00</div>
      <div className={style.noneborder}>2025-02-24</div> {/*getFullYear(), getMonth(), getDate()*/}
    </div>
  );
}

