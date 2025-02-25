/*
  Warnings:

  - Added the required column `requestId` to the `Reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reviews` ADD COLUMN `requestId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `Reviews_requestId_idx` ON `Reviews`(`requestId`);
