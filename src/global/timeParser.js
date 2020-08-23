/**
 * Get an object containing hours, minutes, and seconds
 * for the given number of seconds
 * @param {Number} secs the total number of seconds to parse
 * @returns {{hours: Number, minutes: Number, seconds: Number}}
 */
export const parseHmsFromSecs = (secs) => {
    let remainder = parseInt(secs);
    let hours = parseInt(Math.floor(remainder / 3600));
    remainder -= hours * 3600;
    let minutes = parseInt(Math.floor(remainder / 60));
    remainder -= minutes * 60;
    let seconds = remainder;
    return {
        hours,
        minutes,
        seconds
    };
}

/**
 * Convert the given seconds to a human-readable string
 * of hours, minutes, and seconds.
 * Example output: "1 hour, 45 minutes, and 15 seconds"
 * @param {Number} secs the total number of seconds
 * @returns {String}
 */
export const secondsToHmsString = (secs) => {
    const parts = parseHmsFromSecs(secs);
    let out = '';
    if (parts.hours > 0) {
        out += parts.hours;
        if (parts.hours === 1) {
            out += ' hour, ';
        } else {
            out += ' hours, ';
        }
    }
    if (parts.minutes > 0) {
        out += parts.minutes;
        if (parts.minutes === 1) {
            out += ' minute, and ';
        } else {
            out += ' minutes, and ';
        }
    }
    out += parts.seconds;
    if (parts.seconds === 1) {
        out += ' second';
    } else {
        out += ' seconds';
    }
    return out;
}