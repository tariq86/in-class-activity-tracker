import { combineReducers, configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import timersReducer from '../features/timer/timerSlice';
import hueReducer from '../features/hue/hueSlice';

const rootReducer = combineReducers({
  app: appReducer,
  timers: timersReducer,
  hue: hueReducer,
});


export default configureStore({
  reducer: rootReducer,
});