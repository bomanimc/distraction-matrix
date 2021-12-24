import { combineReducers } from 'redux';

import animatorReducer from '../components/Animator/reducer';

export default combineReducers({
  animator: animatorReducer,
});
