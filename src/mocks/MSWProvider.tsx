'use client';
import React, { useEffect, useState } from 'react';

export default function MSWProvider({children}:{children:React.ReactNode}) {
  const [isReady, setIsReady] = useState<boolean>(false);


  useEffect(()=>{
    const enableMocking = async ()=>{
      if (process.env.NODE_ENV !=='development') return;
      
      const { worker } = await import("@/mocks/browser");
      await worker.start();
      setIsReady(true);
    };
    enableMocking();
  }, []);

  if (!isReady) return (<div>Loading...</div>)
  return (
    <>{children}</>
  );
}

