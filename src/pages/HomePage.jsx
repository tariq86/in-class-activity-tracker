import React from 'react';
import logo from '../logo.svg';

export default function HomePage() {
    return (
        <div id="home-page">
            <div className="box has-text-centered">
                <img src={logo} className="image app-logo fa-spin" alt="logo" width="512" height="512" />
                <h1>In-Class Activity Tracker (iCAT)</h1>
            </div>
        </div>
    );
}