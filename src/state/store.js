import { createStore as reduxCreateStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import initialState from './initial';
import reducers from './reducers';

const createStore = state =>
  reduxCreateStore(reducers, state || initialState, composeWithDevTools(applyMiddleware(thunk)));

export default createStore;
