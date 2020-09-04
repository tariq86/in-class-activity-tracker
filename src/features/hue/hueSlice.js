import { createSlice } from '@reduxjs/toolkit';
import HueHub from './hue-hub';

const initialState = {
    apiUrl: '',
    config: {},
    lights: {},
    groups: {},
};

export const hueSlice = createSlice({
    name: 'hue',
    initialState,
    reducers: {
        setHueApiUrl: (state, action) => {
            state.apiUrl = action.payload;
        },
        setHueConfig: (state, action) => {
            state.config = action.payload;
        },
        setHueGroups: (state, action) => {
            state.groups = action.payload;
        },
        setHueLights: (state, action) => {
            state.lights = action.payload;
        },
    },
});

export const { setHueApiUrl, setHueConfig, setHueGroups, setHueLights } = hueSlice.actions;

export const getHueGroups = state => state.groups;
export const getHueLights = state => state.lights;
export const getHueApiUrl = state => state.apiUrl;
export const getHueConfig = state => state.config;

export default hueSlice.reducer;

function hubInfoLoaded(state) {
    return state.hue.apiUrl.length > 0 && Object.keys(state.hue.config).length > 0;
}

// THUNX
export function fetchHueHubInfo() {
    return async (dispatch, getState) => {
        if (hubInfoLoaded(getState())) {
            return Promise.resolve();
        }
        try {
            const hub = await new HueHub().connect();
            dispatch(setHueApiUrl(hub.baseApiUrl));
            dispatch(setHueConfig(hub.config));
        } catch (error) {
            console.warn('Error: ', error);
        }
    }
}

export function fetchHueLightGroups() {
    return async (dispatch, getState) => {
        const state = getState();
        let groups = state.hue.groups;
        if (Object.keys(groups).length > 0) {
            console.debug("Groups already loaded!", groups);
            return Promise.resolve();
        }
        try {
            groups = await new HueHub().getLightGroups();
            return dispatch(setHueGroups(groups));
        } catch (error) {
            console.warn("ERROR: ", error);
        }
    }
}

export function fetchHueLights() {
    return async (dispatch, getState) => {
        const state = getState();
        let lights = state.hue.lights;
        if (Object.keys(lights).length > 0) {
            console.debug("Lights already loaded!", lights);
            return Promise.resolve();
        }
        try {
            lights = await new HueHub().getLights();
            return dispatch(setHueLights(lights));
        } catch (error) {
            console.warn("ERROR: ", error);
        }
    }
}