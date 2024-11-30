# The builder stage
# This stage is responsible for:
# 1. Installing the necessary dependencies
# 2. Building the NuxtJS application
# 3. Bundling the necessary external packages into a standalone build
FROM node:16-alpine as builder
# Use Docker Buildkit for faster build times (https://docs.docker.com/build/buildkit/)
ENV DOCKER_BUILDKIT=1

# Create a place in the container to process the NuxtJS application in
WORKDIR /app
# Copy all the files (excluding those defined in the .dockerignore file)
COPY . .

# Build the NuxtJS application, including devDependencies and create a production build
RUN npm ci && \
npx nuxt build

# Expose port 3000 for the docker containers
EXPOSE 3000

# Set NuxtJS system variables so the application can be reached on your network
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# The NuxtJS start-up command when the container is launched to serve the built application
CMD [ "npx", "nuxt-start" ]
