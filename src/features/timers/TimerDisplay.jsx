import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

// TODO: move this to `timeParser.js`
const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

export default function TimerDisplay({ totalSeconds, isActive, onComplete, activeIndex }) {
    const renderTime = (dimension, time) => {
        return (
            <div className="time-wrapper">
                <h3 className="time">{time}</h3>
                <span>{dimension}</span>
            </div>
        );
    };
    return (
        <div id="timer-display">
            <CountdownCircleTimer
                key={`hours-${activeIndex}`}
                isPlaying={isActive}
                colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                duration={daySeconds}
                initialRemainingTime={totalSeconds % daySeconds}
                onComplete={totalElapsedTime => [totalSeconds - totalElapsedTime > hourSeconds]}>
                {({ remainingTime }) =>
                    renderTime("hours", Math.floor(remainingTime / 3600))
                }
            </CountdownCircleTimer>
            <CountdownCircleTimer
                key={`minutes-${activeIndex}`}
                isPlaying={isActive}
                colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                duration={hourSeconds}
                initialRemainingTime={totalSeconds % hourSeconds}
                onComplete={totalElapsedTime => [totalSeconds - totalElapsedTime > minuteSeconds]}>
                {({ remainingTime }) => {
                    return renderTime("minutes", Math.floor((remainingTime % hourSeconds) / 60))
                }}
            </CountdownCircleTimer>
            <CountdownCircleTimer
                key={`seconds-${activeIndex}`}
                isPlaying={isActive}
                colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                duration={minuteSeconds}
                initialRemainingTime={totalSeconds % minuteSeconds}
                onComplete={onComplete}>
                {({ remainingTime }) =>
                    renderTime("seconds", remainingTime % 60)
                }
            </CountdownCircleTimer>
        </div>
    );
}