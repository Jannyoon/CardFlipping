'use client';
import React, { useEffect, useRef, useState } from 'react';
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import style from './allResultContainer.module.scss';
import SingleResult from './SingleResult';
import { getResults } from '@/common/lib/getResults';


interface AllResultContainerProp {
  level : string;
}

export default function AllResultContainer({level}:AllResultContainerProp) {
  const STORAGE_LEN = 3;
  const [direction, setDirection] = useState<"next"|"prev">("next");
  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
  } = useInfiniteQuery({
    queryKey : ['results', level, direction],
    queryFn: async ({ pageParam, queryKey }:  QueryFunctionContext<string[], string|null>) => {
      const levelNumber = queryKey[1];
      const direction = queryKey[2];
      console.log("fetching되고 있는 상태, pageParam", pageParam);
      return getResults(levelNumber, pageParam??undefined, direction as ('next'|'prev'));
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
    getPreviousPageParam: (firstPage) =>{
      console.log("현재 firstPage를 출력하라", firstPage);
      return firstPage.prevCursor ?? null},

  });
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  

  console.log("그냥 데이터", data);


  useEffect(()=>{
    const prevObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasPreviousPage && !isFetchingPreviousPage) {
        fetchPreviousPage();
      }
    }, { threshold: 1.0 });

    const nextObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }, { threshold: 1.0 });

    if (prevRef.current) prevObserver.observe(prevRef.current);
    if (nextRef.current) nextObserver.observe(nextRef.current);

    return ()=>{
      prevObserver.disconnect();
      nextObserver.disconnect();
    };
  },[hasPreviousPage, isFetchingPreviousPage, hasNextPage, isFetchingNextPage, fetchNextPage, fetchPreviousPage]);

  return (
    <div className={style.container}>
      <div className={style.contents}>
        <div ref={prevRef} style={{'background':"yellow", 'height':'10px'}}/>
        {data?.pages.map((page) => page.results.map((result)=><SingleResult key={result.id} result={result}/>))}
        <div ref={nextRef} style={{'background':"yellow", 'height':'10px'}}/>
      </div>
    </div>
  );
}

