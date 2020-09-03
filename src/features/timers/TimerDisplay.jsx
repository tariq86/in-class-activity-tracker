import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

export default function TimerDisplay({ totalSeconds, isActive, onComplete, activeIndex }) {
    const renderTime = (dimension, time, animatedColor) => {
        return (
            <div className="time-wrapper" style={{ color: animatedColor }}>
                <h3 className="time">{time}</h3>
                <span>{dimension}</span>
            </div>
        );
    };
    const getTimeMinutes = time => ((time % hourSeconds) / minuteSeconds) | 0;
    const getTimeHours = time => ((time % daySeconds) / hourSeconds) | 0;
    const timerColors = [["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]];
    const totalHours = getTimeHours(totalSeconds);
    return (
        <div id="timer-display">
            {
                totalHours > 0 && (
                    <CountdownCircleTimer
                        key={`hours-${activeIndex}`}
                        isPlaying={isActive}
                        colors={timerColors}
                        duration={totalHours === 0 ? 0 : daySeconds}
                        initialRemainingTime={totalSeconds % daySeconds}
                        onComplete={totalElapsedTime => [totalSeconds - totalElapsedTime > hourSeconds]}>
                        {({ remainingTime, animatedColor }) =>
                            renderTime("hours", getTimeHours(remainingTime), animatedColor)
                        }
                    </CountdownCircleTimer>
                )
            }
            <CountdownCircleTimer
                key={`minutes-${activeIndex}`}
                isPlaying={isActive}
                colors={timerColors}
                duration={hourSeconds}
                initialRemainingTime={totalSeconds % hourSeconds}
                onComplete={totalElapsedTime => [
                    totalSeconds - totalElapsedTime > minuteSeconds
                ]}>
                {({ remainingTime }) =>
                    renderTime("minutes", getTimeMinutes(remainingTime))
                }
            </CountdownCircleTimer>
            <CountdownCircleTimer
                key={`seconds-${activeIndex}`}
                isPlaying={isActive}
                colors={timerColors}
                duration={minuteSeconds}
                initialRemainingTime={totalSeconds % minuteSeconds}
                onComplete={onComplete}>
                {({ remainingTime }) =>
                    renderTime("seconds", remainingTime)
                }
            </CountdownCircleTimer>
        </div>
    );
}