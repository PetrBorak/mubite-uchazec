# Development stage
FROM node:20-alpine AS development

WORKDIR /app

COPY package.json ./

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

COPY . .

EXPOSE 3000

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

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./packages/frontend/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./packages/frontend/public

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "packages/frontend/server.js"]
