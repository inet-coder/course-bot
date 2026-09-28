/*
  Warnings:

  - You are about to drop the `CourseSettings` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[courseId,key]` on the table `Technology` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `courseId` to the `Technology` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Technology_key_key";

-- AlterTable
ALTER TABLE "Technology" ADD COLUMN     "courseId" INTEGER NOT NULL,
ADD COLUMN     "emoji" TEXT NOT NULL DEFAULT '💻';

-- DropTable
DROP TABLE "CourseSettings";

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" TEXT,
    "duration" TEXT,
    "startDate" TEXT,
    "location" TEXT,
    "format" TEXT,
    "phone" TEXT,
    "telegram" TEXT,
    "website" TEXT,
    "address" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseStage" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "intro" TEXT NOT NULL,
    "topics" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CourseStage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_key_key" ON "Course"("key");

-- CreateIndex
CREATE INDEX "Course_isActive_idx" ON "Course"("isActive");

-- CreateIndex
CREATE INDEX "CourseStage_courseId_idx" ON "CourseStage"("courseId");

-- CreateIndex
CREATE INDEX "Technology_courseId_idx" ON "Technology"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "Technology_courseId_key_key" ON "Technology"("courseId", "key");

-- AddForeignKey
ALTER TABLE "CourseStage" ADD CONSTRAINT "CourseStage_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Technology" ADD CONSTRAINT "Technology_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
