# Base image with Bun
FROM oven/bun:1 as base
WORKDIR /usr/src/app

# Stage to install dependencies
FROM base AS install
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Stage to build the application
FROM base AS build
COPY --from=install /usr/src/app/node_modules ./node_modules
COPY . .
RUN bun run build

# Production stage
FROM base AS production
ENV NODE_ENV=production
WORKDIR /usr/src/app

# Copy built application and production dependencies
COPY --from=install /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/build ./build
COPY package.json ./

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["bun", "run", "start"]
