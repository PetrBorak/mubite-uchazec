FROM node:20-slim AS builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/frontend/package.json ./apps/frontend/
COPY apps/backend/package.json ./apps/backend/

RUN npm install --verbose

COPY . .
RUN npm run build --workspace apps/frontend

FROM node:20-slim AS runner
WORKDIR /app

COPY --from=builder /app/apps/frontend/.next ./.next
COPY --from=builder /app/apps/frontend/package.json ./package.json
COPY --from=builder /app/apps/frontend/public ./public

EXPOSE 3000

CMD ["npm", "start"]