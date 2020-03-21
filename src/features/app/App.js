import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Navigation } from 'components/Navigation';
import { Dashboard } from 'features/dashboard/Dashboard';

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navigation />
        <main className="py-8">
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route path="/map">Map</Route>
            <Route path="/about">About</Route>
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
