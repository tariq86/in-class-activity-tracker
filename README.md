# in-Class Activity Tracker (iCAT)

## Overview

This is a simple countdown timer intended to be used for in-class activities, with a few bonus features:

- Philips Hue integration -- select a Hue light group to flash when the time's up!
- Markdown support -- the timer's message, intended to contain activity instructions, accepts Markdown input that will be renderedas HTML!
- Slack support -- send a Slack alert when the timer is up!

## Usage

1.  `git clone` this repo to get the code
1.  `npm install` to install all dependencies
1.  `npm start` to start the React app

That's it! To enable specific integrations or alerts, see the following section.

### Integrations and Alerts

#### Philips Hue

If you want Philips Hue integration, you will need to get an authorized app key from your Philips Hue hub first, and then paste the data into your local `.env` file:

1.  Follow the official ["Getting Started" guide](https://developers.meethue.com/develop/get-started-2/) to get an authorized user/app created.
1.  Once your done, paste your user/app key into the `REACT_APP_HUE_USERNAME` variable in your `.env.local` file <sup>1</sup>.
1.  You will also need to paste your Hue bridge's IP address into the `REACT_APP_HUE_IP` variable.

_Coming Soon_: Support for bridge discovery is a planned feature. Once that's in place, this process will be handled within the app!

#### Slack

If you want to enable sending Slack messages when the timer completes, you will need to create a new Slack app _and_ start the proxy server <sup>2</sup>:

1. Follow the [official Slack API guide](https://api.slack.com/messaging) to create your app.
1. After your Slack app is created, generate a webhook URL for it and paste it into the `REACT_APP_SLACK_HOOK` variable in your `.env.local` file <sup>1</sup>.
1. To start the local proxy server, open a new terminal window and `cd` into the `proxy` folder within this project.
1. You'll need to run `npm install` the first time in order to install the server's dependencies. Once that's done, run `npm start` to start up the proxy server!

### Notes

**1**: To create your `.env.local` file, simply copy the `.env` file to `.env.local`. This file is ignored by git, and is where you should store any custom configurations, API keys, etc. that should not be committed to the repo. If you need to add a new configuration value for a new integration, please add a blank instance of the variable to `.env`. _DO NOT_ add any values into the main version-controlled `.env` file!

**2**: The local proxy server is needed to get around CORS restrictions. If you're integrating a feature that needs to proxy a request, send a `POST` request from the front-end to `/proxy`, with `url`, `method`, and `body` properties inside of the request body. The proxy server will send the request along to the given URL using the given method with the given body, and then relay the response body back to the front-end.

---

See [Code Information](CODE-INFO.md) for more information about the project code + setup.
