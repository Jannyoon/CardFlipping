'use client';
import React from 'react';
import style from './myResult.module.scss';

interface MyResultProp {
  level : string;
}
export default function MyResult({level}:MyResultProp) {
  return (
    <div className={style.container}>
      <div>0000등</div>
      <div className={style.username}><p>usernaddddddddddddddddddddddddddddddme</p></div>
      <div>Level {level}</div>
      <div className={style.time}>00:00:00</div>
      <div className={style.noneborder}>2025-02-24</div> {/*getFullYear(), getMonth(), getDate()*/}
    </div>
  );
}

