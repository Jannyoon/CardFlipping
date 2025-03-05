'use server';
import db from "./db";

interface Result {
  id : string;
  userId : string;
  levelId : number;
  completionTime : number;
  achievedAt : Date;
  serverId : number;
  user: { userId: string; username: string }; // user 정보 추가 (필요한 필드만 포함)
}

interface GetResultResponse {
  results : Result[];
  nextCursor : string | null;
  prevCursor : string | null;
}

export async function getResults(
  level:string, 
  cursor?:string, 
  direction: "next"|"prev" = "next"
):Promise<GetResultResponse>{

  const limit = 10; //10개씩만 받아오도록 한다.
  const results = await db.result.findMany({
    take : direction==='next' ? limit : -limit,
    skip : cursor ? 1 : 0,
    cursor : cursor ? {id : cursor} : undefined,
    where : {
      serverId : 1,
      levelId : Number(level)
    },
    include : {
      user:{select : {username : true, userId : true}}
    },
    orderBy : [
      { completionTime : direction==="next" ? "asc" : 'desc'},
      { achievedAt : 'asc'}
    
    ]
  });

  if (results.length===0){
    return {results : [], nextCursor:null, prevCursor:null}
  }

  const minCompletionTime = results[0].completionTime;
  const minAchievedAt = results[0].achievedAt;
  const rankOffset = await db.result.count({
    where : {
      serverId : 1,
      levelId : Number(level),
      OR : [
        {completionTime : {lt : minCompletionTime}},
        {completionTime: minCompletionTime, achievedAt:{lt:minAchievedAt}}
      ]
    }
  });

  const rankedResults = results.map((result, idx)=>({...result, rank : rankOffset+idx+1})); 

  if (direction==='prev') results.reverse();
  return {
    results : rankedResults,
    nextCursor : results.length===limit ? results[results.length-1].id : null,
    prevCursor : cursor ? (results.length===limit ? results[0].id : null) : null
  }
}