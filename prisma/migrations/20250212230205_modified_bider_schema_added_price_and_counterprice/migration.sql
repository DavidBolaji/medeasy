/*
  Warnings:

  - Added the required column `counterPrice` to the `Bider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Bider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bider` ADD COLUMN `counterPrice` INTEGER NOT NULL,
    ADD COLUMN `price` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `request` ADD COLUMN `finalPrice` INTEGER NOT NULL DEFAULT 0;
