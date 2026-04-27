@echo off
echo 🚀 Initializing LinguaCore Setup from CMD...

:: Configuración del Backend
echo --- Backend Setup ---
cd backend
echo Installing backend dependencies...
call npm install
echo Generating Prisma Client...
call npx prisma generate
echo Setting up database...
call npx prisma db push
echo Seeding database...
call npx ts-node src/shared/seed.ts

:: Configuración del Frontend
echo.
echo --- Frontend Setup ---
cd ../frontend
echo Installing frontend dependencies...
call npm install

cd ..
echo.
echo ✅ Setup complete! You can now run the app using 'run.bat'.
pause
