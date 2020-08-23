import React from 'react';
import logo from '../logo.svg';

export default function HomePage() {
    return (
        <div className="page">
            <header className="text-center">
                <img src={logo} className="App-logo" alt="logo" width="512" height="512" />
            </header>
        </div>
    );
}