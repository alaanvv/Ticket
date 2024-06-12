-- DropForeignKey
ALTER TABLE "batches" DROP CONSTRAINT "batches_ticket_type_id_fkey";

-- AddForeignKey
ALTER TABLE "batches" ADD CONSTRAINT "batches_ticket_type_id_fkey" FOREIGN KEY ("ticket_type_id") REFERENCES "ticket_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
