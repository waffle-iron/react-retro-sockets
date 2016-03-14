import '../styles/base.css';
import React from 'react';
import { Modal } from 'react-bootstrap';
import classNames from 'classnames';
// Components
import Board from './components/Board'
import Boards from './components/Boards'
import ModalNote from './components/ModalNote'
import PostIt from './components/PostIt'
import Sidebar from './components/Sidebar'
import Title from './components/Title'

let socket = io.connect();

let App = React.createClass({
  getInitialState() {
    return({boards: []})
  },

  componentDidMount() {
    socket.on('connect', function(data) {
      socket.emit('join', 'hello world from the client!');
    });
    socket.on('new-board', this._addBoard);
    socket.on('new-title', this._setTitle)
    socket.on('new-postit', this._addPostIt)
  },

  _addBoard(data) {
    data.key = this.state.boards.length;
    this.state.boards.push(data);
    this.setState({boards: this.state.boards});
  },

  _setTitle(data) {
    let board = this.state.boards[data.boardId]
    board.title = data.title;
    board.titleSet = true;
    this.setState({boards: this.state.boards})
  },

  _addPostIt(data) {
    let board = this.state.boards[data.boardId]
    board.postIts.push(data);
    this.setState({boards: this.state.boards})
  },

  handleClick(event) {
    event.preventDefault();
    socket.emit('board', {key: '', title: '', postIts: [], titleSet: false });
  },

  render() {
    return(
      <div id='wrapper' className='toggled'>
        <Sidebar/>
        <div id='page-content-wrapper'>
          <div className='container-fluid'>
          <a href="#menu-toggle" className="btn btn-menu glyphicon glyphicon-menu-hamburger" id="menu-toggle"></a>
          <div className='jumbotron'>
          <h1>Retrosockets</h1>
          <p className='text-muted'>You've got feels. We've got websockets.</p>

          </div>
          <button className='btn btn-add-col' onClick={this.handleClick}>Create Column</button>
          <Boards boards={this.state.boards}/>
          </div>

        </div>
      </div>
    )
  }
});

React.render((<App/>), document.getElementById('content'));
