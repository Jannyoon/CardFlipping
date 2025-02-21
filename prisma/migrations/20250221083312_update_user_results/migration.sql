/*
  Warnings:

  - You are about to drop the column `score` on the `Result` table. All the data in the column will be lost.
  - The primary key for the `Server` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Server` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[serverId,userId,levelId]` on the table `Result` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[serverid,username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `serverId` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Made the column `completionTime` on table `Result` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `serverid` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "Result" DROP COLUMN "score",
ADD COLUMN     "serverId" INTEGER NOT NULL,
ALTER COLUMN "completionTime" SET NOT NULL;

-- AlterTable
ALTER TABLE "Server" DROP CONSTRAINT "Server_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Server_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "serverid",
ADD COLUMN     "serverid" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Result_serverId_userId_levelId_idx" ON "Result"("serverId", "userId", "levelId");

-- CreateIndex
CREATE INDEX "Result_serverId_idx" ON "Result"("serverId");

-- CreateIndex
CREATE UNIQUE INDEX "Result_serverId_userId_levelId_key" ON "Result"("serverId", "userId", "levelId");

-- CreateIndex
CREATE INDEX "User_serverid_idx" ON "User"("serverid");

-- CreateIndex
CREATE UNIQUE INDEX "User_serverid_username_key" ON "User"("serverid", "username");
