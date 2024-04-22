#!/bin/bash

# Set variables for image and container names
IMAGE_NAME="mcogp-test"
CONTAINER_NAME="mcogp-main"
PORT=${1:-3000}

# Build the Docker image from the Dockerfile in the current directory
echo "Building Docker image..."
docker build -t $IMAGE_NAME .

# Check if the container is already running and stop it
if [ $(docker ps -q -f name=$CONTAINER_NAME) ]; then
    echo "Stopping existing container..."
    docker stop $CONTAINER_NAME
fi

# Remove the stopped container if it exists
if [ $(docker ps -a -q -f status=exited -f name=$CONTAINER_NAME) ]; then
    echo "Removing existing container..."
    docker rm $CONTAINER_NAME
fi

# Run the container, mapping the Docker socket to allow Docker commands within the container
echo "Deploying container..."
docker run -d --name $CONTAINER_NAME \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -p $PORT:3000 \
     $IMAGE_NAME

echo "Deployment complete. Container is running. Frontend can be accessed on localhost:" $PORT
