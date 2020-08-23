/**
 * Get the initial state for a specific part of the redux store,
 * if a match is found in localStorage.
 * NOTE: This currently isn't being used, and I'm not really sure
 * if syncing the Redux store to the browser's localStorage is the
 * best option to persist between reloads!
 * @param {String} stateKey the "key" to pull from the state object
 * @param {*} defaultState the default initial state for the given state key
 */
export default function getInitialState(stateKey, defaultState) {
    let APP_STATE = localStorage.getItem('APP_STATE');
    if (APP_STATE) {
        APP_STATE = JSON.parse(APP_STATE);
        let state = APP_STATE[stateKey];
        if (state) {
            console.debug("Using saved app state for initial state: ", state);
            return state;
        }
    }
    return defaultState;
}