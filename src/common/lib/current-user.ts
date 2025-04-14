
import { auth } from '@clerk/nextjs/server';
import db from '@/common/lib/db';

export const currentGameUser = async () => {
  const { userId } = await auth(); //clerk

  if (!userId) return null;
  console.log("currentUser 훅에서 출력", userId);
  const User = await db.user.findUnique({ //서버
    where : {
      userId
    }
  })

  if (!User) return null;

  const Result = await db.result.findMany({
    where : {
      userId
    }
  })

  return {...User, result:[...Result]};
}