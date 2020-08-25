import { combineReducers, configureStore } from '@reduxjs/toolkit';
import timersReducer from '../features/timers/timersSlice';
import hueReducer from '../features/hue/hueSlice';

const rootReducer = combineReducers({
  timers: timersReducer,
  hue: hueReducer,
});


export default configureStore({
  reducer: rootReducer,
});