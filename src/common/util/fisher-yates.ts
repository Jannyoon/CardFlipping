//배열 요소들을 랜덤하게 섞어서 count 개수만큼 return하는 순수함수
export default function FisherYates<T>(array: T[], count?:number):T[]{
  const shuffled = [...array];

  for (let i=shuffled.length-1; i>0; i--){
    const j = Math.floor(Math.random()*(i+1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  if (count) return shuffled.splice(0,count);
  else return shuffled;
}