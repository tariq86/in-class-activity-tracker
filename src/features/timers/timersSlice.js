import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  all: [{
    id: "123abc",
    active: false,
    seconds: 62,
    message: "This is an initial test timer!",
  },
  {
    id: "abc123",
    active: false,
    seconds: 5,
    message: "5 seconds, with flashy lights :)",
    hueAlertGroup: 2
  }],
  active: null,
};

export const timerSlice = createSlice({
  name: 'timers',
  initialState,
  reducers: {
    addTimer: (state, action) => {
      state.all.push(action.payload);
    },
    removeTimer: (state, action) => {
      state.all = state.all.filter(timer => timer.id !== action.payload.id);
    },
    setActiveTimer: (state, action) => {
      state.active = state.all.first(action.payload.id);
    },
    clearAllTimers: state => {
      state.all = [];
      state.active = null;
    },
  },
});

export const { addTimer, removeTimer, setActiveTimer, clearAllTimers } = timerSlice.actions;

export const selectActiveTimer = state => state.active;

export default timerSlice.reducer;
