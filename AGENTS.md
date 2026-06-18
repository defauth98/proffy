# Instruções para agentes

Este arquivo resume os padrões atuais do projeto **Proffy** para orientar alterações futuras feitas por agentes de código.

## Visão geral

- Monorepo com três aplicações principais:
  - `server/`: API Node.js + Express + TypeScript + Drizzle ORM + PostgreSQL.
  - `web/`: frontend React + TypeScript + Vite.
  - `mobile/`: app React Native + Expo + TypeScript.
- O gerenciador de pacotes padrão é **pnpm**.
- Prefira os comandos do `Makefile` da raiz para instalar, rodar, testar e verificar o projeto.

## Estrutura principal

```text
.
├── Makefile
├── render.yaml
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── database/
│   │   ├── middlewares/
│   │   ├── modules/
│   │   ├── resources/
│   │   ├── routes.ts
│   │   └── server.ts
│   └── tests/
├── web/
│   └── src/
│       ├── components/
│       ├── contexts/
│       ├── routes/
│       ├── services/
│       ├── type/
│       └── types/
└── mobile/
    └── src/
        ├── components/
        ├── contexts/
        ├── routes/
        ├── services/
        └── utils/
```

## Comandos comuns

Use estes comandos a partir da raiz do repositório:

```bash
make install                 # instala dependências de web, server e mobile
make db-up                   # inicia PostgreSQL local via Docker
make migrate                 # roda migrations do backend
make seed                    # recria/popula banco local
make dev                     # sobe banco, server e web
make dev-web                 # roda apenas web
make dev-server              # roda apenas server, iniciando banco antes
make dev-mobile              # roda Expo/mobile
make build-web               # build do frontend web
make test-server             # testes unitários e integração do server
make test-server-unit        # testes unitários do server
make test-server-integration # testes de integração do server
make typecheck-server        # typecheck do server
make typecheck-web           # build/typecheck do web
make typecheck-mobile        # typecheck do mobile
make verify                  # verificação geral
```

Também é aceitável usar `pnpm --dir <web|server|mobile> ...` quando um comando específico não existir no `Makefile`.

## Padrões gerais

- Preserve TypeScript com `strict: true` nos subprojetos.
- Evite introduzir outro gerenciador de pacotes; não crie `package-lock.json` ou `yarn.lock`.
- Mantenha mudanças focadas e compatíveis com a estrutura existente.
- Antes de declarar uma tarefa como concluída, rode a verificação mais específica possível:
  - backend: `make test-server` ou testes/typecheck específicos;
  - web: `make typecheck-web`;
  - mobile: `make typecheck-mobile`;
  - alterações amplas: `make verify`.
- Não commite arquivos de ambiente reais. Use exemplos como `server/.env-example`.

## Backend (`server/`)

- Stack: Express, TypeScript, Drizzle ORM, PostgreSQL, Vitest e Testcontainers.
- Entrada principal: `server/src/server.ts`; app Express em `server/src/app.ts`.
- Rotas ficam em `server/src/routes.ts` e delegam para controllers em `server/src/controllers/`.
- Acesso a banco e schema ficam em `server/src/database/`.
- Middleware de autenticação fica em `server/src/middlewares/authMiddleware.ts`.
- Utilities compartilhadas ficam em `server/src/utils/`.
- Scripts principais:

```bash
pnpm --dir server run dev
pnpm --dir server run build
pnpm --dir server run migrate
pnpm --dir server run seed
pnpm --dir server run test
```

- Testes de integração usam Docker/Testcontainers; garanta Docker disponível antes de rodá-los.
- Migrations/seed devem manter compatibilidade com PostgreSQL local definido em `server/docker-compose.yml`.

## Web (`web/`)

- Stack: React 18, TypeScript, Vite, React Router, Axios.
- Componentes reutilizáveis ficam em `web/src/components/`, normalmente com `index.tsx` e `styles.css`.
- Rotas ficam em `web/src/routes/`.
- Contextos ficam em `web/src/contexts/`.
- Serviços de API ficam em `web/src/services/`.
- Tipos ficam em `web/src/type/` e `web/src/types/`.
- Variável da API: `VITE_API_URL`, definida por ambiente em arquivos `.env.*`.
- Estilo atual de formatação em `web/.prettierrc.json`:
  - 2 espaços;
  - ponto e vírgula;
  - aspas simples, inclusive JSX;
  - trailing commas.
- ESLint usa React recomendado + Airbnb com ajustes em `web/.eslintrc.json`.

## Mobile (`mobile/`)

- Stack: React Native, Expo, TypeScript, React Navigation e Axios.
- Componentes ficam em `mobile/src/components/`, normalmente com `index.tsx` e `styles.ts`.
- Rotas ficam em `mobile/src/routes/`.
- Contextos ficam em `mobile/src/contexts/`.
- Serviços de API ficam em `mobile/src/services/`.
- Utilitários ficam em `mobile/src/utils/`.
- Preserve compatibilidade com as versões atuais do Expo/React Native declaradas em `mobile/package.json`.

## Ambiente local

- Banco local: PostgreSQL via `server/docker-compose.yml`.
- Configuração de backend local esperada em `server/.env`:

```env
SECRET=proffy-local-secret
PORT=3333
PGHOST=localhost
PGUSER=postgres
PGPASSWORD=docker
PGDATABASE=proffy
PGPORT=5432
```

- Frontend web em desenvolvimento usa:

```env
VITE_API_URL=http://localhost:3333
```

## Cuidados ao alterar

- Ao mexer em contratos da API, atualize consumidores em `web/` e `mobile/` quando necessário.
- Ao alterar schema ou queries, verifique migrations, seed e testes do backend.
- Ao adicionar dependências, use `pnpm --dir <projeto> add ...` no subprojeto correto.
- Ao tocar em autenticação, favoritos, aulas ou horários, rode testes relacionados do backend.
- Não modifique assets gerados ou arquivos de lock sem necessidade.
