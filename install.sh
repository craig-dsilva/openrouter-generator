#!/usr/bin/env bash
set -e

echo "Installing server dependencies..."
cd server
python3 -m venv venv 2>/dev/null || true
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
deactivate
cd ..

echo "Installing and building client..."
cd client
npm install
npm run build   
cd ..

echo "All done. Run the start script to start the server."