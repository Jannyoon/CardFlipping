import React from 'react';
import style from './spinner.module.scss'


interface SpinnerProps {
  width : number;
  height : number;
  color?:string;
}

const normalSpinnerColor = `#ff89b2`
export default function Spinner({width, height, color}:SpinnerProps) {
  return (
    <div className={style.spinnerWrapper}>
      <div className={style.spinner} style={{
        'width':`${width}rem`, 
        'height':`${height}rem`,
        'border' : `7px solid ${color ? color : normalSpinnerColor}`,
        'borderTop': '7px solid transparent',
        'borderRadius': '50%'
        }}/>
    </div>
  );
}

