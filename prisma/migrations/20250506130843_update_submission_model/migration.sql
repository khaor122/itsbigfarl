/*
  Warnings:

  - You are about to drop the column `referralSource` on the `submission` table. All the data in the column will be lost.
  - You are about to drop the column `referrerUsername` on the `submission` table. All the data in the column will be lost.
  - Added the required column `name` to the `Submission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `package` to the `Submission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reference` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `submission` DROP COLUMN `referralSource`,
    DROP COLUMN `referrerUsername`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `package` VARCHAR(191) NOT NULL,
    ADD COLUMN `reference` VARCHAR(191) NOT NULL;
