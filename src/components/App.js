import '../assets/stylesheets/base.scss';
import React from 'react';
import { Modal } from 'react-bootstrap';
import classNames from 'classnames';
const socket = io.connect();

import Sidebar from './Sidebar';
import Columns from './Columns';

const App = React.createClass({
  displayName: "App",
  getInitialState() {
    return({columns: [], userName: ""})
  },
  componentDidMount() {
    socket.on('connect', function(data) {
      socket.emit('join', 'hello world from the client!');
    });
    socket.on('new-column', this._addColumn);
    socket.on('new-title', this._setTitle)
    socket.on('new-postit', this._addPostIt)
  },
  _addColumn(data) {
    data.key = this.state.columns.length;
    this.state.columns.push(data);
    this.setState({columns: this.state.columns});
  },
  _setTitle(data) {
    let column = this.state.columns[data.columnId]
    column.title = data.title;
    column.titleSet = true;
    this.setState({columns: this.state.columns})
  },
  _addPostIt(data) {
    let column = this.state.columns[data.columnId]
    column.postIts.push(data);
    this.setState({columns: this.state.columns})
  },
  handleClick(event) {
    event.preventDefault();
    socket.emit('column', {key: '', title: '', postIts: [], titleSet: false });
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
          <Columns columns={ this.state.columns } userName={ this.state.userName } />
          </div>

        </div>
      </div>
    )
  }
});

export default App;
