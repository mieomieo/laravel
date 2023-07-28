import {applyMiddleware} from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

// const initialState = {};
// const middleware = [thunk];

// const store = configureStore (
//     rootReducer,
//     initialState,
//     composeWithDevTools(applyMiddleware(...middleware))
// );
const store = configureStore({
    reducer: rootReducer,
    // middleware: getDefaultMiddleware =>
    //   getDefaultMiddleware().concat(thunk) // To add custom middleware like thunk
  });
export default store;