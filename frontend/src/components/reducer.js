import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { reducer as reviews } from './reviews/redux';

export default combineReducers({
  router: routerReducer,
  reviews,
});
