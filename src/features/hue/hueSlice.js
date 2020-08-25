import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    lamps: [],
    groups: {},
};

export const hueSlice = createSlice({
    name: 'hue',
    initialState,
    reducers: {
        setAllLamps: (state, action) => {
            state.lamps = action.payload;
        },
        setAllGroups: (state, action) => {
            state.groups = action.payload;
        }
    },
});

export const { setAllLamps, setAllGroups } = hueSlice.actions;

export const getAllGroups = state => state.groups;
export const getAllLamps = state => state.lamps;

export default hueSlice.reducer;
