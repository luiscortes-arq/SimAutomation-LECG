const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const http = require('http');

let mainWindow;
let backendProcess;
const BACKEND_PORT = 5000;
const BACKEND_URL = `http://127.0.0.1:${BACKEND_PORT}`;

// Function to check if backend is ready
function checkBackendHealth() {
  return new Promise((resolve) => {
    http.get(`${BACKEND_URL}/api/health`, (res) => {
      if (res.statusCode === 200) {
        resolve(true);
      } else {
        resolve(false);
      }
    }).on('error', () => {
      resolve(false);
    });
  });
}

// Wait for backend to be ready
async function waitForBackend(maxAttempts = 30) {
  console.log('[Electron] Waiting for backend to be ready...');
  for (let i = 0; i < maxAttempts; i++) {
    const isReady = await checkBackendHealth();
    if (isReady) {
      console.log('[Electron] Backend is ready!');
      return true;
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  console.error('[Electron] Backend failed to start in time');
  return false;
}

// Start the backend process
function startBackend() {
  const isDev = !app.isPackaged;
  
  let backendPath;
  if (isDev) {
    // In development, run Python script directly
    backendPath = 'python';
    const scriptPath = path.join(__dirname, 'backend-launcher.py');
    backendProcess = spawn(backendPath, [scriptPath], {
      env: { ...process.env, PORT: BACKEND_PORT.toString() }
    });
  } else {
    // In production, run the PyInstaller executable
    // Use __dirname to locate the backend folder inside resources/app/
    backendPath = path.join(__dirname, 'backend', 'simautomation-backend.exe');
    backendProcess = spawn(backendPath, [], {
      env: { ...process.env, PORT: BACKEND_PORT.toString() }
    });
  }

  backendProcess.stdout.on('data', (data) => {
    console.log(`[Backend] ${data.toString()}`);
  });

  backendProcess.stderr.on('data', (data) => {
    console.error(`[Backend Error] ${data.toString()}`);
  });

  backendProcess.on('close', (code) => {
    console.log(`[Backend] Process exited with code ${code}`);
  });

  console.log('[Electron] Backend process started');
}

// Create the main window
async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    },
    icon: path.join(__dirname, 'resources', 'icon.ico'),
    autoHideMenuBar: false
  });

  // Create custom menu
  const template = [
    {
      label: 'Archivo',
      submenu: [
        { role: 'quit', label: 'Salir' }
      ]
    },
    {
      label: 'Ver',
      submenu: [
        { role: 'reload', label: 'Recargar' },
        { role: 'toggleDevTools', label: 'Herramientas de Desarrollador' },
        { type: 'separator' },
        { role: 'resetZoom', label: 'Zoom Normal' },
        { role: 'zoomIn', label: 'Acercar' },
        { role: 'zoomOut', label: 'Alejar' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Pantalla Completa' }
      ]
    },
    {
      label: 'Ayuda',
      submenu: [
        {
          label: 'Acerca de',
          click: async () => {
            const { dialog } = require('electron');
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'SimAutomation',
              message: 'SimAutomation v1.0.0',
              detail: 'Desarrollado por LECG\nHerramienta de automatización de archivos .udatasmith'
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // Start backend
  startBackend();

  // Wait for backend to be ready
  const backendReady = await waitForBackend();
  
  if (!backendReady) {
    const { dialog } = require('electron');
    dialog.showErrorBox(
      'Error de Inicio',
      'El backend no pudo iniciarse. Por favor, verifica los logs e intenta de nuevo.'
    );
    app.quit();
    return;
  }

  // Load the frontend
  const indexPath = path.join(__dirname, 'build/renderer', 'index.html');
  mainWindow.loadFile(indexPath);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// App lifecycle events
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  // Kill backend process
  if (backendProcess) {
    backendProcess.kill();
  }
  
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('before-quit', () => {
  // Ensure backend is terminated
  if (backendProcess) {
    backendProcess.kill();
  }
});
