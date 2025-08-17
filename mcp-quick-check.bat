@echo off
REM MCP Quick Check - ADHD-Optimized automation
REM Single-command MCP health verification

echo 🎯 MCP Quick Health Check
echo ADHD-Optimized: Fast verification system
echo.

cd /d "C:\J.Gomez\Projects-Repository\School\Portfolio"
node mcp-automation.js health

if %errorlevel% equ 0 (
    echo.
    echo ✅ MCP ecosystem ready for productive work
    echo 🧠 All ADHD-optimized features available
) else (
    echo.
    echo ⚠️  MCP ecosystem needs attention
    echo 🔧 Run: node mcp-automation.js install
)

echo.
echo Press any key to continue...
pause > nul