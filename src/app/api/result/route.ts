import { NextResponse } from "$/next/server";
import db from "@/common/lib/db";



export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { userId, level, diff, endTime } = body;

    const existingLevelResult = await db.result.findFirst({
      where : {
        userId,
        levelId : Number(level),
        serverId : 1
      }, 
    });

    if (!existingLevelResult){
      await db.result.create({
        data:{
          userId,
          levelId : Number(level),
          completionTime : diff,
          achievedAt : endTime,
          serverId : 1,
        }
      })
    } else if (diff<existingLevelResult.completionTime){
      await db.result.update({
        where : {id : existingLevelResult.id},
        data : {
          completionTime: diff
        }
      })
    }
    return NextResponse.json({message : 'SUCCESS'}, {status : 200});

  } catch (error){
    console.log("[SERVER POST ERROR]", error);
    return NextResponse.json({error : "Internal ERROR"}, {status : 500})
  }
}

export const GET = async (req:Request)=>{
  const url = new URL(req.url);
  console.log("get api", url);
  const userId = url.searchParams.get('userId');
  const level = url.searchParams.get('level');
  console.log(userId, level, "결과 출력");
  return NextResponse.json({message : url}, {status : 200});


}