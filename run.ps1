echo "🚀 Starting LinguaCore..."

# Start Backend in new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run dev"

# Start Frontend in new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

echo "✨ Services are starting in separate windows..."
