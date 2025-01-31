//현재의 유저를 받아오는 api 함수
import { NextResponse } from "$/next/server"
import { currentGameUser } from "@/common/lib/current-user"
import db from "@/common/lib/db";

export const GET = async () => {
  try {
    const User = await currentGameUser();
    if (!User){
      return NextResponse.json({user: null}, {status:200});
    }
    return NextResponse.json({user: User}, {status:200});
  } catch(error){
    console.error("Error fetching user:", error);
    return NextResponse.json(
      {error: "Internal Server Error", details: error instanceof Error ? error.message : "Unknown error"},
      {status: 500} //500 Internal Server Error
    )

  }
}

export const POST = async (req: Request) => {
  try {
    const {userId, username} = await req.json(); 
    console.log("recieved Data", userId, username);
    if (!userId || !username){
      return NextResponse.json(
        {error : 'userId와 username이 필요합니다.'},
        {status : 400}
      )
    }

    const newUser = await db.user.create({
      data : {
        username,
        userId,
        serverid : 1,
        role : "GUEST"
      }
    })
    console.log("NEW USER CREATED")
    return NextResponse.json(newUser, {status : 200});
  } catch (error){
    console.log("[SERVER POST ERROR]", error);
    return NextResponse.json("Internal ERROR", {status:500})
  }
}