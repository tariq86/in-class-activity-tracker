const express = require('express');
const request = require('request');

const app = express();

// Parse incoming request body as JSON
app.use(express.json());

app.use((req, res, next) => {
    console.log(`*** ${req.method} ${req.url} ***`);
    next();
});

app.post('/proxy', (req, res) => {
    // console.debug(req.body);
    const url = req.body.url;
    const method = req.body.method;
    const body = req.body.body;
    if (!url || !method || !body) {
        return res.json({ success: false, message: "Invalid Request" });
    }
    console.log(`Proxying ${method} request to ${url}`, body);
    request({
        url,
        method,
        body,
        json: true,
    }, (error, response, body) => {
        if (error || response.statusCode !== 200) {
            console.log("PROXY_ERROR: ", error);
            return res.status(500).json({ success: false, type: 'error', message: err.message });
        }
        console.log("PROXY_BODY: ", body);
        res.json({ success: true, body });
    });
    // res.json({ success: true, message: "OK" });
});

const PORT = process.env.APP_PORT || 3001;
app.listen(PORT, () => {
    console.log(`*** Server is live @ http://localhost:${PORT}`);
});