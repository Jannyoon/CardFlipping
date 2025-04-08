'use client';
import { StaticImageData } from "$/next/image";

export const convertToWebp = (pngSrc: string | StaticImageData,
  worker:Worker|null
):Promise<string> => {
  const src = typeof pngSrc==="string" ? pngSrc : pngSrc.src;
  const absoluteURL = new URL(src, location.origin).toString();
  console.log("convertWebp의 src", src);
  return new Promise((resolve, reject)=>{
    if (!worker){
      reject(new Error("Worker is not available"));
      return;
    }
    const id = crypto.randomUUID();

    const handleMessage = (event:MessageEvent) =>{
      if (event.data.id!==id) return;
      if (event.data.webpUrl){
        resolve(event.data.webpUrl);
      }
      else {
        reject(event.data.error || 'Unknown error');
      }
      worker.removeEventListener('message', handleMessage);
    }

    worker.addEventListener('message', handleMessage);
    worker.postMessage({id, pngSrc:absoluteURL });
    console.log("메시지 보냈음", id, absoluteURL );

  })
}