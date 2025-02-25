-- CreateTable
CREATE TABLE `Bider` (
    `id` VARCHAR(191) NOT NULL,
    `requestId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Bider_requestId_idx`(`requestId`),
    INDEX `Bider_userId_idx`(`userId`),
    UNIQUE INDEX `Bider_requestId_userId_key`(`requestId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Request` (
    `id` VARCHAR(191) NOT NULL,
    `service` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `duration` VARCHAR(191) NOT NULL,
    `start` DATETIME(3) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `negotiable` BOOLEAN NOT NULL DEFAULT false,
    `stage` ENUM('NEW', 'ONGOING', 'COMPLETED') NOT NULL DEFAULT 'NEW',
    `userId` VARCHAR(191) NOT NULL,
    `acceptedBiderId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Request_acceptedBiderId_key`(`acceptedBiderId`),
    INDEX `Request_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
