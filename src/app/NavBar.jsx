import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
    return (
        <nav className="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark">
            <a className="navbar-brand" href="#">TtT</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <NavLink to="/" className="nav-link" activeClassName="active" exact={true}>
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/timers" className="nav-link" activeClassName="active" exact={true}>
                            Timers
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/hue-bridges" className="nav-link" activeClassName="active" exact={true}>
                            Hue Bridges
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}