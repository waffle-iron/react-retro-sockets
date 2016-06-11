import React from 'react';
import { Link } from 'react-router';

const Home = React.createClass({
  handleClick(e) {
    // this will eventually make an ajax call to create a new board.
    // $.ajax({
    //   type: 'post',
    //   dataType: 'json',
    //   url: 'http://retrosockets-api.herokuapp.com/api/v1/boards.json',
    //
    // });
  },

  render() {
    return(
      <div className='jumbotron'>
        <h1>Retrosockets</h1>
        <p className='text-muted'>You've got feels. We've got websockets.</p>
        <Link to="boards/1" onClick={ this.handleClick } className="btn btn-get-started">Get Started</Link>
      </div>
    )
  }
});

export default Home;
