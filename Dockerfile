# Builder Stage
FROM node:20.15.1-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile

# Copy application code
COPY . .

# Build the application in standalone mode
RUN pnpm run build

# Production Stage
FROM node:20.15.1-alpine AS production

# Set working directory
WORKDIR /app

# Install only production dependencies
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --prod --frozen-lockfile

# Copy built application from builder stage
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Expose the application port
EXPOSE 3000

# Set the default command
CMD ["node", "server.js"]