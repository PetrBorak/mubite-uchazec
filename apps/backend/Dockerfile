FROM node:20-slim AS builder

WORKDIR /app

COPY package.json package-lock.json ./

COPY . .

RUN npm install --workspace apps/backend

RUN npm run build -w apps/backend


FROM node:20-slim AS runner
WORKDIR /app

COPY --from=builder /app/apps/backend/dist ./dist

COPY apps/backend/package.json ./

EXPOSE 3001

CMD ["node", "dist/server.js"]