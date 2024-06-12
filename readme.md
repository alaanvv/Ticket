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
> If setting allowHalf here, all half prices will be defaulted to 0.5x

- `/remove-batch/:id` **DELETE**

- `/remove-ticket-type/:id` **DELETE**

> halfPriceInCents is required in batches when their events allowHalf

# Todo
- [ ] Setup database
    - [ ] Create relation in between an **event** and a **ticketType**
    - [ ] Add **active** for all tables so data isn't deleted
- [ ] Finish routes
    - [ ] Not-dashboard operations shouldn't see not active stuff `where { id, active: true}`
    - [ ] Add *edit* and *remove* routes for **event**
- [ ] Create dashboard
    - [ ] Routes to see **events** and **ticket types**
    - [ ] Filters for date
    - [ ] Sorting options (amount remaining, amount sold, date)
- [ ] Create tests for every possibility on each route (so future fixes and features don't break)
