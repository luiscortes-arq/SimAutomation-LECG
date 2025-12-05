# SimAutomation Desktop Build Script
# Builds the complete desktop application (Portable)

Write-Host "===================================" -ForegroundColor Cyan
Write-Host "SimAutomation Desktop Build Script" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Build Frontend
Write-Host "[1/5] Building Frontend..." -ForegroundColor Yellow
Push-Location "..\frontend\app"
if (Test-Path "..\..\electron-app\dist") {
    Remove-Item "..\..\electron-app\dist" -Recurse -Force
}
npm run build:electron
if ($LASTEXITCODE -ne 0) {
    Write-Host "Frontend build failed!" -ForegroundColor Red
    Pop-Location
    exit 1
}
Pop-Location
Write-Host "[1/5] Frontend build complete!" -ForegroundColor Green
Write-Host ""

# Step 2: Build Backend Executable
Write-Host "[2/5] Building Backend Executable..." -ForegroundColor Yellow
if (Test-Path "dist-backend") {
    Remove-Item "dist-backend" -Recurse -Force
}
# Clean previous builds but keep node_modules
if (Test-Path "build") {
    Remove-Item "build" -Recurse -Force
}
if (Test-Path "build-portable") {
    Remove-Item "build-portable" -Recurse -Force
}

pyinstaller backend.spec --distpath dist-backend
if ($LASTEXITCODE -ne 0) {
    Write-Host "Backend build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "[2/5] Backend executable created!" -ForegroundColor Green
Write-Host ""

# Step 3: Copy Backend to Electron App
Write-Host "[3/5] Copying Backend to Electron App..." -ForegroundColor Yellow
if (Test-Path "backend") {
    Remove-Item "backend" -Recurse -Force
}
New-Item -ItemType Directory -Path "backend" -Force | Out-Null
Copy-Item "dist-backend\simautomation-backend.exe" "backend\" -Force
Write-Host "[3/5] Backend copied!" -ForegroundColor Green
Write-Host ""

# Step 4: Package Electron App
Write-Host "[4/5] Packaging Portable App..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing Electron dependencies..." -ForegroundColor Cyan
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "npm install failed!" -ForegroundColor Red
        exit 1
    }
}

# Ensure electron-packager is installed
if (-not (Test-Path "node_modules\.bin\electron-packager.cmd")) {
    Write-Host "Installing electron-packager..." -ForegroundColor Cyan
    npm install --save-dev electron-packager
}

npx electron-packager . SimAutomation --platform=win32 --arch=x64 --out=build-portable --icon=resources/icon.ico --overwrite
if ($LASTEXITCODE -ne 0) {
    Write-Host "Electron packaging failed!" -ForegroundColor Red
    exit 1
}
Write-Host "[4/5] App packaged!" -ForegroundColor Green
Write-Host ""

# Step 5: Compress to ZIP
Write-Host "[5/5] Creating ZIP Archive..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path "build" -Force | Out-Null
$source = "$PWD\build-portable\SimAutomation-win32-x64"
$dest = "$PWD\build\SimAutomation-Portable.zip"
Compress-Archive -Path $source -DestinationPath $dest -Force
Write-Host "[5/5] ZIP created!" -ForegroundColor Green
Write-Host ""

# Display results
Write-Host "===================================" -ForegroundColor Cyan
Write-Host "Build Complete!" -ForegroundColor Green
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Portable App ZIP created in:" -ForegroundColor Yellow
Write-Host "  $dest" -ForegroundColor White
Write-Host ""
if (Test-Path $dest) {
    $size = (Get-Item $dest).Length / 1MB
    Write-Host "  Size: $([math]::Round($size, 2)) MB" -ForegroundColor Green
}
Write-Host ""
