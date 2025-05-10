/*
  Warnings:

  - The primary key for the `submission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `score` on the `submission` table. All the data in the column will be lost.
  - You are about to drop the column `selectedPackage` on the `submission` table. All the data in the column will be lost.
  - Added the required column `email` to the `Submission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referralSource` to the `Submission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referrerUsername` to the `Submission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `submission` DROP PRIMARY KEY,
    DROP COLUMN `score`,
    DROP COLUMN `selectedPackage`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `referralSource` VARCHAR(191) NOT NULL,
    ADD COLUMN `referrerUsername` VARCHAR(191) NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `Order` (
    `id` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `submissionId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_submissionId_fkey` FOREIGN KEY (`submissionId`) REFERENCES `Submission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
