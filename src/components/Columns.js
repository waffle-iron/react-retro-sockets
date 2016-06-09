import React from 'react';

import Note from './Note';
import Title from './Title';
import ModalNote from './ModalNote';

const Columns = (props) => {
  let columns = props.columns.map((column, index) => {
    return(
      <Column
        name={props.name}
        key={index}
        columnId={column.key}
        title={column.title}
        postIts={column.postIts}
        titleSet={column.titleSet}
      />
    );
  });
  return(<div>{columns}</div>);
};

const Column = React.createClass({
  displayName: "Column",

  getInitialState() {
    return({showModal: false });
  },

  handleModalClick() {
    this.setState({showModal: !this.state.showModal})
  },
  render() {
    let postIts = this.props.postIts.map(function(postIt, index){
      return(
        <Note key={index} name={postIt.name} message={postIt.message} color={postIt.color} />
      )
    });
    return(
    <div>
      <div className="col-sm-3">
        <Title
          display={this.props.titleSet}
          title={this.props.title}
          hideModal={this.handleModalClick}
          columnId={this.props.columnId}
        />

          {postIts}

      </div>
      <ModalNote
        show={this.state.showModal}
        hide={this.handleModalClick}
        columnId={this.props.columnId}
        name={ this.props.name }
      />
    </div>
    )
  }
});

export default Columns;
