"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.selectActiveTimer = exports.clearAllTimers = exports.setActiveTimer = exports.removeTimer = exports.addTimer = exports.timerSlice = void 0;

var _toolkit = require("@reduxjs/toolkit");

var initialState = {
  all: [{
    id: "123abc",
    active: false,
    seconds: 62,
    title: "Test Timer",
    message: "\n# Hello World!\n## Heading 2\n### Heading 3\n#### Heading 4\n##### Heading 5\n###### Heading 6\n```js\nvar code = \"Testing\";\n```\n * List 1\n * List 2\n---\n- [ ] Checkbox 1\n- [x] Checked!\n"
  }, {
    id: "abc123",
    active: false,
    seconds: 5,
    title: "5 seconds w/ flashy lights :)",
    message: null,
    hueAlertGroup: 2
  }],
  active: null
};
var timerSlice = (0, _toolkit.createSlice)({
  name: 'timers',
  initialState: initialState,
  reducers: {
    addTimer: function addTimer(state, action) {
      state.all.push(action.payload);
    },
    removeTimer: function removeTimer(state, action) {
      state.all = state.all.filter(function (timer) {
        return timer.id !== action.payload.id;
      });
    },
    setActiveTimer: function setActiveTimer(state, action) {
      state.active = state.all.first(action.payload.id);
    },
    clearAllTimers: function clearAllTimers(state) {
      state.all = [];
      state.active = null;
    }
  }
});
exports.timerSlice = timerSlice;
var _timerSlice$actions = timerSlice.actions,
    addTimer = _timerSlice$actions.addTimer,
    removeTimer = _timerSlice$actions.removeTimer,
    setActiveTimer = _timerSlice$actions.setActiveTimer,
    clearAllTimers = _timerSlice$actions.clearAllTimers;
exports.clearAllTimers = clearAllTimers;
exports.setActiveTimer = setActiveTimer;
exports.removeTimer = removeTimer;
exports.addTimer = addTimer;

var selectActiveTimer = function selectActiveTimer(state) {
  return state.active;
};

exports.selectActiveTimer = selectActiveTimer;
var _default = timerSlice.reducer;
exports["default"] = _default;