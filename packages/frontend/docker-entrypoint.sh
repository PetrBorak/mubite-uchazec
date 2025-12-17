#!/bin/sh
set -e

echo "Checking frontend dependencies..."

if [ ! -d "node_modules" ] || [ -z "$(ls -A node_modules)" ]; then
  echo "Installing frontend dependencies..."
  npm install
else
  echo "Dependencies already installed"
fi

exec "$@"
