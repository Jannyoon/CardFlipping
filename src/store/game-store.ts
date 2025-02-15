import {create} from 'zustand';
import type { StaticImageData } from '$/next/image';


type gameStateType = 'running'|'stop'|'refresh'|'end'|null;
interface GameStoreType{
  cardList : (string | StaticImageData)[][];
  setCardList : (arr:(string | StaticImageData)[][])=>void;

  gameState : gameStateType;
  setGameState : (nowState:gameStateType)=>void;

  remaining : number;
  setRemaining : (remaining:number)=>void;

  onStart : (level:number, cardList:(string | StaticImageData)[][]) => void;
  onReset : ()=>void;
  level : number|null;
  setLevel: (level:number)=>void;
  startTime : Date|null;

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
    state.gameState = 'running';
    state.level = level;
    state.remaining = level===1 ? 5 : (level===2 ? 6 : 8);
    return {
      ...state, 
      cardList,
      gameState: state.gameState,
      remaining : state.remaining, 
      level: state.level, 
    }
  }),

  onReset : ()=>set({
    gameState:null, 
    remaining:0, 
    level:null, 
    startTime:null, 
    prevCard:null,
    matchedList:[]
  }),
  
  level : null,
  setLevel : (level)=>set({level}),

  startTime:null,


  prevCard:null,
  onFlipCard: (card) => set({ prevCard: card }),
  resetStack : ()=>set({prevCard : null}),
    
  matchedList : [],
  matchPush : (card:string)=>set((state)=>({...state, matchedList:[...state.matchedList, card]}))
}))