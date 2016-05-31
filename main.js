// App controls application life, BrowserWindow creates native browser window,
// globalShortcut registers keys as input, ipcMain handles communication from
// window to main process.
const {
  app,
  BrowserWindow,
  globalShortcut,
  ipcMain
} = require('electron');

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
    mainWindow.webContents.send('level-updated', generateLevel());
  }
}


// # GAME LOGIC

const gamestate = {
  phase: {
    phases: ['initial', 'playing', 'end'],
    i: 0,
    current() {
      return this.phases[this.i];
    },
    next() {
      this.i = (this.i + 1) % this.phases.length;
    }
  },
  level: [],
  playerPos: [0, 0]
};

function getBlankLevel() {
  let lvl = [];
  let size = 30;
  for (let i = 0; i < size; i++) {
    lvl.push([]);
    for (let j = 0; j < size; j++) {
      lvl[i].push( ' ' );
    }
  }
  return lvl;
};

function addRoomToLevel(lvl, [x1, y1], [x2, y2]) {
  if (y1 > y2) [y1, y2] = [y2, y1];
  if (x1 > x2) [x1, x2] = [x2, x1];

  for (let i = y1; i < y2; i++) {
    for (let j = x1; j < x2; j++) {
      lvl[i][j] = '·';
    }
  }
  return lvl;
};

function generateLevel() {
  return addRoomToLevel( getBlankLevel(), getRandomPoint(0,29), getRandomPoint(0,29) );
}

function getRandomPoint(min, max) {
  let a = Math.floor(Math.random() * max) - min;
  let b = Math.floor(Math.random() * max) - min;
  console.log([a,b]);
  return [a,b];
}
