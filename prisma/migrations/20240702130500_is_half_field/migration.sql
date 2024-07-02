/*
  Warnings:

  - Added the required column `is_half` to the `ticket_instances` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ticket_instances" ADD COLUMN     "is_half" BOOLEAN NOT NULL;
