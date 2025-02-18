import FisherYates from "./fisher-yates";
import 숫자 from '#/0312.png';
import 교 from '#/교.png';
import 메폐 from '#/메폐.png';
import 바라 from '#/바라.png';
import 솔로몬 from '#/솔로몬.png';
import 즈토 from '#/즈토.png';
import 치즈 from '#/치즈.png';
import 키다코 from '#/키다코.png';


const baseList= [
  ['0312', 숫자], 
  ['교', 교], 
  ['메폐', 메폐], 
  ['바라', 바라], 
  ['솔로몬', 솔로몬], 
  ['즈토', 즈토], 
  ['치즈', 치즈], 
  ['키다코', 키다코]
];

//level 별로 정해진 count 개수만큼 리스트를 뽑아옴
export function PickCards(count:number){
  return FisherYates(baseList, count);
}

export function GameCardsShuffle(count:number){
  const arr = PickCards(count);
  return FisherYates([...arr, ...arr]);
}