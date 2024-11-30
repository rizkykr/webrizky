# The builder stage
# This stage is responsible for:
# 1. Installing the necessary dependencies
# 2. Building the NuxtJS application
# 3. Bundling the necessary external packages into a standalone build
FROM node:18-alpine as builder
# Use Docker Buildkit for faster build times (https://docs.docker.com/build/buildkit/)
ENV DOCKER_BUILDKIT=1

# Create a place in the container to process the NuxtJS application in
WORKDIR /app
# Copy all the files (excluding those defined in the .dockerignore file)
COPY . .

ENV API_TOKEN=63f2dadbe33ee7
ENV API_BASE_URL=https://ipinfo.io/json

# Build the NuxtJS application, including devDependencies and create a production build
RUN npm ci && \
npx nuxt build

EXPOSE 3020

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3020

CMD [ "npm", "preview" ]
