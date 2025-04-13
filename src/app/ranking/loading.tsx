import React from 'react';
import Spinner from '@/common/Spinner';
import style from './loading.module.scss';

export default function Loading() {
  return (
    <div className={style.loadingPage}>
      <Spinner width={3} height={3} color='white'/>
    </div>
  );
}

