#!/usr/bin/env bash
set -e

echo "Starting application..."
cd server
source venv/bin/activate
uvicorn main:app --host 0.0.0.0 --port 8000