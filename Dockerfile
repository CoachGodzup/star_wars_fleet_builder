# docker/dev.Dockerfile
FROM oven/bun:latest

WORKDIR /app/next-app

COPY package.json ./
COPY bun.lock ./

RUN bun install

COPY . .

# disable Next.js telemetry at run time
ENV NEXT_TELEMETRY_DISABLED 1

# Build version
# RUN bun next build
# CMD bun next start

# Dev version - uncomment this
CMD bun run dev

# Note: Ports are opened via Docker Compose