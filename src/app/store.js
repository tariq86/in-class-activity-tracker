import { combineReducers, configureStore } from '@reduxjs/toolkit';
import timersReducer from '../features/timers/timersSlice';

const rootReducer = combineReducers({
  timers: timersReducer,
});


export default configureStore({
  reducer: rootReducer,
});