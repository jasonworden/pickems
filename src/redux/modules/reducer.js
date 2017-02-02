import { combineReducers } from 'redux';
// import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './auth';
// import {reducer as form} from 'redux-form';

import schedule from './schedule';
import picks from './picks';
import teams from './teams';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,

  // form,
  // multireducer: multireducer({
  //   counter1: counter,
  //   counter2: counter,
  //   counter3: counter
  // }),

  schedule,
  picks,
  teams
});
