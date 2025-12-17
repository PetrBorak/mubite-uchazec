# Development stage
FROM node:20-alpine AS development

WORKDIR /app

COPY package.json ./

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

COPY . .

EXPOSE 4000

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["npm", "run", "dev"]

# Builder stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY package.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

EXPOSE 4000

CMD ["npm", "start"]
