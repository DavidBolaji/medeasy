/*
  Warnings:

  - You are about to alter the column `verified` on the `user` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(5))`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `verified` ENUM('TRUE', 'FALSE', 'PENDING') NOT NULL DEFAULT 'PENDING';
