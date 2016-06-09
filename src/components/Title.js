import React from 'react';

const socket = io.connect();

const Title = React.createClass({
  handleSubmit(event) {
    event.preventDefault();
    let title = this.refs.title.value.trim();
    let data = {title: title, columnId: this.props.columnId }
    socket.emit('title', data);
  },
  handleClick() {
    this.props.hideModal();
  },
  render() {
    if(this.props.display) {
      return(
        <div className='row title-heading'>
          <div className='col-xs-10'>
            <div className='thumbnail'>
              <h3 className='title'>{this.props.title}</h3>
            </div>
          </div>
          <div className='col-xs-2'>
            <a className='col-1-btn btn btn-add-note' data-toggle='modal' onClick={this.handleClick} data-target='#myModal1'>+</a>
          </div>
        </div>
      )
    } else {
      return(
        <form id='col-1' onSubmit={this.handleSubmit} >
          <input className='form-control title-form' placeholder='add column title here' ref='title'/>
        </form>
      )
    }
  }
});

export default Title;
