# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY apps/frontend ./apps/frontend
COPY packages ./packages

RUN npm ci
RUN npm run build:frontend

# Runtime stage
FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/apps/frontend/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
