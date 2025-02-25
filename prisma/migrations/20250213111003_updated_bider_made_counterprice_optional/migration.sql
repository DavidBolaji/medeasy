/*
  Warnings:

  - Added the required column `pitch` to the `Bider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `Bider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bider` ADD COLUMN `pitch` MEDIUMTEXT NOT NULL,
    ADD COLUMN `start` DATETIME(3) NOT NULL;
