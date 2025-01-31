'use client';
import React from 'react';
import style from './addUser-modal.module.scss';
import { useModal } from '@/store/modal-store';
//유저 정보 입력
//user 닉네임

export default function AddUserModal() {
  const { type, data, callback, closeModal } = useModal();

  console.log("modal 정보 출력, data", data);
  console.log("modal 정보 출력, callback!", callback);


  const handleAddNewUser = async (e : React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault();
    const nickname:string = e.currentTarget.nickname.value;
    console.log("nickname 내놔", nickname);
    if (nickname && callback){
      try {
        await callback(nickname);
        closeModal();        
      } catch(error){
        console.log("유저 추가 중 에러 발생", error);
      }

      //console.log("response 출력", response);
    }

  }
  
  if (type==='signUp') return (
    <div className={style.modalScreen}>
      <div className={style.content}>
        <p>신규 유저</p>
        <form onSubmit={handleAddNewUser}>
          <input name="nickname" placeholder='닉네임을 입력하세요' required/>
          <button type='submit'>확인</button>
        </form>
      </div>
    </div>
  );

  return (<div></div>)
}

