import { PrismaClient } from '@prisma/client'
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();


async function main(){
  const dummyUser = Array.from({length : 200}, ()=> ({
    username : faker.person.fullName(),
    userId : faker.string.uuid(),
    serverid : 1
  }));

  const dummyResult1 = dummyUser.map((user)=>({
    userId : user.userId,
    levelId : 1,
    completionTime : faker.number.int({min : 5000, max : 20000}),
    serverId : 1
  }))

  const dummyResult2 = dummyUser.map((user)=>({
    userId : user.userId,
    levelId : 2,
    completionTime : faker.number.int({min : 5000, max : 20000}),
    serverId : 1
  }))

  const dummyResult3 = dummyUser.map((user)=>({
    userId : user.userId,
    levelId : 3,
    completionTime : faker.number.int({min : 5000, max : 20000}),
    serverId : 1
  }))

  await prisma.user.createMany({
    data : dummyUser
  });

  await prisma.result.createMany({
    data : [...dummyResult1, ...dummyResult2 , ...dummyResult3]
  });

  console.log("600개의 dummyData가 저장되었음");
};

main()
.catch((e)=>{
  console.error(e);
  process.exit(1);
})
.finally(async ()=>{
  await prisma.$disconnect();
})
