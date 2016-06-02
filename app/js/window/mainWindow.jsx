// IpcRenderer facilitates communication between main.js(main node process)
// and mainWindow.js (the window process).
const { ipcRenderer: ipc } = require('electron');

// React and ReactDOM libraries
const React    = require('react');
const ReactDOM = require('react-dom');

// static screens
const screens = {
  startup: [
    ['O','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','O'],
    ['#','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','#'],
    ['#','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','#'],
    ['#','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','#'],
    ['#','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','#'],
    ['#','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','#'],
    ['#','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','#'],
    ['#','·','·','·','·','·','·','·','·','E','l','e','c','t','r','o','n','a','u','t','!','·','·','·','·','·','·','·','·','#'],
    ['#','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','#'],
    ['#','·','·','·','·','·','·','·','·','P','R','E','S','S','·','·','S','P','A','C','E','·','·','·','·','·','·','·','·','#'],
    ['#','·','·','·','·','·','·','·','·','·','·','T','O','·','S','T','A','R','T','·','·','·','·','·','·','·','·','·','·','#'],
    ['#','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','#'],
    ['#','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','#'],
    ['#','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','#'],
    ['#','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','#'],
    ['#','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','#'],
    ['#','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','#'],
    ['#','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','#'],
    ['#','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','#'],
    ['#','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','#'],
    ['#','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','#'],
    ['#','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','#'],
    ['#','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','#'],
    ['#','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','#'],
    ['#','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','#'],
    ['#','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','#'],
    ['#','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','#'],
    ['#','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','#'],
    ['#','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','#'],
    ['O','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','O']
  ]
};

// Reference to the document
const doc = document;

// Select menu bar button and add an event listener.
// on click send a the requested action to the main process
const exitBtn = doc.querySelector('.menu-bar--btn__exit');
exitBtn.addEventListener('click', () => ipc.send('exit-request') );

const minimizeBtn = doc.querySelector('.menu-bar--btn__minimize');
minimizeBtn.addEventListener('click', () => ipc.send('minimize-request') );

let level = [];

// PlayArea component is the part of the window that displays the game.
class PlayArea extends React.Component {
  render() {
    let rows = [];
    for (let i = 0; i < this.props.lvl.length; i++) {
      rows.push(<TileRow {...this.props} key={i+'r'} i={i} />);
    }
    return (
      <section className='play-area'>
        {rows}
      </section>
    );
  }
}

class TileRow extends React.Component {
  render() {
    let tiles = [];

    for (let j = 0; j < this.props.lvl[this.props.i].length; j++) {
      tiles.push(<Tile {...this.props} key={this.props.i+'r'+j} j={j} />);
    }
    return (
      <ol className="tile-row">
        {tiles}
      </ol>
    );
  }
}

class Tile extends React.Component {
  render() {
    let y = this.props.i,
      x = this.props.j;

    let content = this.props.lvl[y][x];
    let tileCssClass = 'tile';

    return (
      <li className={tileCssClass}>{content}</li>
    );
  }
}

ReactDOM.render(
  <PlayArea lvl={screens.startup} />,
  doc.getElementById('container')
);

ipc.on('level-updated', (event, message) => {
  level = message;
  ReactDOM.render(
    <PlayArea lvl={level} />,
    doc.getElementById('container')
  );
});
