import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    theme: 'dark',
};

export const settingSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload;
        },
        toggleTheme: (state) => {
            state.theme = state.theme === 'dark' ? 'light' : 'dark';
        },
    },
});

export const { setTheme, toggleTheme } = settingSlice.actions;

export const getActiveTheme = state => state.theme;

export default settingSlice.reducer;
