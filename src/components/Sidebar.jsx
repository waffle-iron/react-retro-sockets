import React from 'react';
import { Link } from 'react-router';

const Sidebar = (props) => {
  return(
      <div id="sidebar-wrapper">
        <ul className="sidebar-nav">

          <li className="sidebar-brand"><a href="#"></a></li>
          <li><a><Link to='/create'>Create a New Board</Link></a></li>
          <li><a target='_blank' href="https://github.com/alanbsmith/react-retro-sockets">View the Repo</a></li>
          <li><a target='_blank' href="https://twitter.com/_alanbsmith">On Twitter</a></li>
        </ul>
      </div>
  )
};

export default Sidebar;
