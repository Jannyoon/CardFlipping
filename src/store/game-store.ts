import {create} from 'zustand';

type gameStateType = 'running'|'stop'|'refresh'|'end'|null;

interface GameStoreType{
  gameState : gameStateType;
  remaining : number|null;

  onStart : (level:number) => void;
  onReset : ()=>void;
  level : number|null;
  setLevel: (level:number)=>void;
  startTime : Date|null;

  prevCard : string|null,
  onFlipCard : (card:string)=>void,

}

export const useGameStore = create<GameStoreType>((set)=>({
  gameState : null,
  remaining : null,
  onStart : (level)=>set((state)=>{
    state.gameState = 'running';
    state.level = level;
    state.remaining = level===1 ? 5 : (level===2 ? 6 : 8);

    return {
      ...state, 
      gameState: state.gameState,
      remaining : state.remaining, 
      level: state.level, 
    }
  }),
  onReset : ()=>set({
    gameState:null, 
    remaining:null, 
    level:null, 
    startTime:null, 
    prevCard:null
  }),
  
  level : null,
  setLevel : (level)=>set({level}),
  startTime:null,


  prevCard:null,
  onFlipCard : (card)=>set((state)=>({...state, prevCard:card, matching:true})),
  resetStack : ()=>set((state)=>({...state, prevCard : null, matching:false})),
}))