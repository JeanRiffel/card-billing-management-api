# 💳 Card Billing Management API

A RESTful API for managing credit card purchases and monthly invoices, built with [NestJS](https://nestjs.com/), [Prisma ORM](https://www.prisma.io/), and [PostgreSQL](https://www.postgresql.org/). Authentication is handled with JWT.

![License](https://img.shields.io/badge/license-MIT-green)

---

## 🧾 Features

- User registration and login with JWT authentication
- Card registration and listing per user
- Purchase registration (amount, date, description, installments) linked to a card
- Protected routes using Passport JWT, with Swagger API documentation

### 🔜 Backlog (not implemented yet)

- Invoice management API — create/list monthly invoices with total and status. The `Invoice` Prisma model already exists, but there is no controller/use case for it yet, and purchase creation currently requires an `invoiceId` that can't be obtained through the API
- Automatic handling of installment transactions (splitting a purchase into monthly charges)
- Payment tracking for invoices
- Late payment interest calculation
- Natural language invoice explanations (AI)
- Spending anomaly detection (AI)
- Unit test suite (Jest is configured but currently matches no spec files)
- Seed script for test data
- CI/CD pipeline (GitHub Actions) and deploy to Railway/Render

---

## 🚀 Tech Stack

- ✅ [NestJS](https://nestjs.com/) + TypeScript
- ✅ [PostgreSQL](https://www.postgresql.org/) + [Prisma ORM](https://www.prisma.io/)
- ✅ [Passport](https://docs.nestjs.com/security/authentication) + JWT
- ✅ Docker (for database)
- ✅ ESLint + Prettier
- ✅ Cucumber

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/card-billing-management-api.git
cd card-billing-management-api
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Create environment configuration

There is no `.env.example` checked into the repo yet — create a `.env` file in the project root yourself. See [Example .env file](#-example-env-file) below for the variables it needs.

### 4. Start PostgreSQL with Docker

```bash
docker run --name card-billing-db   -e POSTGRES_PASSWORD=postgres   -p 5432:5432   -d postgres
```

### 5. Run database migration

```bash
npx prisma migrate dev --name init
```

### 6. Start the development server

```bash
yarn start:dev
```

---

## Swagger

### Accessing Swagger

```
http://localhost:3000/api-docs
```

---

## 🔐 Authentication

This API uses JWT authentication for protected routes.

### Example

1. `POST /auth/login`
   Request:

   ```json
   {
     "email": "user@example.com",
     "password": "123456"
   }
   ```

2. Response:

   ```json
   {
     "accessToken": "your.jwt.token"
   }
   ```

Use the token in your requests:

```http
Authorization: Bearer your.jwt.token
```

---

## 📡 API Endpoints (examples)

| Method | Route         | Description                              |
|--------|---------------|-------------------------------------------|
| POST   | `/auth/login` | Login with email and password             |
| POST   | `/users`      | Register a new user                        |
| POST   | `/cards`      | Create a new card (protected)              |
| GET    | `/cards`      | List cards for the authenticated user (protected) |
| POST   | `/purchases`  | Create a new purchase (protected)          |
| GET    | `/purchases`  | List purchases for a card (protected)      |

Invoice endpoints are not implemented yet — see [Backlog](#-backlog-not-implemented-yet).

---

## 📁 Project Structure

The codebase follows a DDD / Clean Architecture layout:

```
src/
├── domain/             # Entities, value objects, repository interfaces (framework-agnostic)
│   ├── user/
│   ├── card/
│   ├── purchase/
│   └── repositories/
├── application/         # Use cases, DTOs, and outbound ports, grouped per feature
│   ├── login/
│   ├── user/
│   ├── cards/
│   └── purchase/
├── infra/                # Adapters: Prisma repositories, JWT/bcrypt providers
│   ├── orm/prisma/
│   └── authentication/
├── presentation/http/    # Nest controllers, modules, and request/response DTOs
│   ├── login/
│   ├── users/
│   ├── cards/
│   └── purchases/
├── common/                # Global JWT guard and decorators (@Public, @CurrentUser)
└── main.ts                 # Entry point
```

---

## 📂 Example .env file

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/card_billing_db
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=3600s
PORT=3000
```

---

## 🧪 End-to-End Testing (Cucumber)

This project uses [Cucumber.js](https://github.com/cucumber/cucumber-js) for end-to-end (BDD) tests.

### How to run e2e tests

1. Make sure the database is running and migrations are applied:

   ```bash
   docker-compose up -d
   yarn prisma migrate deploy
   ```

2. Run the e2e tests:

   ```bash
   yarn test:e2e:cucumber
   ```

The output will show a progress bar and a summary of the scenarios.

Feature files are located in `test/e2e-bdd/features/` and step definitions in `test/e2e-bdd/steps/`.

---

## 🧑‍💻 Author

**Jean Riffel**
[github.com/your-username](https://github.com/JeanRiffel)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
