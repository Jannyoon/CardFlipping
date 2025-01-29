import { Result } from '$/.prisma/client';
import { create } from 'zustand';

export type ModalType = "signUp";

interface ModalData {

  result ?: Result
}

interface ModalStoreType {
  type : ModalType | null;
  isOpen : boolean;
  data : ModalData;
  callback : (()=>void) | null;
  openModal : (callback?:()=>void) => void;
  closeModal : ()=>void;
}

export const useModal = create<ModalStoreType>((set)=>({
  type : null,
  isOpen : false,
  data : {},
  callback : null,
  openModal : (callback)=>set({
    isOpen : true,
    callback,
  }),
  closeModal : ()=>set((state)=>{
    state.callback?.(); //callback 함수 실행
    return {
      isOpen: false,
      type: null,
      data: {},
      callback: null
    }
  })
}))