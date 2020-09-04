import { combineReducers, configureStore } from '@reduxjs/toolkit';
import settingsReducer from './settingSlice';
import timersReducer from '../features/timers/timersSlice';
import hueReducer from '../features/hue/hueSlice';

const rootReducer = combineReducers({
  settings: settingsReducer,
  timers: timersReducer,
  hue: hueReducer,
});


export default configureStore({
  reducer: rootReducer,
});