/*
  Warnings:

  - A unique constraint covering the columns `[identificationNumber]` on the table `Attendant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[identificationNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `identificationNumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identificationType` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `identificationNumber` BIGINT NOT NULL,
    ADD COLUMN `identificationType` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `identificationNumber_Attendant_unique_constraint` ON `Attendant`(`identificationNumber`);

-- CreateIndex
CREATE UNIQUE INDEX `username_unique_constraint` ON `User`(`username`);

-- CreateIndex
CREATE UNIQUE INDEX `identificationNumber_User_unique_constraint` ON `User`(`identificationNumber`);
