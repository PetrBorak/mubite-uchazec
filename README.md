# 📀 Next.js + Express Monorepo (Technical Assessment)

This project implements the **MUBITE Testing Challenge** using a clean **monorepo architecture** with:

- **Next.js 16 (App Router, Server Components, Turbopack)**
- **Express backend API**
- **Docker & Docker Compose (Dev + Prod)**
- **TypeScript**
- **TailwindCSS**
- **Shared Types Package**
- **Workspace-based monorepo**

The goal is to fetch and display albums from  
https://jsonplaceholder.typicode.com/albums  
via a custom backend API layer, following best practices.

---

# 🚀 Features

### ✔ **Monorepo architecture**
Frontend + backend + shared packages inside a single repo.

### ✔ **Next.js App Router**
Modern structure using server components and streaming.

### ✔ **Backend API wrapper**
Express server acting as a bridge between frontend and external API.

### ✔ **Dockerized (dev & production)**
Full environment isolation.

### ✔ **Shared TypeScript models**
Reusable Album type across frontend & backend.

### ✔ **TailwindCSS**
Fast styling and responsive UI.

---

# 📂 Project Structure

```
mubite-uchazec/
│
├── apps/
│   ├── frontend/           # Next.js app
│   │   ├── app/            # App Router pages & components
│   │   ├── public/
│   │   ├── Dockerfile
│   │   ├── Dockerfile.dev
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── backend/            # Express API service
│       ├── src/
│       │   └── server.ts   # REST API bridge to external service
│       ├── Dockerfile
│       ├── Dockerfile.dev
│       ├── package.json
│       └── tsconfig.json
│
├── packages/
│   └── types/              # Shared TypeScript types
│       └── src/types.ts
│
├── docker-compose.yml       # Dev environment
├── docker-compose.prod.yml  # Production environment
├── package.json             # Monorepo root (workspaces)
├── tsconfig.base.json
└── README.md
```

---

# 🛠 Requirements

- Node.js 20+ (for local runs)
- Docker & Docker Compose
- Git

---

# ▶️ Running the App (Development)

The dev environment uses **hot reload** for both frontend and backend.

### Start dev environment:

```bash
docker-compose up --build
```

### URLs:

| Service   | URL                       |
|-----------|---------------------------|
| Frontend  | http://localhost:3000     |
| Backend   | http://localhost:3001     |
| API Route | http://localhost:3001/albums |

Backend is reachable from frontend via:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

# 🏭 Running the App (Production)

Production builds use optimized images and Next.js `next build` + `next start`.

### Run:

```bash
docker-compose -f docker-compose.prod.yml up --build
```

### URLs:

| Service   | URL                       |
|-----------|---------------------------|
| Frontend  | http://localhost:3000     |
| Backend   | http://backend:3001       | (internal)
| API Route | http://localhost:3001/albums |

---

# 🔧 Environment Variables

### Development

```
NEXT_PUBLIC_API_URL=http://localhost:3001
PORT=3001
```

### Production

```
NEXT_PUBLIC_API_URL=http://backend:3001
PORT=3001
```

These are defined in the docker-compose files.

---

# 🧩 How It Works

### Frontend Flow
1. Server component loads album data from  
   `process.env.NEXT_PUBLIC_API_URL + "/albums"`
2. If success → data is passed to client component
3. If error → error component renders

### Backend Flow
1. Express server exposes `GET /albums`
2. It fetches from:
   `https://jsonplaceholder.typicode.com/albums`
3. Returns the JSON result to frontend

---

# 🧪 Available Commands

### Frontend
```
npm run dev --workspace apps/frontend
npm run build --workspace apps/frontend
npm run start --workspace apps/frontend
```

### Backend
```
npm run dev --workspace apps/backend
npm run build --workspace apps/backend
npm run start --workspace apps/backend
```

### Install dependencies
```
npm install
```

---

# 🧱 API Endpoints

### `GET /albums`
Returns an array of:

```ts
type Album = {
    userId: number;
    id: number;
    title: string;
};
```

---

# 🖼 Screenshots (optional)

*(Add screenshots if required by reviewer)*

```
[ screenshot goes here ]
```

---

# 📬 Contact

If you have any questions or want to reach me directly:

### 📱 Phone
**+380 63 625 6317**

### ✉️ Email
**sabaoth8@gmail.com**

### 💬 Telegram
[@Nikitochka130](https://t.me/Nikitochka130)

### 🔗 LinkedIn
[https://www.linkedin.com/in/nikita-kornienko-29379215b/](https://www.linkedin.com/in/nikita-kornienko-29379215b/)

---

Thank you very much for reviewing this assessment! 🚀
