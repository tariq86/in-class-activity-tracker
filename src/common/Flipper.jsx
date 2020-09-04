import React from 'react';
import './Flipper.scss';

export default function Flipper({ flipped, front, back }) {
    return (
        <div className={`flip-container ${flipped ? "flipped" : ""}`}
            role="group"
            name="flipper">
            <div className="flipper">
                <div className="front" role="region" aria-label="flipper-front">{front}</div>
                <div className="back" role="region" aria-label="flipper-back">{back}</div>
            </div>
        </div>
    );
}