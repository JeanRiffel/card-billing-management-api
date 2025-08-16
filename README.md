# 💳 Card Billing Management API

A RESTful API for managing credit card purchases and monthly invoices, built with [NestJS](https://nestjs.com/), [Prisma ORM](https://www.prisma.io/), and [PostgreSQL](https://www.postgresql.org/). Authentication is handled with JWT.

![Ollama](https://img.shields.io/badge/Ollama-Local%20LLM-blue?logo=OpenAI&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 🧾 Features

- User registration and login with JWT authentication
- Purchase registration with amount, date, description, and installments
- Monthly invoice generation with total and status
- Protected routes using Passport JWT

### 🔜 Planned features

- Automatic handling of installment transactions
- Payment tracking for invoices
- Late payment interest calculation
- Swagger API documentation
- CI/CD and production deployment

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

Copy `.env.example` to `.env` and update values if needed:

```bash
cp .env.example .env
```

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

🧠 AI Integration (Ollama)

This project uses Ollama to run local LLMs (Large Language Models) like LLaMA3 or Mistral for AI-based features, such as:

  Chat with context per user

  Natural language invoice explanations (planned)

  Spending anomaly detection (planned)


🚀 How to Install and Run Ollama Locally

    You need to install Ollama locally to enable AI endpoints in this API.

✅ 1. Install Ollama

Visit https://ollama.com and follow installation instructions for your system:

    macOS (Intel/Apple Silicon): via Homebrew

    Linux (Debian-based): via .deb package

    Windows: via official installer

Or run

curl -fsSL https://ollama.com/install.sh | sh


✅ 2. Download a model (e.g., llama3)

ollama pull llama3


✅ 3. Run Ollama

ollama run llama3

Ollama will expose a local REST API at http://localhost:11434

✅ 4. Test the API manually (optional)

curl http://localhost:11434/api/generate -d '{
  "model": "llama3",
  "prompt": "Hello, how are you?",
  "stream": false
}'

---


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
     "access_token": "your.jwt.token"
   }
   ```

Use the token in your requests:

```http
Authorization: Bearer your.jwt.token
```

---

## 📡 API Endpoints (examples)

| Method | Route              | Description                         |
|--------|--------------------|-------------------------------------|
| POST   | `/auth/login`      | Login with email and password       |
| POST   | `/users/register`  | Register a new user                 |
| GET    | `/cards`           | List all cards (protected)          |
| POST   | `/purchases`       | Create a new purchase (protected)   |
| GET    | `/invoices`        | Get monthly invoices (protected)    |

---

## 📁 Project Structure

```
src/
├── auth/           # Authentication module
├── users/          # User module
├── cards/          # Card entity
├── purchases/      # Purchases linked to cards
├── invoices/       # Monthly invoice logic
├── prisma/         # Prisma client and schema
├── main.ts         # Entry point
```

---

## 📂 Example .env file

See `.env.example` for reference:

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
## 🧪 To Do

- [ ] Unit and e2e testing
- [ ] Swagger integration
- [ ] Seed script for test data
- [ ] Deploy to Railway/Render
- [ ] CI/CD pipeline (GitHub Actions)

---

## 🧑‍💻 Author

**Jean Riffel**  
[github.com/your-username](https://github.com/JeanRiffel)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
