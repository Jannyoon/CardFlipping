'use client';
import React from 'react';
import style from './skeleton.module.scss';

export default function Skeleton() {

  return (
    <div className={style.container}>
      <div className={style.rank}><span></span></div>
      <div className={style.username}><span></span></div>
      <div className={style.level}><span></span></div>
      <div className={style.time}>00 : 00 : 000</div>
      <div className={style.noneborder}><span></span></div> {/*getFullYear(), getMonth(), getDate()*/}
    </div>
  );
}

