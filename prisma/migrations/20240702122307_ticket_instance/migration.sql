-- CreateTable
CREATE TABLE "ticket_instances" (
    "id" TEXT NOT NULL,
    "ticket_id" TEXT NOT NULL,
    "price_in_cents" DECIMAL(65,30) NOT NULL,
    "validated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ticket_instances_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ticket_instances" ADD CONSTRAINT "ticket_instances_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
