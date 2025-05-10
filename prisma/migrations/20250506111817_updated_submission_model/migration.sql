/*
  Warnings:

  - Made the column `name` on table `submission` required. This step will fail if there are existing NULL values in that column.
  - Made the column `package` on table `submission` required. This step will fail if there are existing NULL values in that column.
  - Made the column `reference` on table `submission` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `submission` MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `package` VARCHAR(191) NOT NULL,
    MODIFY `reference` VARCHAR(191) NOT NULL;
