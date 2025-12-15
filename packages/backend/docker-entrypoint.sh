#!/bin/sh
set -e

echo "Checking shared package..."

if [ -d "../shared" ]; then
  if [ ! -d "../shared/dist" ] || [ ! -f "../shared/dist/index.js" ]; then
    echo "Building shared package..."
    cd ../shared
    npm install
    npm run build
    cd -
  else
    echo "Shared package already built"
  fi

  if [ ! -d "node_modules/@mubit-app/shared" ] || [ ! -f "node_modules/@mubit-app/shared/dist/index.js" ]; then
    echo "Installing backend dependencies..."
    npm install
  else
    echo "Dependencies already installed"
  fi
fi

exec "$@"
