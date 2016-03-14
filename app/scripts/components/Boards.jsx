import React from 'react'

const Boards = (props) => {
  render() {
    var boards = props.boards.map(function(board, index) {
      return (
        <Board
          key={index}
          boardId={board.key}
          title={board.title}
          postIts={board.postIts}
          titleSet={board.titleSet}
        />
      );
    });
    return (
      <div>{boards}</div>
    );
  }
});

export default Boards
