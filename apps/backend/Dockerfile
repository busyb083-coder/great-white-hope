# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY apps/backend ./apps/backend
COPY packages ./packages

RUN npm ci
RUN npm run build:backend

# Runtime stage
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder /app/apps/backend/package*.json ./apps/backend/

EXPOSE 4000

CMD ["node", "apps/backend/dist/index.js"]
