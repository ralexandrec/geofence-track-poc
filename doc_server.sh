#!/bin/bash

# Tracking App Documentation Server
# This script starts a local HTTP server for the interactive documentation portal

echo "🚀 Starting Tracking App Documentation Server..."
echo "📖 Documentation will be available at: http://localhost:8000/docs/index.html"
echo ""
echo "Press CTRL+C to stop the server"
echo ""

cd "$(dirname "$0")"
python3 -m http.server 8000
