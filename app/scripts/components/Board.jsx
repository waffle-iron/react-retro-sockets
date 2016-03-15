import React from 'react'

const Board = React.createClass({
  getInitialState() {
    return({showModal: false})
  },

  handleModalClick() {
    this.setState({showModal: !this.state.showModal})
  },

  render() {
    let postIts = this.props.postIts.map(function(postIt, index) {
      return (
        <PostIt
          key={index}
          name={postIt.name}
          message={postIt.message}
          color={postIt.color}
        />
      )
    });

    return (
      <div>
        <div className="col-sm-4">
          <Title
            display={this.props.titleSet}
            title={this.props.title}
            hideModal={this.handleModalClick}
            boardId={this.props.boardId}
          />
          {postIts}
        </div>
        <ModalNote
          show={this.state.showModal}
          hide={this.handleModalClick}
          boardId={this.props.boardId}
        />
      </div>
    )
  }
});

export default Board
