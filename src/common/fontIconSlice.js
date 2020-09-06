import { createSlice } from "@reduxjs/toolkit";
import { omit } from "lodash";

const initialState = {
  loadingList: {},
  loadedList: {},
};

export const fontIconSlice = createSlice({
  name: "fontIcon",
  initialState,
  reducers: {
    setIconLoaded: (state, action) => {
      state.loadingList = omit(state.loadingList, action.payload);
      state.loadedList[action.payload] = true;
    },
    setIconLoading: (state, action) => {
      state.loadingList[action.payload] = true;
    },
  },
});

export const { setIconLoaded, setIconLoading } = fontIconSlice.actions;

export default fontIconSlice.reducer;
