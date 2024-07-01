# Database
```prisma
model Event {
  id          String   @id @default(cuid())
  name        String
  description String?
  local       String
  address     String
  image       String?
  latitude    Decimal
  longitude   Decimal
  date        DateTime
  active      Boolean  @default(true)
  created_at  DateTime @default(now())

  tickets Ticket[]
  @@map("events")
}

model Ticket {
  id         String   @id @default(cuid())
  event_id   String
  name       String
  allow_half Boolean
  active     Boolean  @default(true)
  created_at DateTime @default(now())

  event      Event    @relation(fields: [event_id], references: [id], onDelete: Cascade)
  batches Batch[]
  @@map("tickets")
}

model Batch {
  id                  String     @id @default(cuid())
  ticket_id           String
  price_in_cents      Decimal
  half_price_in_cents Decimal?
  amount              Int
  active              Boolean  @default(true)
  created_at          DateTime   @default(now())

  ticket              Ticket @relation(fields: [ticket_id], references: [id], onDelete: Cascade)
  @@map("batches")
}

model User {
  id         String   @id @default(cuid())
  name       String
  password   String
  role       String
  created_at DateTime @default(now())
  @@map("users")
}
```

# Routes
- `/user` **POST**
```json
{
  "name": "alaanvv",
  "password": "123",
  "role": "admin"
}
```

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
  "allow_half": 0,
  "batches": [
    { "price_in_cents": 20e3, "amount": 200 },
    { "price_in_cents": 30e3, "amount": 100 }
  ]
}
```

- `/create-batches/:id` **POST**
```json
{
  "batches": [
    { "price_in_cents": 20e3, "amount": 200 },
    { "price_in_cents": 30e3, "amount": 100 }
  ]
}
```

- `/edit-user/:id` **PUT**
```json
{
  "name": "alaanvv",
  "password": "123",
  "role": "admin"
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
  "price_in_cents": 50e3,
  "amount": 100
}
```

- `/edit-ticket/:id` **PUT**
```json
{
  "name": "Camarote",
  "allow_half": 1,
}
```
> If setting allow_half here, all half prices will be defaulted to 0.5x

- `/all-users` **GET**

- `/events/:id` **GET**

- `/all-events` **GET**

- `/event-tickets/:id` **GET**

- `/ticket/:id` **GET**

- `/ticket-batches/:id` **GET**

- `/batch/:id` **GET**

- `/active-batch/:id` **GET**

- `/user/:id` **DELETE**

- `/event/:id` **DELETE**

- `/batch/:id` **DELETE**

- `/ticket/:id` **DELETE**

# Todo
> Backend event management
- [x] Setup database
    - [x] Create relation in between an **event** and a **ticket**
    - [x] Add **active** for all tables so data isn't deleted
- [x] Finish routes
    - [x] Add *edit* and *remove* routes for **event**
    - [x] Create routes to read
    - [x] Use the **active** from database tables
    - [x] Non-dashboard operations shouldn't see unactive stuff `where { id, active: true}`
    - [x] Routes to fetch stuff that belongs to other stuff
        - [x] All tickets within an event
        - [x] All batches within a ticket
        - [x] Active batch of a ticket
- [x] Create tests for every possibility on each route (so future fixes and features don't break)
- [x] Add a starting date field for events

> Frontend event management
- [x] Visualize events
    - [x] Have them visually
    - [x] Have the true events from the database
    - [x] Be able to search
    - [x] Be able to open them in a separated page for more
- [x] Modifying events
    - [x] Create button (it's already there)
    - [x] Delete button (easy as fuck)
    - [x] Edit it's data
    - [x] Refactor and stylize all this shit
    - [x] Add tickets to it (I regret borning)
    - [x] Add icons do everything I can
- [x] Modifying tickets
    - [x] Create a page to view a ticket details
    - [x] Edit button
    - [x] Delete button
    - [x] Add batches to it (holy fuck)
- [x] Modifying batches
    - [x] Create button
    - [x] Edit button
    - [x] Delete button
- [ ] Refactor

> Getting back to back
- [x] User table
    - [x] GET
    - [x] POST
    - [x] PUT
    - [x] DELETE

> Frontend user management
- [ ] Display users
- [ ] Create new ones
- [ ] Edit (not the main)
- [ ] Delete

> Hard part on backend
- [ ] Ticket instance
    - [ ] Create database table (status, price_paid)
    - [ ] Rewatch Death Note
    - [ ] Create route to sell it
        - [ ] Decrease amount on stock (deactive on 0)
    - [ ] Tests here
- [ ] Create dashboard
    - [ ] Routes to see **events** and **ticket**
    - [ ] Filters for date
    - [ ] Sorting options (amount remaining, amount sold, date)
    - [ ] Tests here also

> https://www.uniticket.com.br/

> https://q2ingressos.com.br/
