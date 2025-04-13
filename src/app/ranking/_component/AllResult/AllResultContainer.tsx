'use client';
import React, { useEffect } from 'react';
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import style from './allResultContainer.module.scss';
import SingleResult from './SingleResult';
import { getResults } from '@/common/lib/getResults';
import Skeleton from './_Skeleton/Skeleton';


interface AllResultContainerProp {
  level : string;
}

export default function AllResultContainer({level}:AllResultContainerProp) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey : ['results', level],
    queryFn: async ({ pageParam, queryKey }:  QueryFunctionContext<string[], string|null>) => {
      try {
        const levelNumber = queryKey[1];
        return await getResults(levelNumber, pageParam??undefined);
      } catch(error){
        console.log("데이터 전송 오류", error);
        throw new Error("데이터를 정상적으로 불러오지 못했습니다.");
      }
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
    getPreviousPageParam: (firstPage) =>firstPage.prevCursor ?? null,
    staleTime : 5*60*1000,
    gcTime : 6*60*1000

  });
  const { ref, inView} = useInView({
    /* Optional options */
    threshold: 0.8,
  });


  useEffect(()=>{
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  },[inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (!data){
    return (
      <div className={style.container}>
        <div className={style.contents}>
          <Skeleton/>
          <Skeleton/>
          <Skeleton/>
          <Skeleton/>
          <Skeleton/>
          <Skeleton/>
          <Skeleton/>
          <Skeleton/>
          <Skeleton/>
        </div>
      </div>
    )
  }
  return (
    <div className={style.container}>
      <div className={style.contents}>
        {data.pages.map((page) => page.results.map((result)=><SingleResult key={result.id} result={result}/>))}
        <div ref={ref} style={{'height':'100%', 'padding':'0.5rem'}}>
          {isFetchingNextPage && 'Loading...'}
        </div>
      </div>
    </div>
  );
}

