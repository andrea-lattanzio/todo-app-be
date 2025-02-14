/*
  Warnings:

  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TagToTask` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Tag` DROP FOREIGN KEY `Tag_userId_fkey`;

-- DropForeignKey
ALTER TABLE `_TagToTask` DROP FOREIGN KEY `_TagToTask_A_fkey`;

-- DropForeignKey
ALTER TABLE `_TagToTask` DROP FOREIGN KEY `_TagToTask_B_fkey`;

-- DropTable
DROP TABLE `Tag`;

-- DropTable
DROP TABLE `_TagToTask`;
