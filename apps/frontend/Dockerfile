FROM node:20-slim AS builder
WORKDIR /app

COPY apps/frontend/package.json ./
RUN npm install --include=optional

COPY . .
RUN npm run build --workspace apps/frontend



FROM node:20-slim AS runner
WORKDIR /app

COPY --from=builder /app/apps/frontend/.next ./.next
COPY --from=builder /app/apps/frontend/public ./public
COPY apps/frontend/package.json ./

EXPOSE 3000
CMD ["npm", "start", "--workspace", "apps/frontend"]