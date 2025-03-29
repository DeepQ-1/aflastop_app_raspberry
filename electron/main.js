const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require('electron-squirrel-startup')) {
  app.quit();
}

// Add command line switches to fix GPU/GBM errors
app.commandLine.appendSwitch('disable-gpu');
app.commandLine.appendSwitch('disable-software-rasterizer');
app.commandLine.appendSwitch('disable-gpu-compositing');

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  try {
    require('electron-reloader')(module, { debug: true, watchRenderer: true });
  } catch (err) {
    console.warn('Hot reloading disabled:', err);
  }
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 480,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Use a preload script
      contextIsolation: true,
      nodeIntegration: false, // Disabled for security
      offscreen: false, // Prevent GBM errors
    },
    resizable: false,
    fullscreen: process.platform === 'linux',
    kiosk: process.platform === 'linux',
  });

  if (isDev) {
    mainWindow.loadURL(process.env.DEV_SERVER_URL || 'http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
};

// IPC handlers to execute scripts securely
ipcMain.handle('execute-script', async (event, scriptName) => {
  const base_path = "dependency_scripts/"
  const allowedScripts = [
    `${base_path}check_tray_status.sh`,
    `${base_path}relay_on.sh`, 
    `${base_path}relay_off.sh`
  ];
  if (!allowedScripts.includes(scriptName)) {
    throw new Error('Unauthorized script execution attempt');
  }

  // Navigate up from the electron directory to the project root
  const projectRoot = path.resolve(__dirname, '..');
  const scriptPath = path.join(projectRoot, scriptName);
  
  console.log(`Executing script: ${scriptPath}`);
  
  return new Promise((resolve, reject) => {
    exec(`bash ${scriptPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing ${scriptName}:`, stderr);
        reject(stderr);
      } else {
        console.log(`Output from ${scriptName}:`, stdout);
        resolve(stdout.trim());
      }
    });
  });
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
