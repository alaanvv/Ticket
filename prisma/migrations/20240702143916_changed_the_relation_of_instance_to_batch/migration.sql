/*
  Warnings:

  - You are about to drop the column `ticket_id` on the `ticket_instances` table. All the data in the column will be lost.
  - Added the required column `batch_id` to the `ticket_instances` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ticket_instances" DROP CONSTRAINT "ticket_instances_ticket_id_fkey";

-- AlterTable
ALTER TABLE "ticket_instances" DROP COLUMN "ticket_id",
ADD COLUMN     "batch_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ticket_instances" ADD CONSTRAINT "ticket_instances_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "batches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
