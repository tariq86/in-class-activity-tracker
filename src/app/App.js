import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faSlack } from '@fortawesome/free-brands-svg-icons';
import { useSelector } from 'react-redux';

import NavBar from '../components/NavBar/NavBar';
import RouteSwitcher from '../components/RouteSwitcher/RouteSwitcher';

import './App.scss';

library.add(fas);
library.add(faSlack);

export default function App() {
  const activeTheme = useSelector(state => state.settings.theme);
  useEffect(() => {
    console.log("__ACTIVE_THEME__:", activeTheme);
    if (activeTheme === 'light') {
      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
      return;
    }
    document.body.classList.add('theme-dark');
    document.body.classList.remove('theme-light');
  }, [activeTheme]);
  return (
    <Router>
      <main role="main" className="container">
        <RouteSwitcher />
      </main>
      <NavBar />
    </Router>
  );
}