# Summary
- [Event Management](#event-management)
- [User Management](#user-management)
- [Ticket Instance](#ticket-instance)
- [Todo](#todo)

# Event Management
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
  batches    Batch[]
  @@map("tickets")
}

model Batch {
  id                  String   @id @default(cuid())
  ticket_id           String
  price_in_cents      Decimal
  half_price_in_cents Decimal?
  amount              Int
  active              Boolean  @default(true)
  created_at          DateTime @default(now())

  ticket              Ticket @relation(fields: [ticket_id], references: [id], onDelete: Cascade)
  instances           TicketInstance[]
  @@map("batches")
}
```

### Routes
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

- `/events/:id` **GET**

- `/all-events` **GET**

- `/event-tickets/:id` **GET**

- `/ticket/:id` **GET**

- `/ticket-batches/:id` **GET**

- `/batch/:id` **GET**

- `/active-batch/:id` **GET**

- `/event/:id` **DELETE**

- `/batch/:id` **DELETE**

- `/ticket/:id` **DELETE**

# User Management
```prisma
model User {
  id         String   @id @default(cuid())
  name       String
  password   String
  role       String
  editable   Boolean  @default(true)
  created_at DateTime @default(now())

  sessions Session[]
  @@map("users")
}

model Session {
  id         String   @id @default(cuid())
  user_id    String
  created_at DateTime @default(now())

  user       User     @relation(fields: [user_id], references: [id], onDelete: Cascade)
  @@map("sessions")
}
```

### Routes
- `/user` **POST**
```json
{
  "name": "alaanvv",
  "password": "123",
  "role": "admin"
}
```

- `/session-login` **POST**
```json
{
  "id": "session id goes here"
}

```

- `/login` **POST**
```json
{
  "name": "alaanvv",
  "password": "123",
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

- `/all-users` **GET**

- `/user/:id` **DELETE**

# Ticket Instance
```prisma
model TicketInstance {
  id             String   @id @default(cuid())
  batch_id       String
  price_in_cents Decimal
  is_half        Boolean
  is_test        Boolean?
  validated_at   DateTime?
  created_at     DateTime @default(now())

  batch          Batch    @relation(fields: [batch_id], references: [id])
  @@map("ticket_instances")
}
```

### Routes
- `/ticket-instance/:id` **POST**
```json
{
  "price_in_cents": 0,
  "is_half": true,
  "is_test": true
}
```

- `/ticket-instance/:id` **GET**

- `/validate-ticket-instance/:id` **PUT**

- `/undo-validation/:id` **PUT**

# Todo
> Event management

`Back-end`
- [x] Setup database
- [x] Create routes
- [x] Write tests

`Front-end`
- [x] Visualize events
- [x] Modifying events
- [x] Modifying tickets
- [x] Modifying batches

> User management

`Back-end`
- [x] User table
- [x] Session system
- [x] Require authorization for some requests

`Front-end`
- [x] Display users
- [x] Create new ones
- [x] Edit (not the main)
- [x] Delete

> Ticket instance

`Back-end`
- [x] Ticket instance
- [x] Route to create
- [x] Route to validate
- [x] Write tests here

> Frontend ticket validation

- [x] Be able to validate through text
- [x] Validate through QR
- [x] Validation history
    - [x] Reactivate a ticket
- [ ] Rewatch Death Note (I'll forward this)

---

> https://www.uniticket.com.br/

> https://q2ingressos.com.br/
