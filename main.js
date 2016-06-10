// App controls application life, BrowserWindow creates native browser window,
// globalShortcut registers keys as input, ipcMain handles communication from
// window to main process.
const {
  app,
  BrowserWindow,
  globalShortcut,
  ipcMain
} = require('electron');
const gol = require('./app/js/gol.js');
// Global reference of the window object, to stop the window from closing
// automatically when the JavaScript object is garbage collected.
let mainWindow;

// create a window, load the index.html, on close dereference window obj.
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 720,
    height: 752, // 720 + 32
    frame: false,
    resizable: false,
    maximizable: false,
    title: 'VIDEOJAMES'
  });
  mainWindow.loadURL(`file://${__dirname}/app/index.html`);
  mainWindow.on('closed', () => mainWindow = null);

  // registers and unregisters keys on blur and focus so the keys don't get
  // intercepted when the user switches to another window.
  mainWindow.on('focus', registerKeys);
  mainWindow.on('blur', () => {
    globalShortcut.unregisterAll();
  });
}

// called when Electron has finished initialization and is ready to create
// browser windows. some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();
});
// Quit when all windows are closed.
// On OS X applications stay active until the user quits with Cmd + Q
app.on('window-all-closed', () => {
  globalShortcut.unregisterAll();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
// On OS X it's common to re-create a window when the dock icon is clicked
app.on('activate', () => {
  if (mainWindow === null) createWindow();
});

// handle menubar buttons (exit and minimize) in the window
ipcMain.on('exit-request', () => {
  console.log('HALTING');
  globalShortcut.unregisterAll();
  app.quit();
});
ipcMain.on('minimize-request', () => {
  globalShortcut.unregisterAll();
  mainWindow.minimize();
});


// # INPUT
function registerKeys() {
  const usedKeys =
    ['Up', 'Down', 'Left', 'Right', 'CommandOrControl+Q', 'Space'];
  usedKeys.forEach(key => {
    globalShortcut.register(key, () => handleKey(key));
  });
}

function handleKey(key) {
  console.log(`${key} is used`);
  if (key === 'CommandOrControl+Q') {
    globalShortcut.unregisterAll();
    app.quit();
  } else if (key === 'Space') {
    gamestate.level = gol.getNextState(gamestate.level);
    mainWindow.webContents.send('level-updated', gamestate.level );
  }
}


// # GAME LOGIC

const gamestate = {};
gamestate.level = gol.getInitialState();
