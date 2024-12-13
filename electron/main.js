const { app, BrowserWindow } = require('electron');
const path = require('path');

// In CommonJS, __dirname and __filename are available by default.
// No need to define them manually with import.meta.url.

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require('electron-squirrel-startup')) {
  app.quit();
}

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  try {
    // electron-reloader supports require syntax directly
    require('electron-reloader')(module, {
      debug: true,
      watchRenderer: true
    });
  } catch (err) {
    console.error('Could not load electron-reloader:', err);
  }
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 480,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    resizable: false,
    fullscreen: process.platform === 'linux', // Fullscreen on Raspberry Pi (Linux)
    kiosk: process.platform === 'linux' // Kiosk mode on Raspberry Pi (Linux)
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
