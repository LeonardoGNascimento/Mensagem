/*
  Warnings:

  - A unique constraint covering the columns `[codigo]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Chat_codigo_key` ON `Chat`(`codigo`);
