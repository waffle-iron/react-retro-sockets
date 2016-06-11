import React from 'react';

// components
import Columns from './Columns';

const socket = io.connect();

const Board = React.createClass({

  getInitialState() {
    return({columns: [], userName: ""})
  },

  componentDidMount() {
    socket.on('connect', function(data) {
      socket.emit('join', 'hello world from the client!');
    });
    socket.on('new-column', this._addColumn);
    socket.on('new-title', this._setTitle)
    socket.on('new-note', this._addNote)
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

  _addNote(data) {
    let column = this.state.columns[data.columnId]
    column.notes.push(data);
    this.setState({columns: this.state.columns})
  },

  handleClick(event) {
    event.preventDefault();
    socket.emit('column', {key: '', title: '', notes: [], titleSet: false });
  },

  render() {
    return(
      <div>
        <div className='jumbotron'></div>
        <button className='btn btn-add-col' onClick={this.handleClick}>Create Column</button>
        <Columns columns={ this.state.columns } />
     </div>
   )
 }
});

export default Board;
