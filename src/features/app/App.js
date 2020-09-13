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
      <section
        className="text-gray-300 antialiased min-h-screen bg-gray-900 grid"
        style={{ gridTemplateRows: "auto 1fr auto" }}
      >
        <Navigation />
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
        <Footer />
      </section>
    </BrowserRouter>
  );
};

export default App;
