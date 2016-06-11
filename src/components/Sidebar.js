import React from 'react';
import { Link } from 'react-router';

const Sidebar = React.createClass({
  render() {
    return(
        <div id="sidebar-wrapper">
          <ul className="sidebar-nav">
            <li className="sidebar-brand"><a href="#"></a></li>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/boards/1'>RetroBoard</Link></li>
            <li><a target='_blank' href="https://github.com/alanbsmith/react-retro-sockets">View the Repo</a></li>
          </ul>
        </div>
    )
  }
});

export default Sidebar;
