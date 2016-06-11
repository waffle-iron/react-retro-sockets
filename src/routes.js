import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './components/Home';
import About from './components/About';
import Board from './components/Board';

export default (
  <div>
    <Route path='/' component={ App }>
      <IndexRoute component={ Home } />
      <Route path='/about' component={About} />
      <Route path='/boards/:id' component={ Board }/>
    </Route>
    <Route path='*' component='/' />
  </div>
);
