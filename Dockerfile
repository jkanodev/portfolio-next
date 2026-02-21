# Stage 1: builder
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: runner (minimal)
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy standalone build and static assets
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
# Public assets (optional; ensure public/ exists in repo or remove this line)
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
