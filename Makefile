.PHONY: help install install-web install-server install-mobile db-up db-wait db-down db-logs db-reset migrate seed dev dev-web dev-server dev-mobile build-web test-server test-server-unit test-server-integration typecheck-server typecheck-web typecheck-mobile verify

COMPOSE = docker compose -f server/docker-compose.yml

help:
	@echo "Comandos disponíveis:"
	@echo "  make install        Instala dependências de web, server e mobile"
	@echo "  make db-up          Inicia o PostgreSQL com Docker"
	@echo "  make db-down        Para o PostgreSQL"
	@echo "  make db-logs        Mostra logs do PostgreSQL"
	@echo "  make migrate        Roda migrations no banco local"
	@echo "  make seed           Recria o banco local e roda seeds"
	@echo "  make db-reset       Alias para make seed"
	@echo "  make dev            Inicia banco, server e web em modo desenvolvimento"
	@echo "  make dev-web        Roda apenas o web com Vite"
	@echo "  make dev-server     Inicia banco e roda apenas o server"
	@echo "  make dev-mobile     Roda apenas o mobile com Expo"
	@echo "  make build-web      Gera build de produção do web"
	@echo "  make test-server    Roda testes unitários e integração do server com Testcontainers"
	@echo "  make test-server-unit         Roda testes unitários do server"
	@echo "  make test-server-integration  Roda testes de integração do server com Docker/Testcontainers"
	@echo "  make typecheck-server         Roda typecheck do server"
	@echo "  make typecheck-web            Roda build/typecheck do web"
	@echo "  make typecheck-mobile         Roda typecheck do mobile"
	@echo "  make verify         Roda testes do server e verificações de server/web/mobile"

install: install-web install-server install-mobile

install-web:
	pnpm --dir web install

install-server:
	pnpm --dir server install

install-mobile:
	pnpm --dir mobile install

db-up:
	$(COMPOSE) up -d postgres
	$(MAKE) db-wait

db-wait:
	@echo "Aguardando PostgreSQL..."
	@until $(COMPOSE) exec -T postgres pg_isready -U postgres -d proffy >/dev/null 2>&1; do sleep 1; done
	@echo "PostgreSQL pronto em localhost:5432"

db-down:
	$(COMPOSE) down

db-logs:
	$(COMPOSE) logs -f postgres

migrate: db-up
	pnpm --dir server run migrate

seed: db-up
	pnpm --dir server run seed

db-reset: seed

dev: db-up
	@trap 'kill 0' INT TERM EXIT; \
	pnpm --dir server run dev & \
	pnpm --dir web run dev & \
	wait

dev-web:
	pnpm --dir web run dev

dev-server: db-up
	pnpm --dir server run dev

dev-mobile:
	pnpm --dir mobile run start

build-web:
	pnpm --dir web run build

test-server:
	pnpm --dir server run test

test-server-unit:
	pnpm --dir server run test:unit

test-server-integration:
	pnpm --dir server run test:integration

typecheck-server:
	pnpm --dir server exec tsc --noEmit

typecheck-web:
	pnpm --dir web run build

typecheck-mobile:
	pnpm --dir mobile exec tsc --noEmit

verify: test-server typecheck-server typecheck-web typecheck-mobile
