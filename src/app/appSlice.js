import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "dark",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
  },
});

export const { setTheme, toggleTheme } = appSlice.actions;

export const getActiveTheme = (state) => state.theme;

export default appSlice.reducer;
