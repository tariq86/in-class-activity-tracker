import { Hue } from 'hue-hacking-node';
import axios from 'axios';


export const getHueBridge = async () => {
    return new Hue({
        ip: process.env.REACT_APP_HUE_IP,
        key: process.env.REACT_APP_HUE_USERNAME,
    });
}

export const flashHueLightGroup = async (groupIndex, bridge = null, numFlashes = 3) => {
    if (bridge === null) {
        bridge = await getHueBridge();
    }
    // These two lines will also randomize the colors of the flashing,
    // _but_ we need to revert to the previous colors afterwards!
    // const xy = new HueColors().getCIEColor();
    // const state = bridge.buildXYState(xy);
    const state = { alert: 'select' };
    console.log("State: ", state);
    let flashes = 0;
    let intervalId = setInterval(async () => {
        if (flashes === numFlashes) {
            clearInterval(intervalId);
            return;
        }
        console.log("State: ", state);
        const r = await bridge.putGroupAction(groupIndex, state);
        console.log("Response: ", r);
        flashes++;
    }, 1000);
}

export const getHueGroups = async (bridge = null) => {
    if (bridge === null) {
        bridge = await getHueBridge();
    }
    console.log("BASE URL: ", bridge.baseApiUrl);
    const result = await axios.get(`${bridge.baseApiUrl}/groups`);
    return result.data
}