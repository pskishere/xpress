
# Welcome to your Xpress News Application

## Project info

**URL**: https://run.gptengineer.app/projects/dd3d358d-32d0-4284-9a4d-f99f0201e06d/improve

## How can I edit this code?

There are several ways of editing your application.

**Use GPT Engineer**

Simply visit the GPT Engineer project at [GPT Engineer](https://gptengineer.app/projects/dd3d358d-32d0-4284-9a4d-f99f0201e06d/improve) and start prompting.

Changes made via gptengineer.app will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in the GPT Engineer UI.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Docker Deployment Guide

This project includes Docker configuration for easy deployment. There are two main services:

1. **Main Application (`app`)** - Serves the Xpress news web application
2. **News Sync Service (`news-sync`)** - Periodically fetches and syncs news data from external API

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your system

### Quick Start with Docker

```sh
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Start all services with Docker Compose
docker-compose up -d

# The application will be available at http://localhost:3000
```

### Docker Compose Commands

```sh
# Start all services in detached mode
docker-compose up -d

# View logs of all services
docker-compose logs

# View logs of a specific service
docker-compose logs app
docker-compose logs news-sync

# Stop all services but keep containers
docker-compose stop

# Stop and remove containers
docker-compose down

# Rebuild containers (after code changes)
docker-compose build
docker-compose up -d
```

### Docker Configuration Details

#### Main Application (app)
- Built from `Dockerfile`
- Runs the React web application
- Exposed on port 3000
- Configured to mount source files as volume for development

#### News Sync Service (news-sync)
- Built from `Dockerfile.news-sync`
- Fetches news data every 12 hours (43200 seconds)
- Runs in the background
- Shares source code with the main application

### Environment Configuration

The project uses the following environment variables stored in the `.env` file:

- `VITE_SUPABASE_PROJECT_URL`: URL of your Supabase project
- `VITE_SUPABASE_API_KEY`: API key for accessing Supabase

These variables are automatically loaded into the Docker containers.

## What technologies are used for this project?

This project is built with:

- Vite
- React
- shadcn-ui
- Tailwind CSS
- Supabase (for backend and database)
- Docker (for containerization and deployment)

## How can I deploy this project?

All GPT Engineer projects can be deployed directly via the GPT Engineer app.

Simply visit your project at [GPT Engineer](https://gptengineer.app/projects/dd3d358d-32d0-4284-9a4d-f99f0201e06d/improve) and click on Share -> Publish.

### Alternative Deployment with Docker

You can also deploy this project using Docker on any server that supports Docker containers:

1. Clone the repository on your server
2. Configure your `.env` file with the appropriate Supabase credentials
3. Run `docker-compose up -d` to start the application
4. Access the application at `http://your-server-ip:3000`

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.gptengineer.app/tips-tricks/custom-domain/)

