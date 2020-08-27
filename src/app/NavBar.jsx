import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../logo.svg';

export default function NavBar() {
    const [isActive, setIsActive] = useState(false);
    const toggleNavbar = () => setIsActive(!isActive);
    return (
        <nav className="navbar is-fixed-bottom" role="navigation" aria-label="Main Navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <img src={logo} className="navbar-logo" alt="logo" width="100" height="100" />
                </a>
                <a role="button"
                    className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="main-navbar"
                    onClick={toggleNavbar}>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div id="main-navbar" className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
                <div className="navbar-start">
                    <NavLink to="/" className="navbar-item" activeClassName="active" exact>
                        Home
                    </NavLink>
                    <NavLink to="/timers" className="navbar-item" activeClassName="active" exact={true}>
                        Timers
                    </NavLink>
                    <NavLink to="/hue-bridge" className="navbar-item" activeClassName="active" exact={true}>
                        Hue Bridge Info
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}