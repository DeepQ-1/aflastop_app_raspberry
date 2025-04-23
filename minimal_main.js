// Minimal main.js with no extras
const { app, BrowserWindow } = require('electron');
const path = require('path');

// Disable everything that might cause issues
app.disableHardwareAcceleration();
app.commandLine.appendSwitch('disable-gpu');
app.commandLine.appendSwitch('no-sandbox');

// Create the most basic window possible
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 480,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      disableHardwareAcceleration: true,
    },
    backgroundColor: '#ffffff',
    show: false,
  });

  // Only show when ready to avoid flashing
  win.once('ready-to-show', () => {
    win.show();
  });

  // Load a static HTML file instead of the complex app
  win.loadFile(path.join(__dirname, '../dist/index.html'));
};

// Basic app lifecycle
app.whenReady().then(() => {
  createWindow();
});

// Quit when all windows are closed
app.on('window-all-closed', () => {
  app.quit();
});

// Auto-restart if something crashes
app.on('render-process-gone', () => {
  app.relaunch();
  app.exit(0);
});

app.on('gpu-process-crashed', () => {
  app.relaunch();
  app.exit(0);
});