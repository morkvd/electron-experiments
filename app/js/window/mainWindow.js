// IpcRenderer facilitates communication between main.js(main node process)
// and mainWindow.js (the window process).
const { ipcRenderer: ipc } = require('electron'); // eslint-disable-line import/no-unresolved

// React and ReactDOM libraries
const React = require('react');
const ReactDOM = require('react-dom');

// static screens

/* eslint-disable max-len, comma-spacing */
const screens = {
  startup: ['O', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', 'O', '#', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '#', '#', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '#', '#', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '#', '#', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '#', '#', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '#', '#', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '#', '#', '·', '·', '·', '·', 'J', 'o', 'h', 'n', ' ', 'H', 'o', 'r', 't', 'o', 'n', ' ', 'C', 'o', 'n', 'w', 'a', 'y', '\'', 's', '·', '·', '·', '·', '#', '#', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '#', '#', '·', '·', '·', '·', '·', '·', '·', '·', 'G', 'A', 'M', 'E', '·', 'O', 'F', '·', 'L', 'I', 'F', 'E', '·', '·', '·', '·', '·', '·', '·', '·', '#', '#', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '#', '#', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '#', '#', '·', '·', '·', '·', '·', '·', '·', '·', 'P', 'r', 'e', 's', 's', '·', '·', 'S', 'P', 'A', 'C', 'E', '·', '·', '·', '·', '·', '·', '·', '·', '#', '#', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', 't', 'o', '·', 's', 't', 'a', 'r', 't', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '#', '#', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '#', '#', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '#', '#', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '#', '#', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '#', '#', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '#', '#', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '#', '#', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '#', '#', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '#', '#', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '#', '#', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '#', '#', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '#', '#', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '#', '#', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '#', '#', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '#', '#', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '·', '#', 'O', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', 'O']
};
/* eslint-enable max-len, comma-spacing */

// Reference to the document
const doc = document;

// Select menu bar button and add an event listener.
// on click send a the requested action to the main process
const exitBtn = doc.querySelector('.menu-bar--btn__exit');
exitBtn.addEventListener('click', () => ipc.send('exit-request'));

const minimizeBtn = doc.querySelector('.menu-bar--btn__minimize');
minimizeBtn.addEventListener('click', () => ipc.send('minimize-request'));

let level = [];

const Tile = (i, content) => React.createElement(
  'div',
  { className: 'tile', key: i },
  content
);

// PlayArea component is the part of the window that displays the game.
const PlayArea = lvl => {
  const tiles = [];
  for (let i = 0; i < lvl.length; i++) {
    tiles.push(Tile(i, lvl[i]));
  }
  return React.createElement(
    'section',
    { className: 'play-area' },
    tiles
  );
};

ReactDOM.render(PlayArea(screens.startup), doc.getElementById('container'));

ipc.on('level-updated', (event, message) => {
  level = message;
  ReactDOM.render(PlayArea(level), doc.getElementById('container'));
});
