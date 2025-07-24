# Stage 1: Build the app with Bun
FROM oven/bun:1.1 AS build

WORKDIR /app

# Copy dependency files first for caching Bun install step
COPY bun.lockb package.json ./
RUN bun install

# Copy the rest of the source code
COPY . .

# Build the production-ready app
RUN bun run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy the build output from the build stage
# Replace 'dist' below with the actual Bun build output folder if different
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the container
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
