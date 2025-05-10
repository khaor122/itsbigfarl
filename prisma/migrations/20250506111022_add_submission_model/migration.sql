/*
  Warnings:

  - The primary key for the `order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `status` on the `order` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `order` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `submissionId` on the `order` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `submission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `referralSource` on the `submission` table. All the data in the column will be lost.
  - You are about to drop the column `referrerUsername` on the `submission` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `submission` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_submissionId_fkey`;

-- DropIndex
DROP INDEX `Order_submissionId_fkey` ON `order`;

-- AlterTable
ALTER TABLE `order` DROP PRIMARY KEY,
    DROP COLUMN `status`,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `submissionId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `submission` DROP PRIMARY KEY,
    DROP COLUMN `referralSource`,
    DROP COLUMN `referrerUsername`,
    ADD COLUMN `name` VARCHAR(191) NULL,
    ADD COLUMN `package` VARCHAR(191) NULL,
    ADD COLUMN `reference` VARCHAR(191) NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_submissionId_fkey` FOREIGN KEY (`submissionId`) REFERENCES `Submission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
