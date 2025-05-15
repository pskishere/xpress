
# Build stage
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies using yarn
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Copy .env file
COPY .env .

# Build the application
RUN yarn build

# Runtime stage
FROM node:20-alpine

WORKDIR /app

# Copy built files from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/yarn.lock ./yarn.lock
COPY --from=build /app/.env ./.env

# Install yarn and vite globally
RUN npm install -g yarn vite

# Set environment variables from .env file instead of hardcoding
ENV VITE_SUPABASE_PROJECT_URL=https://supabase.maicai.site
ENV VITE_SUPABASE_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE

# Expose port 3000 (Vite's preview port)
EXPOSE 3000

# Define the command to run the app
CMD ["vite", "preview", "--host", "0.0.0.0", "--port", "3000"]
