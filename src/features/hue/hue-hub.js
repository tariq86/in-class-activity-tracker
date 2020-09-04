import { Hue } from 'hue-hacking-node';
import axios from 'axios';



export default class HueHub {
    hub = null;
    connect = async () => {
        this.hub = await new Hue({
            ip: process.env.REACT_APP_HUE_IP,
            key: process.env.REACT_APP_HUE_USERNAME,
        });
        return this.hub;
    }
    flashLightGroup = async (groupId, numFlashes = 3) => {
        if (this.hub === null) {
            await this.connect();
        }
        // These two lines will also randomize the colors of the flashing,
        // _but_ we need to revert to the previous colors afterwards!
        // const xy = new HueColors().getCIEColor();
        // const state = bridge.buildXYState(xy);
        const state = { alert: 'select' };
        // console.debug("State: ", state);
        let flashes = 0;
        let intervalId = setInterval(async () => {
            if (flashes === numFlashes) {
                clearInterval(intervalId);
                return;
            }
            const r = await this.hub.putGroupAction(groupId, state);
            console.debug('putGroupAction Response: ', r);
            flashes++;
        }, 1000);
    }
    getLights = async () => {
        if (this.hub === null) {
            await this.connect();
        }
        console.debug("Getting Hue lights. API base URL: ", this.hub.baseApiUrl);
        const result = await axios.get(`${this.hub.baseApiUrl}/lights`);
        return result.data;
    }
    getLightGroups = async () => {
        if (this.hub === null) {
            await this.connect();
        }
        console.debug("Getting Hue light groups. API base URL: ", this.hub.baseApiUrl);
        const result = await axios.get(`${this.hub.baseApiUrl}/groups`);
        return result.data;
    }
}