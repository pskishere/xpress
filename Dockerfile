
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
ENV VITE_SUPABASE_PROJECT_URL=https://tcdkdumffturcpdmnneg.supabase.co
ENV VITE_SUPABASE_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjZGtkdW1mZnR1cmNwZG1ubmVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5NjgyOTEsImV4cCI6MjA1ODU0NDI5MX0.880R72p3bkdbxh47DjRaXT6xIiEylDMMaaX7vGJzV3Y

# Expose port 3000 (Vite's new preview port)
EXPOSE 3000

# Define the command to run the app
CMD ["vite", "preview", "--host", "0.0.0.0", "--port", "3000"]
