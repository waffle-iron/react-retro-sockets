import '../assets/stylesheets/base.scss';
import React, { PropTypes } from 'react';
import { connect, pushState } from 'react-redux';

// Components
import Columns from '../components/Columns.jsx';
import Sidebar from '../components/Sidebar.jsx';

let socket = io.connect();

const App = React.createClass({
  displayName: 'App',

  render() {
    return(
      <div id='wrapper' className='toggled'>
        <Sidebar/>
        <div id='page-content-wrapper'>
          <div className='container-fluid'>
            <a href="#menu-toggle" className="btn btn-menu glyphicon glyphicon-menu-hamburger" id="menu-toggle"></a>
            <div className='jumbotron'>
              <h1>Retrosockets</h1>
              <p className='text-muted'>You've got feels. We've got websockets.</p>
            </div>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
});

function select(state) {
  return state;
}

export default connect(select, { pushState })(App);
//ReactDOM.render((<App/>), document.getElementById('content'));
