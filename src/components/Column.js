import React from 'react';

// components
import Note from './Note';
import Title from './Title';
import ModalNote from './ModalNote';

const Column = React.createClass({
  displayName: "Column",

  getInitialState() {
    return({showModal: false });
  },

  handleModalClick() {
    this.setState({showModal: !this.state.showModal})
  },
  render() {
    let notes = this.props.notes.map((note, index) => {
      return(
        <Note key={index} name={note.name} message={note.message} color={note.color} />
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

          {notes}

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

export default Column;
