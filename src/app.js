import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import './index.css';
import Main from './modules/main/main';
import Map from './modules/map/map';
import Page from './modules/page/page';

function App() {
  console.log('v1.2.0');
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route component={Main} exact path="/" />
          <Route component={Map} exact path="/map" />
          <Route
              path="/page/:pk"
              render={({ match }) => <Page pk={match.params.pk} />}
          />
        </Switch>
      </Router>
    </div>
  );
}

// <Route component={Main} exact path="/" />

export default App;
