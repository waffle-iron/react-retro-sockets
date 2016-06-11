import React from 'react';
import Sidebar from '../components/Sidebar';
import classNames from 'classnames';

const App = React.createClass({
  displayName: 'App',

  getInitialState() {
    return({ sidebarOpen: false });
  },

  toggleSidebar() {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  },

  render() {
    return(
      <div id='wrapper' className={this.state.sidebarOpen ? 'toggled' : null }>
        <Sidebar />
        <div id='page-content-wrapper'>
          <div className='container-fluid'>
            <a className="btn btn-menu glyphicon glyphicon-menu-hamburger" onClick={ this.toggleSidebar } id="menu-toggle"></a>
            { this.props.children }
          </div>
        </div>
      </div>
    )
  }
});

export default App;
