echo "🚀 Initializing LinguaCore Setup..."

# Backend Setup
cd backend
echo "Installing backend dependencies..."
npm install
echo "Generating Prisma Client..."
npx prisma generate
echo "Setting up database..."
npx prisma db push
echo "Seeding database..."
npx ts-node src/shared/seed.ts

# Frontend Setup
cd ../frontend
echo "Installing frontend dependencies..."
npm install

echo "✅ Setup complete! You can now run the app using 'npm run dev' in both directories."
