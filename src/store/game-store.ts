import {create} from 'zustand';
import type { StaticImageData } from '$/next/image';


type gameStateType = 'running'|'stop'|'refresh'|'end'|null;
interface GameStoreType{
  cardList : [string, string | StaticImageData][];
  setCardList : (arr:[string, string | StaticImageData][])=>void;

  gameState : gameStateType;
  setGameState : (nowState:gameStateType)=>void;
  
  startTime : Date|null;
  endTime: Date|null;
  setEndTime : ()=>void;

  remaining : number;
  setRemaining : (remaining:number)=>void;

  onStart : (level:number, cardList:[string, string | StaticImageData][]) => void;

  onReset : ()=>void;
  level : number|null;
  setLevel: (level:number)=>void;

  prevCard : string|null;
  onFlipCard : (card:string)=>void;
  resetStack : ()=>void;
  
  matchedList : string[];
  matchPush : (card:string)=>void;
}


export const useGameStore = create<GameStoreType>((set)=>({
  cardList : [],
  setCardList : (cardList) => set({cardList}),

  gameState : null,
  setGameState : (nowState)=>set({gameState: nowState}),

  remaining : 0,
  setRemaining : (remaining)=>set({remaining}),

  onStart : (level, cardList)=>set((state)=>{
    state.level = level;
    state.remaining = level===1 ? 5 : (level===2 ? 6 : 8);
    return {
      ...state, 
      cardList,
      gameState: 'running',
      startTime : new Date(),
      remaining : state.remaining, 
      level: state.level, 
    }
  }),

  onReset : ()=>set({
    gameState:null, 
    remaining:0, 
    level:null, 
    startTime:null, 
    endTime:null,
    prevCard:null,
    matchedList:[]
  }),
  
  level : null,
  setLevel : (level)=>set({level}),

  startTime: null,
  endTime: null,
  setEndTime : ()=>set({endTime: new Date()}),

  prevCard: null,
  onFlipCard: (card) => set({ prevCard: card }),
  resetStack : ()=>set({prevCard : null}),
    
  matchedList : [],
  matchPush : (card:string)=>set((state)=>({...state, matchedList:[...state.matchedList, card]}))
}))