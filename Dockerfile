# Use an official Node runtime as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Set environment variables
ENV VITE_SUPABASE_PROJECT_URL=https://rqqrqgjrxxgbxrkxjcfl.supabase.co
ENV VITE_SUPABASE_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxcXJxZ2pyeHhnYnhya3hqY2ZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY5MjUzNDUsImV4cCI6MjA0MjUwMTM0NX0.8-NZAW3Zk7-BK6A-8QctffJ16rDyFJgJcm1WrS1fBM4

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]