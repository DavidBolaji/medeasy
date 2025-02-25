-- CreateTable
CREATE TABLE `Reviews` (
    `id` VARCHAR(191) NOT NULL,
    `creatorId` VARCHAR(191) NOT NULL,
    `receivedId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` MEDIUMTEXT NOT NULL,
    `star` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Reviews_creatorId_idx`(`creatorId`),
    INDEX `Reviews_receivedId_idx`(`receivedId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
