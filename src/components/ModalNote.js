import React from 'react';
import classNames from 'classnames';
import { Modal } from 'react-bootstrap';
const socket = io.connect();

const ModalNote = React.createClass({
  getInitialState() {
    return({color: 'yellow'});
  },

  handleSubmit(event) {
    event.preventDefault();
    let name = this.refs.name.value.trim()
    let message = this.refs.message.value.trim()
    socket.emit('postit', { columnId: this.props.columnId, name: name, message: message, color: this.state.color})
    this.hideModal();
  },
  handleClick(event) {
    let color = event.target.children[0].id
    if(!color){
      color = 'yellow'
    }
    this.setState({color: color})
  },
  hideModal() {
    this.props.hide()
  },
  render() {
    let modalColor = ('modal-' + this.state.color)

    let classes = classNames('modal-content', modalColor)

    return(
      <Modal show={this.props.show} onHide={this.hideModal}>
          <div className={classes}>
            <Modal.Header>
              <button id='close-modal-1' type="button" ref='close' className="close" onClick={this.hideModal}><span aria-hidden="true">&times;</span></button>
              <h2 className="modal-title">Share some feels</h2>
            </Modal.Header>
            <Modal.Body onSubmit={this.handleSubmit}>
              <p>choose a color</p>
              <div className="btn-group-1" data-toggle="buttons" onClick={this.handleClick}>
                <button className="btn btn-yellow"><input type="radio" name="options" id="yellow" autoComplete="off" defaultChecked={true} /></button>
                <button className="btn btn-blue"><input type="radio" name="options" id="blue" autoComplete="off"/></button>
                <button className="btn btn-green"><input type="radio" name="options" id="green" autoComplete="off"/></button>
                <button className="btn btn-pink"><input type="radio" name="options" id="pink" autoComplete="off"/></button>
                <button className="btn btn-purple"><input type="radio" name="options" id="purple" autoComplete="off"/></button>
                <button className="btn btn-orange"><input type="radio" name="options" id="orange" autoComplete="off"/></button>
              </div>
              <form id='postit-modal-name'>
                <input className='form-control input-lg' placeholder="What's your name?"ref='name' defalutValue={this.props.name}/>
              </form>
              <form id='postit-modal-message-1'>
                <input className='form-control input-lg' placeholder="write here." ref='message'/>
              </form>
            </Modal.Body>
            <Modal.Footer/>
          </div>
      </Modal>
    )
  }
});

export default ModalNote;
