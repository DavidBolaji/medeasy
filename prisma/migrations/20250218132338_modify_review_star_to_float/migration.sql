/*
  Warnings:

  - You are about to alter the column `star` on the `reviews` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `reviews` MODIFY `star` DOUBLE NOT NULL;
