# =========================
# Stage 1: Ubuntu builder
# =========================
FROM ubuntu:24.04 AS builder

WORKDIR /app

# Install required tools
RUN apt-get update && \
    apt-get install -y curl ca-certificates && \
    curl -fsSL https://deb.nodesource.com/setup_24.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source
COPY . .

# =========================
# Stage 2: Distroless
# =========================
FROM gcr.io/distroless/nodejs24-debian13

WORKDIR /app

# Copy application from Ubuntu builder
COPY --from=builder /app /app

# Distroless Node.js image already has node as entrypoint
CMD ["server.js"]
