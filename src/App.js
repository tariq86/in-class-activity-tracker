import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faSlack } from '@fortawesome/free-brands-svg-icons';

import NavBar from './app/NavBar.jsx';
import RouteSwitcher from './app/RouteSwitcher.jsx';

import './styles/App.scss';

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