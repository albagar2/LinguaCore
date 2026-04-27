@echo off
echo 🚀 Starting LinguaCore from CMD...

:: Iniciar Backend en una nueva ventana de PowerShell
start powershell -NoExit -Command "cd backend; npm run dev"

:: Iniciar Frontend en una nueva ventana de PowerShell
start powershell -NoExit -Command "cd frontend; npm run dev"

echo ✨ Services are starting in separate windows...
