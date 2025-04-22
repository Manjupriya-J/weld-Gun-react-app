const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';
const net = require('net'); // Required to check if React server is live

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      contextIsolation: true, // Recommended for security
      nodeIntegration: false, // Avoid direct Node.js access in renderer
    },
  });

  if (isDev) {
    const reactDevServerUrl = 'http://localhost:3000';
    const serverReady = waitForReactServer(3000);

    serverReady
      .then(() => {
        mainWindow.loadURL(reactDevServerUrl);
        mainWindow.webContents.openDevTools(); // Optional: Open DevTools for debugging
      })
      .catch((err) => {
        console.error('React dev server is not running:', err);
        mainWindow.loadFile(path.join(__dirname, 'fallback.html')); // Optional fallback page
      });
  } else {
    // Load production build
    mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'));
  }
}

// Helper function to wait for React dev server
function waitForReactServer(port, host = 'localhost') {
  return new Promise((resolve, reject) => {
    const retryInterval = 100; // Retry every 100ms
    const timeout = 5000; // Timeout after 5 seconds
    const start = Date.now();

    const checkServer = () => {
      const socket = new net.Socket();
      socket.setTimeout(retryInterval);
      socket.once('connect', () => {
        socket.destroy();
        resolve(true);
      });
      socket.once('error', () => {
        if (Date.now() - start > timeout) {
          reject(new Error('Dev server timed out'));
        } else {
          setTimeout(checkServer, retryInterval);
        }
      });
      socket.connect(port, host);
    };

    checkServer();
  });
}

// Electron app lifecycle
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
