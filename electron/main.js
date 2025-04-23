const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require('electron-squirrel-startup')) {
  app.quit();
}

// Prevent service crashes by disabling background processing
app.enableSandbox = false;
app.allowRendererProcessReuse = false;

// Essential fixes for Raspberry Pi
app.disableHardwareAcceleration();
app.commandLine.appendSwitch('disable-gpu');
app.commandLine.appendSwitch('no-sandbox');
app.commandLine.appendSwitch('disable-dev-shm-usage');
app.commandLine.appendSwitch('use-gl', 'swiftshader');
app.commandLine.appendSwitch('disable-http-cache');
app.commandLine.appendSwitch('disable-http2');
app.commandLine.appendSwitch('disable-background-networking');
app.commandLine.appendSwitch('disable-renderer-backgrounding');
app.commandLine.appendSwitch('in-process-gpu');

// Disable GBM which is causing errors on Raspberry Pi
process.env.ELECTRON_USE_GBM = '0';

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
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      disableHardwareAcceleration: true,
      backgroundThrottling: false,
      spellcheck: false,
      enableWebSQL: false,
      webgl: false,
      offscreen: false,
    },
    resizable: false,
    fullscreen: process.platform === 'linux',
    kiosk: process.platform === 'linux',
    backgroundColor: '#ffffff',
    autoHideMenuBar: true,
    show: false, // Only show window when ready to reduce flashing
    paintWhenInitiallyHidden: true,
  });
  
  // Show window when ready to render
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  if (isDev) {
    mainWindow.loadURL(process.env.DEV_SERVER_URL || 'http://localhost:5173');
    if (process.env.DEVTOOLS !== "0") {
      mainWindow.webContents.openDevTools();
    }
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
};

// IPC handlers to execute scripts securely
ipcMain.handle('execute-script', async (event, scriptName, ...args) => {
  const base_path = "dependency_scripts/"
  const allowedScripts = [
    `${base_path}check_tray_status.sh`,
    `${base_path}relay_on.sh`, 
    `${base_path}relay_off.sh`,
    `${base_path}wifi_scan.sh`,
    `${base_path}wifi_status.sh`,
    `${base_path}wifi_connect.sh`
  ];
  if (!allowedScripts.includes(scriptName)) {
    throw new Error('Unauthorized script execution attempt');
  }

  // Navigate up from the electron directory to the project root
  const projectRoot = path.resolve(__dirname, '..');
  const scriptPath = path.join(projectRoot, scriptName);
  
  // Only log execution for scripts other than check_tray_status.sh
  if (!scriptName.includes('check_tray_status.sh')) {
    console.log(`Executing script: ${scriptPath}`);
  }
  
  return new Promise((resolve, reject) => {
    // Handle scripts with arguments
    let command = `bash ${scriptPath}`;
    if (args && args.length > 0) {
      // Add proper escaping for arguments
      const escapedArgs = args.map(arg => {
        if (typeof arg === 'string') {
          return `"${arg.replace(/"/g, '\\"')}"`;
        }
        return arg;
      }).join(' ');
      command = `${command} ${escapedArgs}`;
    }

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing ${scriptName}:`, stderr);
        reject(stderr);
      } else {
        // Only log output for scripts other than check_tray_status.sh
        if (!scriptName.includes('check_tray_status.sh')) {
          console.log(`Output from ${scriptName}:`, stdout);
        }
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

// Handle renderer process crashes more gracefully
app.on('render-process-gone', (event, webContents, details) => {
  console.log(`Renderer process gone: ${details.reason}`);
  app.relaunch();
  app.quit();
});

// Handle GPU process crashes
app.on('gpu-process-crashed', (event, killed) => {
  console.log(`GPU process crashed, killed: ${killed}`);
  app.relaunch();
  app.quit();
});

// Handle child process crashes
app.on('child-process-gone', (event, details) => {
  console.log(`Child process gone: ${details.type}, ${details.reason}`);
  if (details.type === 'GPU' || details.type === 'Utility') {
    app.relaunch();
    app.quit();
  }
});