import React from 'react';
import logo from '../logo.svg';

export default function HomePage() {
    return (
        <div className="page">
            <header className="text-center">
                <img src={logo} className="app-logo fa-spin" alt="logo" width="512" height="512" />
                <h1>Tariq's Time Tracker</h1>
                <p>It's really more of a fancy countdown timer than a time tracker, but I already named the repo :/</p>
            </header>
        </div>
    );
}