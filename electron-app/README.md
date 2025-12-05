# SimAutomation - README

## Desktop Application

Esta es la versión de escritorio de SimAutomation, empaquetada con Electron + PyInstaller.

### Estructura

```
electron-app/
├── backend-launcher.py      # Script Python que inicia Flask
├── backend.spec             # Configuración PyInstaller
├── electron.js              # Proceso principal de Electron
├── preload.js              # Script de seguridad
├── package.json            # Dependencias de Electron
├── build-all.ps1           # Script de construcción
├── dist/                   # Frontend compilado (generado)
├── backend/                # Backend ejecutable (generado)
└── build/                  # Archivo ZIP final (generado)
```

### Requisitos para Desarrollo

1. **Python 3.9+** con pip
2. **Node.js 18+** con npm
3. **PowerShell** (Windows)

### Instalación de Dependencias

```powershell
# Instalar dependencias Python (desde raíz del proyecto)
pip install -r requirements.txt

# Instalar dependencias Node.js del frontend
cd frontend\app
npm install
cd ..\..

# Instalar dependencias de Electron
cd electron-app
npm install
cd ..
```

### Desarrollo

Para ejecutar en modo desarrollo:

```powershell
# Terminal 1: Backend (desde raíz)
cd electron-app
python backend-launcher.py

# Terminal 2: Frontend (desde raíz)
cd frontend\app
npm run dev

# Terminal 3: Electron (desde electron-app)
cd electron-app
npm start
```

### Construcción (Portable)

Para construir la aplicación completa:

```powershell
cd electron-app
.\build-all.ps1
```

Este script:

1. Compila el frontend React con Vite
2. Empaqueta el backend Python con PyInstaller
3. Empaqueta la aplicación Electron con `electron-packager`
4. Genera un archivo ZIP en `build/SimAutomation-Portable.zip`

### Distribución

El archivo generado es **Portable** (no requiere instalación):

- **SimAutomation-Portable.zip** (~200 MB)

Instrucciones para usuarios:

1. Descomprimir el ZIP
2. Abrir la carpeta `SimAutomation-win32-x64`
3. Ejecutar `SimAutomation.exe`

### Notas

- La aplicación funciona completamente **offline** (sin conexión a Vercel)
- Los archivos temporales se almacenan en `%APPDATA%\SimAutomation\temp`
- El backend se ejecuta en `http://localhost:5000`
