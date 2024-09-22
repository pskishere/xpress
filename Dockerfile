# Build stage
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Copy .env file
COPY .env .

# Build the application
RUN npm run build

# Runtime stage
FROM node:20-alpine

WORKDIR /app

# Copy built files from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/.env ./.env

# Install vite globally for serving static files
RUN npm install -g vite

# Set environment variables
ENV VITE_SUPABASE_PROJECT_URL=https://rqqrqgjrxxgbxrkxjcfl.supabase.co
ENV VITE_SUPABASE_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxcXJxZ2pyeHhnYnhya3hqY2ZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY5MjUzNDUsImV4cCI6MjA0MjUwMTM0NX0.8-NZAW3Zk7-BK6A-8QctffJ16rDyFJgJcm1WrS1fBM4

# Expose port 3000 (Vite's new preview port)
EXPOSE 3000

# Define the command to run the app
CMD ["vite", "preview", "--host", "0.0.0.0", "--port", "3000"]
