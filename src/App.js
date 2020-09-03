import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faSlack } from '@fortawesome/free-brands-svg-icons';

import NavBar from './components/NavBar/NavBar';
import RouteSwitcher from './components/RouteSwitcher/RouteSwitcher';

import './App.scss';

library.add(fas);
library.add(faSlack);

export default function App() {
  return (
    <Router>
      <main role="main" className="container">
        <RouteSwitcher />
      </main>
      <NavBar />
    </Router>
  );
}