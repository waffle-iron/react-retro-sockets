import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addColumn } from '../actions/index';

import Columns from '../components/Columns.jsx';

const NewBoard = React.createClass({
  displayName: 'NewBoard',

  getInitialState() {
    return { columns: [] };
  },

  componentDidMount() {
    socket.on('connect', function(data) {
      socket.emit('join', 'hello world from the client!');
    });
    socket.on('new-column', this._addColumn);
    socket.on('new-title', this._setTitle);
    socket.on('new-postit', this._addPostIt);
  },

  _addColumn(data) {
    data.key = this.state.columns.length;
    this.state.columns.push(data);
    this.setState({columns: this.state.columns});
  },

  _setTitle(data) {
    let column = this.state.columns[data.columnId];
    column.title = data.title;
    column.titleSet = true;
    this.setState({columns: this.state.columns});
  },

  _addPostIt(data) {
    let column = this.state.columns[data.columnId];
    column.postIts.push(data);
    this.setState({columns: this.state.columns});
  },

  handleClick(event) {
    event.preventDefault();
    socket.emit('column', {key: '', title: '', postIts: [], titleSet: false });
  },

  render() {
    return(
      <div>
        <button className='btn btn-add-col' onClick={this.handleClick}>Create Column</button>
        <Columns columns={this.state.columns} addColumn={this.handleClick} />
      </div>
    )
  }
});

function mapStateToProps(state) {
  return { columns: state.columns.columns };
}

export default connect(mapStateToProps)(NewBoard);
