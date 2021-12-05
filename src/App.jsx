import React from "react";
import Layout from "./components/Layout/Layout";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AboutFilm from "./routes/aboutFilm/AboutFilm";
import FavoriteFilmsPage from "./routes/favorites/Favorites";
import Films from "./routes/films/Films";
import LoginPage from "./routes/loginPage/LoginPage";
import Actors from "./routes/actors/Actors";
import AboutActor from "./routes/aboutActor/AboutActor";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Layout>
        <Route exact path="/films" component={Films} />
        <Route path="/films/:filmId" component={AboutFilm} />
        <Route path="/favorite" component={FavoriteFilmsPage} />
        <Route exact path="/actors" component={Actors} />
        <Route path="/actors/:actorId" component={AboutActor} />
      </Layout>
    </Switch>
  </Router>
);

export default App;
