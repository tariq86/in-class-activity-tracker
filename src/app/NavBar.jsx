import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../logo.svg';

export default function NavBar() {
    return (
        <nav className="navbar is-fixed-bottom" role="navigation" aria-label="Main Navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <img src={logo} className="navbar-logo" alt="logo" width="100" height="100" />
                </a>
                <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div className="navbar-menu" id="main-navbar">
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