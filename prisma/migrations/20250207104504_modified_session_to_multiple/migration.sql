-- DropIndex
DROP INDEX `Session_userId_key` ON `session`;

-- CreateIndex
CREATE INDEX `Session_userId_idx` ON `Session`(`userId`);
