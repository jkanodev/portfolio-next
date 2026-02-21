#!/usr/bin/env bash
set -e
IMAGE_NAME="${IMAGE_NAME:-portfolio}"
CONTAINER_NAME="${CONTAINER_NAME:-portfolio}"
PORT="${PORT:-3000}"

echo "Building image: $IMAGE_NAME"
docker build -t "$IMAGE_NAME:latest" .

echo "Stopping existing container (if any)..."
docker stop "$CONTAINER_NAME" 2>/dev/null || true
docker rm "$CONTAINER_NAME" 2>/dev/null || true

echo "Starting new container..."
docker run -d \
  --restart unless-stopped \
  --name "$CONTAINER_NAME" \
  -p "${PORT}:3000" \
  "$IMAGE_NAME:latest"

echo "Done. Container $CONTAINER_NAME is running on port $PORT."
