import axios from 'axios';
// curl -X POST -H 'Content-type: application/json' --data '{"text":"Hello, World!"}' [[SLACK_URL_HERE]]


export default class SlackClient {
    url = null;
    constructor() {
        this.url = process.env.REACT_APP_SLACK_HOOK;
    }
    isEnabled() {
        return typeof this.url === 'string' && this.url.length > 0;
    }
    async sendMessage(text) {
        axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        const result = await axios.post('/proxy', {
            url: this.url,
            method: 'POST',
            body: {
                text,
            }
        });
        console.log("RESULT: ", result.data)
        return result.data;

    }
}

export const getSlackUrl = () => {
    return process.env.REACT_APP_SLACK_HOOK;
}

export const sendSlackAlert = async (text) => {
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    const result = await axios.post('/proxy', {
        url: getSlackUrl(),
        method: 'POST',
        body: {
            text,
        }
    });
    console.log("RESULT: ", result.data)
    return result.data;
}