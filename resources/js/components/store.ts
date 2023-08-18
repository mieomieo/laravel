import { configureStore } from '@reduxjs/toolkit';
import timelineSlice from './reducers/timelineSlice.js';


const store = configureStore({
    reducer:{ 
      post: timelineSlice,
    } 
  });
export default store;