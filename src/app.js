import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './index.css';
import Main from './modules/main/main';
import Map from './modules/map/map';
import Page from './modules/page/page';

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route component={Main} exact path="/" />
          <Route component={Map} path="/map" />
          <Route component={Page} path="/page" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
