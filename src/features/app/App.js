import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Navigation } from 'components/Navigation';
import { DashboardPage } from 'features/dashboard/DashboardPage';
import { MapPage } from 'features/map/MapPage';
import { AboutPage } from 'features/about/AboutPage';

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navigation />
        <main className="py-8">
          <Switch>
            <Route exact path="/">
              <DashboardPage />
            </Route>
            <Route path="/map">
              <MapPage />
            </Route>
            <Route path="/about">
              <AboutPage />
            </Route>
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
