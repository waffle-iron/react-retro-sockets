import '../styles/base.css';
import React from 'react';
import { Modal } from 'react-bootstrap';
import classNames from 'classnames';
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

let Sidebar = React.createClass({
  render() {
    return(
        <div id="sidebar-wrapper">
          <ul className="sidebar-nav">
            <li className="sidebar-brand"><a href="#"></a></li>
            <li><a target='_blank' href="https://github.com/alanbsmith/react-retro-sockets">View the Repo</a></li>
            <li><a target='_blank' href="https://twitter.com/_alanbsmith">On Twitter</a></li>
          </ul>
        </div>
    )
  }
});

let Boards = React.createClass({
  render() {
    var boards = this.props.boards.map(function(board, index) {
      return(<Board key={index} boardId={board.key} title={board.title} postIts={board.postIts} titleSet={board.titleSet} />);
    });
    return(<div>{boards}</div>);
  }
});

let Board = React.createClass({
  getInitialState() {
    return({showModal: false})
  },
  handleModalClick() {
    this.setState({showModal: !this.state.showModal})
  },
  render() {
    let postIts = this.props.postIts.map(function(postIt, index){
      return(
        <PostIt key={index} name={postIt.name} message={postIt.message} color={postIt.color} />
      )
    });
    return(
    <div>
      <div className="col-sm-4">
        <Title display={this.props.titleSet} title={this.props.title} hideModal={this.handleModalClick} boardId={this.props.boardId}/>

          {postIts}

      </div>
      <ModalNote show={this.state.showModal} hide={this.handleModalClick} boardId={this.props.boardId} />
    </div>
    )
  }
});

let Title = React.createClass({
  handleSubmit(event) {
    event.preventDefault();
    let title = React.findDOMNode(this.refs.title).value.trim();
    let data = {title: title, boardId: this.props.boardId }
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

let PostIt = React.createClass({
  render() {
    
    let color = ('postit-' + this.props.color)
    let classes = classNames('thumbnail', 'post-it', color)
    
    return(
      <div className={classes}>
        <div className='caption'>
          <p>{this.props.name}</p>
          <p>{this.props.message}</p>
        </div>
      </div>
    )
  }
});

let ModalNote = React.createClass({
  getInitialState() {
    return({color: 'yellow'});
  },
  handleSubmit(event) {
    event.preventDefault();
    let name = React.findDOMNode(this.refs.name).value.trim()
    let message = React.findDOMNode(this.refs.message).value.trim()
    socket.emit('postit', { boardId: this.props.boardId, name: name, message: message, color: this.state.color})
    this.hideModal();
  },
  handleButtonClick(event) {
    let color = event.target.children[0].id
    if(color === ""){
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
              <div className="btn-group-1" data-toggle="buttons" onClick={this.handleButtonClick}>
                <button className="btn btn-yellow"><input type="radio" name="options" id="yellow" autoComplete="off" checked /></button>
                <button className="btn btn-blue"><input type="radio" name="options" id="blue" autoComplete="off"/></button>
                <button className="btn btn-green"><input type="radio" name="options" id="green" autoComplete="off"/></button>
                <button className="btn btn-pink"><input type="radio" name="options" id="pink" autoComplete="off"/></button>
                <button className="btn btn-purple"><input type="radio" name="options" id="purple" autoComplete="off"/></button>
                <button className="btn btn-orange"><input type="radio" name="options" id="orange" autoComplete="off"/></button>
              </div>
              <form id='postit-modal-name'>
                <input className='form-control input-lg' placeholder="What's your name?"ref='name'/>
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

React.render((<App/>), document.getElementById('content'));
