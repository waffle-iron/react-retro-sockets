import React from 'react';
import { Router, hashHistory, browserHistory } from 'react-router';
import routes from '../routes';
import '../assets/stylesheets/base.scss';

const Root = (props) => {
  const displayName = "Root";

  return(
    <Router history={ hashHistory }>
      { routes }
    </Router>
  )
};

export default Root;
