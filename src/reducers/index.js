import { combineReducers } from 'redux';
import * as ActionTypes from '../actions';
import { routerReducer as routing } from 'react-router-redux';

const initialState = {
  'columns': []
};

function columns(state = initialState, action) {
  switch (action.type) {
  case ActionTypes.ADD_COLUMN:
    return { 'columns': state.columns.concat(action.column) };
  default:
    return state;
  }
}

const rootReducer = combineReducers({
  columns,
  routing
});

export default rootReducer;
