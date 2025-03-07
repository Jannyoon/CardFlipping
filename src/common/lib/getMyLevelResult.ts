'use server';
import db from "./db";



export async function getMyLevelResult(userId:string|undefined, level:string) {
  if (!userId) return null;
  
  const myResultData = await db.result.findFirst({
    where : {
      serverId : 1,
      userId,
      levelId : Number(level)
    }
  });
  if (!myResultData) return null;

  const myCompletionTime = myResultData.completionTime;
  const myAchievedAt = myResultData.achievedAt;

  const rankCount = await db.result.count({
    where : {
      serverId : 1,
      levelId : Number(level),
      OR : [
        {completionTime : {lt : myCompletionTime}},
        {completionTime : myCompletionTime, achievedAt : {lt:myAchievedAt}}
      ]
    }
  });

  return {...myResultData, rank:rankCount+1};
}

