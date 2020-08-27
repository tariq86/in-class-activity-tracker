import moment from 'moment';

/**
 * Convert the given number of seconds to a more human-friendly string,
 * converted to a string of hours, minutes, and seconds.
 * @param {Number} totalSeconds the total number of seconds to convert
 * @returns {String}
 */
export const secondsToTimeString = (totalSeconds) => {
    let duration = moment.duration(totalSeconds, "seconds");
    let time = '';
    let hours = duration.hours();
    let minutes = duration.minutes();
    let seconds = duration.seconds();
    if (hours > 0) {
        time += `${hours} hour`;
        if (hours > 1) {
            time += 's';
        }
        time += ', ';
    }
    if (minutes > 0) {
        time += `${minutes} minute`;
        if (minutes > 1) {
            time += 's';
        }
        if (seconds > 0) {
            time += ' and ';
        }
    }
    if (seconds > 0) {
        time += `${seconds} second`;
        if (seconds > 1) {
            time += 's';
        }
    }
    return time;
}