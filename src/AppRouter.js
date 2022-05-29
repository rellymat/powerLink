import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "pages";
import { ThemeProvider } from "theme";
import NavBar from "components/NavBar";
import FavoriteUsers from "pages/FavoriteUsers/FavoriteUsers";

const AppRouter = () => {
  return (
    <ThemeProvider>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/favorites" component={FavoriteUsers} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default AppRouter;
