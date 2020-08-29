import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  all: [{
    id: "123abc",
    active: false,
    seconds: 62,
    title: "Test Timer",
    message: `
# Hello World!
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
\`\`\`js
var code = "Testing";
\`\`\`
 * List 1
 * List 2
---
- [ ] Checkbox 1
- [x] Checked!
`
  },
  {
    id: "abc123",
    active: false,
    seconds: 5,
    title: "5 seconds w/ Hue",
    message: null,
    hueAlertGroup: 2
  },
  {
    id: "a1b2c3",
    active: false,
    seconds: 10,
    title: "10s + Slack",
    sendSlackMessage: true,
  },
  ],
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
