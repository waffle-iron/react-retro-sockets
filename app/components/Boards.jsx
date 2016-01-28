import React from 'react';

import PostIt from './PostIt.jsx';
import Title from './Title.jsx';
import ModalNote from './ModalNote.jsx';

const Boards = React.createClass({
  render() {
    var boards = this.props.boards.map(function(board, index) {
      return(<Board key={index} boardId={board.key} title={board.title} postIts={board.postIts} titleSet={board.titleSet} />);
    });
    return(<div>{boards}</div>);
  }
});

const Board = React.createClass({
  getInitialState() {
    return({showModal: false, name: this.setName() });
  },
  setName(data) {
    this.setState({ name: data || '' });
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
      <div className="col-sm-3">
        <Title display={this.props.titleSet} title={this.props.title} hideModal={this.handleModalClick} boardId={this.props.boardId}/>

          {postIts}

      </div>
      <ModalNote show={this.state.showModal} hide={this.handleModalClick} boardId={this.props.boardId} setName={this.setName} name={ this.state.name }/>
    </div>
    )
  }
});

export default Boards;