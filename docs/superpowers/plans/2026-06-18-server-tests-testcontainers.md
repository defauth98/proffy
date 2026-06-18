# Server Tests with Testcontainers Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add unit and integration tests for the server using Vitest, Supertest, Docker, and Testcontainers.

**Architecture:** Extract the Express app from the listening entrypoint so Supertest can exercise routes in-process. Integration tests start an isolated PostgreSQL container, configure environment variables before importing the app/database, run Knex migrations, and clean tables between tests.

**Tech Stack:** Node.js, TypeScript, Express, Knex, PostgreSQL, Vitest, Supertest, Testcontainers.

## Global Constraints

- Keep tests focused on `server`.
- Integration tests require Docker running locally.
- Use TDD: write failing tests before production refactors.
- Do not require the existing local `docker-compose.yml` for tests.

---

### Task 1: Test toolchain and app extraction

**Files:**
- Modify: `server/package.json`
- Create: `server/vitest.config.ts`
- Create: `server/src/app.ts`
- Modify: `server/src/server.ts`
- Test: `server/src/app.test.ts`

**Interfaces:**
- Produces: default Express app export from `src/app.ts`.
- Consumes: existing `src/routes.ts`.

Steps:
- Add Vitest/Supertest/Testcontainers dependencies and scripts.
- Write a failing smoke test importing `app`.
- Extract app creation into `src/app.ts`.
- Make `src/server.ts` only call `app.listen`.

### Task 2: Unit tests

**Files:**
- Test: `server/src/utils/convertHourToMinutes.test.ts`

**Interfaces:**
- Consumes: default export from `src/utils/convertHourToMinutes.ts`.

Steps:
- Test conversion of `08:00`, `08:30`, and `23:59`.

### Task 3: Integration test harness

**Files:**
- Create: `server/src/tests/integration/testDb.ts`

**Interfaces:**
- Produces: `startTestDatabase()`, `stopTestDatabase()`, `clearDatabase()`.

Steps:
- Start a PostgreSQL container.
- Set `PG*`, `NODE_ENV`, and `SECRET` env vars.
- Dynamically import Knex connection after env setup.
- Run migrations and truncate tables between tests.

### Task 4: Integration tests for auth/classes/schedule/favorites

**Files:**
- Test: `server/src/tests/integration/api.test.ts`

**Interfaces:**
- Consumes: `app`, `db`, and test DB helpers.

Steps:
- Test protected route rejects missing token.
- Test signup/login.
- Test class creation, default pagination, filtering, schedule add/delete, favorite add/delete.

