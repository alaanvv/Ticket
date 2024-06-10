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
    // 'halfPriceInCents' required when 'allowHalf'
    { "priceInCents": 20e3, "amount": 200 },
    { "priceInCents": 30e3, "amount": 100 }
  ]
}
```

- `/add-batches/:id` **POST**
```json
{
  "batches": [
    // 'halfPriceInCents' required when 'allowHalf'
    { "priceInCents": 20e3, "amount": 200 },
    { "priceInCents": 30e3, "amount": 100 }
  ]
}
```

# Todo
- [ ] Setup ticket database
- [ ] Create communication with database
    - [ ] Make it as much verbose as possible

# Quick Todo
- edit-batch.ts
- edit-ticket-type.ts

- remove-batch.ts
- remove-ticket-type.ts

# To ask
- Ver se o comprador precisa de pagina de buscar eventos (caso tenha muitos)
- Pra comprar no site precisa ter conta (pra pegar dados)
