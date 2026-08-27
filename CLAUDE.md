# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A NestJS REST API for managing credit card purchases and monthly invoices (users, cards, purchases, invoices), with JWT authentication (Passport) and Prisma/PostgreSQL for persistence. There is also an experimental chat feature backed by a local Ollama LLM (`src/old-structure/artificial-inteligence`). Swagger docs are served at `/api-docs`.

## Commands

```bash
yarn install                 # install deps
yarn start:dev                # run with watch mode
yarn start:debug              # run with --inspect + watch
yarn build                    # nest build -> dist/
yarn start:prod                # run dist/main.js (after build)

yarn lint                     # eslint --fix over src/apps/libs/test
yarn format                   # prettier --write src/**/*.ts test/**/*.ts

yarn test                     # jest unit tests
yarn test:watch
yarn test:cov
yarn test:debug                # jest --runInBand under the node inspector

yarn test:e2e:cucumber        # cucumber-js e2e/BDD suite (test/e2e-bdd)
```

- To run a single Jest test file: `yarn test -- path/to/file.spec.ts` (or `-t "test name"` to filter by name). Note: `jest.config.js` currently sets `testMatch: ['**/test/**/*.spec.ts']`, but the only existing spec (`src/app.controller.spec.ts`) lives under `src/`, so `yarn test` currently matches **zero** files out of the box — this is a pre-existing config/layout mismatch, not something you broke.
- Cucumber features live in `test/e2e-bdd/features/**/*.feature`, step defs in `test/e2e-bdd/steps/`, bootstrap in `test/e2e-bdd/steps/bootstrap.ts`.
- Prisma: `npx prisma migrate dev --name <name>` to create/apply a migration, `npx prisma generate` after schema changes. Schema is at `prisma/schema.prisma`.
- Local Postgres: `docker-compose up` (app + postgres) or the single `docker run postgres:16` command from the README for DB-only.
- `.env` is required (`DATABASE_URL`, `JWT_SECRET`); there is no `.env.example` checked in despite the README referencing one — check with the user before assuming its shape.

## Architecture

The codebase is mid-migration from a flat Nest module layout to DDD / Clean Architecture. **Both styles currently coexist**, which is the main thing to know before touching auth, users, or AI/chat code:

- `src/domain/` — entities, value objects, and repository *interfaces* (ports), no framework code. e.g. `domain/user/entity/user.ts`, `domain/user/repository/user-repository.ts`, `domain/card`, `domain/purchase`.
- `src/application/` — use cases (one class per action, `execute()` method) plus their DTOs and outbound ports (`password-hasher.ts`, `ports/token-provider.ts`). Use cases depend only on domain interfaces, injected via Nest DI tokens (e.g. `@Inject('USER_REPOSITORY')`, `CARD_REPOSITORY`).
- `src/infra/` — concrete adapters for the ports above: `infra/orm/prisma/prisma.service.ts` + `infra/orm/repository/**` (Prisma implementations of the domain repositories), `infra/authentication/**` (`BcryptPasswordHasher`, `JwtTokenProvider`, `JwtStrategy`).
- `src/presentation/http/` — Nest controllers, modules, and request/response DTOs per feature (`cards`, `purchases`, `users`, `login`). Modules wire use cases to their infra adapters via string/Symbol DI tokens.
- `src/common/` — cross-cutting Nest pieces: `guards/jwt-auth.guard.ts` (global guard, opts out via `@Public()`), `decorators/public.decorator.ts`, `decorators/current-user.decorator.ts`.
- `src/old-structure/` — **not yet migrated** modules still wired into `app.module.ts` today (`artificial-inteligence` chat module). Treat this as legacy code being phased out feature-by-feature, not a place to add new things.
- `src/users/dto/*` — an older, separate copy of the user DTOs that `UsersController` still imports from, alongside a newer copy under `src/application/user/dto/`. When touching user DTOs, check both and confirm which one is actually wired before assuming a single source of truth.

Auth flow: `JwtAuthGuard` is registered globally in `main.ts` (`app.useGlobalGuards`), so every route requires a valid JWT unless annotated `@Public()`. `POST /auth/login` (public) runs `LoginUseCase`, which looks up the user via `UserRepository`, checks the password via `PasswordHasher` (bcrypt), and issues a token via `TokenProvider` (`JwtTokenProvider`, using `@nestjs/jwt`). `JwtStrategy` validates incoming bearer tokens against `JWT_SECRET`.

Each feature module (`cards`, `purchases`, `login`, `users`) binds its domain repository interface to a Prisma-backed implementation via a Nest DI token defined near the repository interface (e.g. `CARD_REPOSITORY` in `domain/repositories/card-repository.ts`, string tokens `'USER_REPOSITORY'`/`'PASSWORD_HASHER'`/`'TOKEN_PROVIDER'` in the login module) — grep for the token name to find both sides of a binding.

Prisma schema (`prisma/schema.prisma`) models: `User` → `Card` → `Purchase`/`Invoice`, plus `Category` and `ChatMessage`. Migrations are in `prisma/migrations/`.
