# Use an official Node runtime as the base image
FROM node:20-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code, including .env
COPY . .

# Build the application
RUN npm run build

# Start a new stage for a smaller final image
FROM node:20-alpine

WORKDIR /app

# Copy built assets from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.env ./.env
COPY package.json .

# Install only production dependencies
RUN npm ci --only=production

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "run", "start"]
