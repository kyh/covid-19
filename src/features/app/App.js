import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Navigation } from "components/Navigation";
import { Footer } from "components/Footer";
import { TrendPage } from "features/trend/TrendPage";
import { CurrentPage } from "features/current/CurrentPage";
import { ComparePage } from "features/compare/ComparePage";
import { AboutPage } from "features/about/AboutPage";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-800">
        <Navigation />
        <main className="py-8">
          <Switch>
            <Route exact path="/">
              <TrendPage />
            </Route>
            <Route path="/current">
              <CurrentPage />
            </Route>
            <Route path="/compare">
              <ComparePage />
            </Route>
            <Route path="/about">
              <AboutPage />
            </Route>
          </Switch>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
