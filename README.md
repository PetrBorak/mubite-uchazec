# MUBITE TESTING CHALLENGE

- fork the repo
- once finished share the link to your solution
- use the following endpoint https://jsonplaceholder.typicode.com/albums
- create next js app calling the afformenitoned endpoint
- the app should show a list of albums
- UX is up to you
- use Tailwind for styling
- create the app as monorepo distinguishing between frontend and API backend
- create bridge between server components and separate backend endpoint calling the target REST API, even when in this simple solution it is not nescessary
- for the backend, use Express framework
- dockerize the app with Docker and Docker Compose
- create Docker services for production and local development
- use Next.js App Router

### Frontend

- Next.js 16
- TailwindCSS 4
- React Query
- React Window
- TypeScript 5

### Backend

- Express.js
- Zod
- Branded types

### Monorepo

- npm workspace
- Shared package - sdílené DTOs
- ESLint boundaries

### Ostatní

- Docker
- Vitest - unit
- Husky - git hooks
- Prettier a ESLint

## Features

- Nekonečný scroll s virtualizací
- Responzivní grid
- API verzování
- PWA
- Strict TypeScrip
- Error handling a validace
- Automatické testy

## Start

### Docker

#### Development:

```bash
docker-compose up
```

- Frontend: http://localhost:3000
- Backend: http://localhost:4000

#### Produkce:

```bash
docker-compose -f docker-compose.prod.yml up --build
```

### Lokální development

```bash
# Instalace závislostí
npm install

# Development režim
npm run dev

# Build
npm run build

# Testy
npm test

# Linting
npm run lint
```

## API

- `GET /health` - Health check (pro docker)
- `GET /api/v1/albums?page=<num>&limit=<num>` - Alba seznam
- `GET /api/v1/albums/:id` - Detail alba
- `GET /api/albums` - Redirect na verzi

## Environment Variables

### Backend

```env
NODE_ENV=development
PORT=4000
```

### Frontend

```env
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:4000
```
