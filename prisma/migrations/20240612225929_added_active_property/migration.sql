-- AlterTable
ALTER TABLE "batches" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "ticket_types" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;
