import React from 'react';
import classNames from 'classnames';

const Note = React.createClass({
  getInitialState() {
    return({points: 0})
  },
  addPoint(e) {
    e.preventDefault();
    this.setState({ points: ++this.state.points });
  },
  render() {

    let color = ('postit-' + this.props.color)
    let classes = classNames('thumbnail', 'post-it', color)

    return(
      <div className={classes}>
        <button className='btn btn-plus-one' onClick={this.addPoint}>+1</button>
        <div className='caption'>
          <p className='points'>{this.state.points}</p>
          <p>{this.props.name}</p>
          <p>{this.props.message}</p>
        </div>
      </div>
    )
  }
});

export default Note;
