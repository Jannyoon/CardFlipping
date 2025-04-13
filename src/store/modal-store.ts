import { create } from 'zustand';

export type ModalType = "signUp"|"gameSet"|null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ModalStoreType<T = any> {
  type : ModalType | null;
  isOpen : boolean;
  data? : T|null; //입력받는 데이터 저장할 곳
  callback : ((a?:T)=>void) | null;
  openModal : (type:ModalType, data?:T|null, callback?:(a?:T)=>void) => void;
  closeModal : ()=>void;
}

export const useModal = create<ModalStoreType>((set)=>({
  type : null,
  isOpen : false,
  data : null,
  callback : null,
  openModal : (type, data, callback)=>set({
    isOpen : true,
    type,
    data,
    callback   
  }),
  closeModal : ()=>set((state)=>{
    state.callback?.(); //callback 함수 실행
    return {
      isOpen: false,
      type: null,
      data: null,
      callback: null
    }
  })
}))