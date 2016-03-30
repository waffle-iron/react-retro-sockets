import React from 'react';
import Note from './Note.jsx';
import Title from './Title.jsx';
import ModalNote from './ModalNote.jsx';

const Column = React.createClass({
  getInitialState() {
    return({showModal: false, name: this.setName() });
  },

  setName(data) {
    this.setState({ name: data || '' });
  },

  handleModalClick() {
    this.setState({showModal: !this.state.showModal});
  },

  render() {
    let postIts = this.props.postIts.map((postIt, index) => {
      return (
        <Note
          key={index}
          name={postIt.name}
          message={postIt.message}
          color={postIt.color}
        />
      )
    });

    return (
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
          setName={this.setName}
          name={this.state.name}
        />
      </div>
    )
  }
});

export default Column;
