/*
  Warnings:

  - The primary key for the `order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `submission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `submission` table. All the data in the column will be lost.
  - You are about to drop the column `package` on the `submission` table. All the data in the column will be lost.
  - You are about to drop the column `reference` on the `submission` table. All the data in the column will be lost.
  - Added the required column `referralSource` to the `Submission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referrerUsername` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_submissionId_fkey`;

-- DropIndex
DROP INDEX `Order_submissionId_fkey` ON `order`;

-- AlterTable
ALTER TABLE `order` DROP PRIMARY KEY,
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `submissionId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `submission` DROP PRIMARY KEY,
    DROP COLUMN `name`,
    DROP COLUMN `package`,
    DROP COLUMN `reference`,
    ADD COLUMN `referralSource` VARCHAR(191) NOT NULL,
    ADD COLUMN `referrerUsername` VARCHAR(191) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_submissionId_fkey` FOREIGN KEY (`submissionId`) REFERENCES `Submission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
