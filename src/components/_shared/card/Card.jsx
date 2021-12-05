import React from "react";
import { useHistory } from "react-router";

import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

import logo from "../../../images/placeholder.png";

import "./style.scss";

const Card = ({ film, addTooFavorite, isFavorite, image_path }) => {
  const history = useHistory();
  const { title, vote_average, poster_path, release_date, id } = film;

  const getDescription = () => {
    history.push(`/films/${id}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    addTooFavorite(film);
  };

  return (
    <div className="card" onClick={getDescription}>
      <div className="card__image-wrapper">
        <img
          className="card__image"
          src={poster_path ? `${image_path}${poster_path}` : logo}
          alt=""
        />
      </div>
      <div className="card__content">
        <h2 className="card__title">{title}</h2>
        <div className="card__date-release"> Date release: {release_date}</div>
        <div className="card__vote">
          <Rating
            max={10}
            value={vote_average}
            readOnly={true}
            size={"small"}
          />
        </div>

        <StarIcon
          sx={{ fontSize: 36, position: "absolute", top: 3, right: 3 }}
          color={isFavorite ? "warning" : "info"}
          onClick={handleFavoriteClick}
        />
      </div>
      <div className="hover"></div>
    </div>
  );
};

export default Card;
