import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import fontIconSlice from "../common/fontIconSlice";
import hueReducer from "../features/hue/hueSlice";
import timersReducer from "../features/timer/timerSlice";

const rootReducer = combineReducers({
  app: appReducer,
  fontIcon: fontIconSlice,
  hue: hueReducer,
  timers: timersReducer,
});

export default configureStore({
  reducer: rootReducer,
});
