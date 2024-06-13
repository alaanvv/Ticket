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
  active      Boolean  @default(true)
  createdAt   DateTime @default(now()) @map("created_at")

  tickets Ticket[]
  @@map("events")
}

model Ticket {
  id           String   @id @default(cuid())
  eventId      String   @map("event_id")
  name         String
  allowHalf    Boolean  @map("allow_half")
  active      Boolean  @default(true)
  createdAt    DateTime @default(now()) @map("created_at")

  event        Event    @relation(fields: [eventId], references: [id], onDelete: Cascade)
  batches Batch[]
  @@map("tickets")
}

model Batch {
  id               String     @id @default(cuid())
  ticketId     String     @map("ticket_id")
  priceInCents     Decimal    @map("price_in_cents")
  halfPriceInCents Decimal?   @map("half_price_in_cents")
  amount           Int
  active      Boolean  @default(true)
  createdAt        DateTime   @default(now()) @map("created_at")

  ticket       Ticket @relation(fields: [ticketId], references: [id], onDelete: Cascade)
  @@map("batches")
}
```

# Routes
- `/events` **POST**
```json
{
  "name": "Exposição",
  "local": "Parque de Exposição",
  "address": "Rua A, Centro, n°57",
  "latitude": -20.9116472,
  "longitude": -44.076647
}
```

- `/ticket/:id` **POST**
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

- `/create-batches/:id` **POST**
```json
{
  "batches": [
    { "priceInCents": 20e3, "amount": 200 },
    { "priceInCents": 30e3, "amount": 100 }
  ]
}
```

- `/edit-event/:id` **PUT**
```json
{
  "name": "Exposição",
  "local": "Parque de Exposição",
  "address": "Rua A, Centro, n°57",
  "latitude": -20.9116472,
  "longitude": -44.076647
}
```

- `/edit-batch/:id` **PUT**
```json
{
  "priceInCents": 50e3,
  "amount": 100
}
```

- `/edit-ticket/:id` **PUT**
```json
{
  "name": "Camarote",
  "allowHalf": 1,
}
```
> If setting allowHalf here, all half prices will be defaulted to 0.5x

- `/events/:id` **GET**

- `/ticket/:id` **GET**

- `/batch/:id` **GET**

- `/event/:id` **DELETE**

- `/batch/:id` **DELETE**

- `/ticket/:id` **DELETE**

> halfPriceInCents is required in batches when their events allowHalf

# Todo
- [x] Setup database
    - [x] Create relation in between an **event** and a **ticket**
    - [x] Add **active** for all tables so data isn't deleted
- [ ] Finish routes
    - [x] Add *edit* and *remove* routes for **event**
    - [x] Create routes to read
    - [ ] Use the **active** from database tables
    - [ ] Not-dashboard operations shouldn't see unactive stuff `where { id, active: true}`
- [ ] Create dashboard
    - [ ] Routes to see **events** and **ticket**
    - [ ] Filters for date
    - [ ] Sorting options (amount remaining, amount sold, date)
- [ ] Create tests for every possibility on each route (so future fixes and features don't break)
