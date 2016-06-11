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
    let noteClasses = classNames('thumbnail', 'note', this.props.color)

    return(
      <div className={ noteClasses }>
        <div className="points">{this.state.points}</div>
        <div className='note-header'>
          <div className="plus-one" onClick={ this.addPoint }>+1</div>
          <h4>{ this.props.name }</h4>
          <p className="message-text">{ this.props.message }</p>
        </div>
      </div>

      // <div className={ noteClasses }>
      // <p className="points">{ this.state.points }</p>
      //   <div className="message-header">
      //     <h4>{ this.props.name }</h4>
      //     <div className="display-time">+1</div>
      //     <p className="message-text">{ this.props.message }</p>
      //   </div>
      // </div>
      // <div className={classes}>
      //   <button className='btn btn-plus-one' onClick={this.addPoint}>+1</button>
      //   <div className='caption'>
      //     <p className='points'>{this.state.points}</p>
      //     <p>{this.props.name}</p>
      //     <p>{this.props.message}</p>
      //   </div>
      // </div>
    )
  }
});

export default Note;
