
export const calcTime = (time : number|null)=>{
  if (!time) return {minutes:'00', seconds:'00', ms:'00'};
  const secInMs = Math.floor(time / 1000);
  const minInMs = Math.floor(secInMs / 60);
  const ms = time % 1000;
  const seconds = secInMs % 60;
  const minutes = minInMs % 60;
  return {
    minutes: String(minutes).padStart(2,'0'), 
    seconds: String(seconds).padStart(2,'0'), 
    ms: String(ms).padStart(2,'0'), 
  } 
}
