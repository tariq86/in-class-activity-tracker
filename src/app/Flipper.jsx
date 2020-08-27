import React from 'react';
import '../styles/Flipper.scss';

export default function Flipper({ flipped, front, back }) {
    return (
        <div className={`flip-container${flipped ? "flipped" : ""}`}>
            <div className="flipper">
                <div className="front">{front}</div>
                <div className="back">{back}</div>
            </div>
        </div>
    );
}