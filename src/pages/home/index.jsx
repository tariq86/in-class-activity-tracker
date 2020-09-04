import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

/**
 *
 */
export default function HomePage() {
    return (
        <div id="home-page" className="page container">
            <div className="box has-text-centered">
                <h1>In-Class Activity Tracker</h1>
                <div className="home-icon">
                    <FontAwesomeIcon className="app-logo has-text-primary" icon={faClock} size="10x" fixedWidth={true} />
                </div>
                <p>Welcome! Check out the <Link to="/timers">Timers</Link> page to get started.</p>
            </div>
        </div>
    );
}