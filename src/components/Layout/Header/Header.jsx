import React from "react";
import { Link } from "react-router-dom";

import { AppBar, Button, Toolbar, Typography } from "@mui/material";

import {
  LOGIN_PAGE,
  FAVORITE_PAGE,
  FILMS_PAGE,
  ACTORS_PAGE,
} from "./constants";

const Header = () => {
  return (
    <AppBar sx={{ position: "fixed", bgcolor: "black" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My films
        </Typography>
        <Button component={Link} to={FILMS_PAGE} color="inherit">
          Films
        </Button>
        <Button component={Link} to={ACTORS_PAGE} color="inherit">
          Actors
        </Button>
        <Button component={Link} to={FAVORITE_PAGE} color="inherit">
          Favorite films
        </Button>
        <Button component={Link} to={LOGIN_PAGE} color="inherit">
          Sing out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
