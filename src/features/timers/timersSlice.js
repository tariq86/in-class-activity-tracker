import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  all: [{
    id: "123abc",
    active: false,
    seconds: 69,
    message: "This is an initial test timer!",
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
      console.log("Hello? Is it me you're looking for?");
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
