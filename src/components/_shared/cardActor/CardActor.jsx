import React from "react";
import { useHistory } from "react-router";

import placeholder from "../../../images/placeholder.png";

import "./style.scss";

export const CardActor = ({ name, posterLink, pathImg, id }) => {
  const history = useHistory();

  const getDescription = () => {
    history.push(`/actors/${id}`);
  };

  return (
    <div className="card-wrapper" onClick={getDescription}>
      <div className="img-wrapper">
        <img
          className="img"
          src={posterLink ? `${pathImg}${posterLink}` : placeholder}
          alt="poster"
        />
      </div>
      <h4>{name}</h4>
    </div>
  );
};
