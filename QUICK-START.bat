@echo off
REM 🎯 JULIAN'S PORTFOLIO QUICK START
REM ADHD-Optimized: Single-click workspace access with error handling

echo.
echo ====================================
echo    🎯 JULIAN'S PORTFOLIO WORKSPACE
echo ====================================
echo    ADHD-Optimized for Maximum Focus
echo ====================================
echo.
echo 🧠 Initializing ADHD-friendly environment...

REM Check if main workspace exists
if not exist "01-MAIN-WORKSPACE\START-HERE.html" (
    echo.
    echo ❌ ERROR: Main workspace not found!
    echo Expected: 01-MAIN-WORKSPACE\START-HERE.html
    echo.
    echo 🔧 TROUBLESHOOTING:
    echo   1. Verify you're in the Portfolio directory
    echo   2. Check if files were moved or renamed
    echo   3. Re-run workspace setup if needed
    echo.
    pause
    exit /b 1
)

REM Validate key files for cognitive safety
echo ⚡ Validating workspace integrity...
if not exist "01-MAIN-WORKSPACE\portfolio-main.html" (
    echo ⚠️  WARNING: Primary work file missing
    echo   File: portfolio-main.html
)
if not exist "01-MAIN-WORKSPACE\portfolio-modular.html" (
    echo ⚠️  WARNING: Modular version missing
    echo   File: portfolio-modular.html
)

echo.
echo 🚀 Opening ADHD-optimized workspace...
echo.

REM Open the START-HERE navigation in default browser
start "" "01-MAIN-WORKSPACE\START-HERE.html"

REM Wait a moment for browser to start
ping 127.0.0.1 -n 3 > nul

echo ✅ Workspace loaded successfully!
echo.
echo 🧠 ADHD WORKFLOW FEATURES ACTIVE:
echo   ⏱️  25-minute session timer with break reminders
echo   🎯 Visual focus indicators and progress tracking
echo   ⌨️  Keyboard shortcuts for instant file access
echo   🔄 Session reset and notification controls
echo.
echo 💡 QUICK START GUIDE:
echo   1️⃣  Press "1" or click orange card → Main work file
echo   2️⃣  Press "2" → Modular development version
echo   🔄 Press "R" → Reset session timer
echo   🔕 Press "F" → Toggle focus reminders
echo   ❌ Press "ESC" → Clear notifications
echo.
echo 🎯 COGNITIVE LOAD OPTIMIZATION:
echo   - Single-file focus to avoid context switching
echo   - Clear visual hierarchy for instant recognition
echo   - Time awareness without clock-watching pressure
echo   - Zero-setup productive work environment
echo.
echo Press any key to close this window and start working...
pause > nul