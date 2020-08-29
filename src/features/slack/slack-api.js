import axios from 'axios';
// curl -X POST -H 'Content-type: application/json' --data '{"text":"Hello, World!"}' [[SLACK_URL_HERE]]

export const getSlackUrl = () => {
    return process.env.REACT_APP_SLACK_HOOK;
}

export const isSlackEnabled = () => {
    const webhookUrl = getSlackUrl();
    return typeof webhookUrl === 'string' && webhookUrl.length > 1;
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