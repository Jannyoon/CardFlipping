'use client';
import React from 'react';
import style from './allResultContainer.module.scss';
import SingleResult from './SingleResult';

interface AllResultContainerProp {
  level : string;
}

export default function AllResultContainer({level}:AllResultContainerProp) {
  return (
    <div className={style.container}>
      <div className={style.contents}>
        <SingleResult/>
        <SingleResult/>
        <SingleResult/>
        <SingleResult/>
        <SingleResult/>
        <SingleResult/>
        <SingleResult/>
        <SingleResult/>
        <SingleResult/>
        <SingleResult/>
        <SingleResult/>
        <SingleResult/>
        <SingleResult/>
        <SingleResult/>
        <SingleResult/>
        <SingleResult/>
        <SingleResult/>
        <SingleResult/>
        <SingleResult/>
        <SingleResult/>
        <SingleResult/>
        <SingleResult/>
        <SingleResult/>
        <SingleResult/>
        <SingleResult/>
        <SingleResult/>
        <SingleResult/>
        <SingleResult/>
        <SingleResult/>
        <SingleResult/>
        <SingleResult/>
        <SingleResult/>
        <SingleResult/>


      </div>
    </div>
  );
}

