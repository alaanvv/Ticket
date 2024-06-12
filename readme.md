# Database
```prisma
model Event {
  id          String   @id @default(cuid())
  name        String
  description String?
  local       String
  address     String
  latitude    Decimal
  longitude   Decimal
  createdAt   DateTime @default(now()) @map("created_at")

  @@map("events")
}

model TicketType {
  id           String   @id @default(cuid())
  name         String
  allowHalf    Boolean  @map("allow_half")
  createdAt    DateTime @default(now()) @map("created_at")

  batches Batch[]
  @@map("ticket_types")
}

model Batch {
  id               String     @id @default(cuid())
  ticketTypeId     String     @map("ticket_type_id")
  priceInCents     Decimal    @map("price_in_cents")
  halfPriceInCents Decimal?   @map("half_price_in_cents")
  amount           Int
  createdAt        DateTime   @default(now()) @map("created_at")

  ticketType       TicketType @relation(fields: [ticketTypeId], references: [id])
  @@map("batches")
}
```

# Routes
- `/ticket-type` **POST**
```json
{
  "name": "Pista",
  "allowHalf": 0,
  "batches": [
    { "priceInCents": 20e3, "amount": 200 },
    { "priceInCents": 30e3, "amount": 100 }
  ]
}
```

- `/add-batches/:id` **POST**
```json
{
  "batches": [
    { "priceInCents": 20e3, "amount": 200 },
    { "priceInCents": 30e3, "amount": 100 }
  ]
}
```

- `/edit-batch/:id` **PUT**
```json
{
  "priceInCents": 50e3,
  "amount": 100
}
```

- `/edit-ticket-type/:id` **PUT**
```json
{
  "name": "Camarote",
  "allowHalf": 1,
}
```

- `/remove-batch/:id` **DELETE**

- `/remove-ticket-type/:id` **DELETE**

> If setting allowHalf here, all half prices will be defaulted to 0.5x

> halfPriceInCents is required in batches when their events allowHalf

# Todo
- [ ] Setup ticket database
- [ ] Create communication with database
    - [ ] Make it as much verbose as possible

# Quick Todo
- remove-batch.ts
- remove-ticket-type.ts
