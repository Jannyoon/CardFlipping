import { faker } from '@faker-js/faker';
import { rest } from "msw";

interface ResultRequestBody {
  userId: string | null | undefined;
  level: number | null;
  diff: number;
  endTime: Date | null;
}

interface UserRequestBody {
  userId: string | null | undefined;
  username: string | null | undefined;
}

// 사용자의 랭킹을 등록
export const rankingResultHandlers = [
  rest.post('/api/result', async (req, res, ctx) => {
    try {
      const body = await req.json() as ResultRequestBody;
      const { userId, endTime } = body;

      if (!userId || !endTime) {
        return res(ctx.json({ message: "no UserId(비회원) or no EndTime" }), ctx.status(200));
      }
      return res(ctx.json({ message: 'SUCCESS' }), ctx.status(200));
    } catch (error) {
      return res(ctx.json({ error: 'Internal Error', message: error }), ctx.status(500));
    }
  }),

  rest.get('/api/result', async (req, res, ctx) => {
    const url = new URL(req.url);
    console.log("응답 성공", url);
    return res(ctx.json({ message: url }), ctx.status(200));
  })
];

const fakerUserDB = {
  userId: faker.string.uuid(),
  id: faker.string.ulid(),
  username: faker.person.fullName(),
  serverid: 1,
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
  role: 'GUEST'
};

export const userHandlers = [
  rest.get('/api/user', async (req, res, ctx) => {
    try {
      const User = fakerUserDB;
      if (!User) return res(ctx.json({ user: null }), ctx.status(200));
      return res(ctx.json({ user: User }), ctx.status(200));
    } catch (error) {
      console.error("Error fetching user:", error);
      return res(
        ctx.json({
          error: "Internal Server Error",
          details: error instanceof Error ? error.message : "Unknown error"
        }),
        ctx.status(500)
      );
    }
  }),

  rest.post('/api/user', async (req, res, ctx) => {
    try {
      const body = await req.json() as UserRequestBody;
      const { userId, username } = body;

      if (!userId || !username) {
        return res(ctx.json({ error: 'userId와 username이 필요합니다.' }), ctx.status(400));
      }
      return res(ctx.json({ username, userId }), ctx.status(200));
    } catch (error) {
      console.log("[SERVER POST ERROR]", error);
      return res(ctx.json("Internal ERROR"), ctx.status(500));
    }
  })
];

export const handlers = [...rankingResultHandlers, ...userHandlers];
