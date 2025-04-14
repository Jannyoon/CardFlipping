import { PrismaClient } from '@prisma/client'
//import { withAccelerate } from '@prisma/extension-accelerate'

//타입 전역 설정
const globalForPrisma = globalThis as unknown as {
  prisma : PrismaClient | undefined;
}

const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !=='production'){
  globalForPrisma.prisma = db
}

export default db;
