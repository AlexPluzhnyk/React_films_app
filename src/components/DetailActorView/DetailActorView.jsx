import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import Card from "../_shared/card/Card";
import { IMAGE_PATH300x450, IMAGE_PATH } from "../../constants/constants";
import { fetchActorAbout } from "../../store/actors/action";
import { toggleFavoriteFilm } from "../../store/films/actions";
import notImage from "../../images/placeholder.png";

import "./style.scss";

/*
This component works until the page is reloaded,
the API does not return the necessary information for famous films
*/

const DetailActorView = () => {
  const dispatch = useDispatch();
  const { actorId } = useParams();

  useEffect(() => {
    dispatch(fetchActorAbout(actorId));
  }, [dispatch, actorId]);

  const {
    allActors,
    profile_path,
    name,
    biography,
    birthday,
    place_of_birth,
    favoriteFilms,
  } = useSelector(
    ({
      filmsReducer: { favoriteFilms },
      actorsReducer: {
        allActors,
        actorDescription: {
          profile_path,
          name,
          biography,
          birthday,
          place_of_birth,
          id,
        },
      },
    }) => ({
      profile_path,
      name,
      biography,
      birthday,
      place_of_birth,
      id,
      allActors,
      favoriteFilms,
    })
  );

  const { known_for } = allActors.find(({ id }) => id === +actorId);

  const isLiked = (id) =>
    favoriteFilms.some((elem) => {
      return elem.id === id;
    });

  const addTooFavorite = (film) => {
    dispatch(toggleFavoriteFilm(film));
  };

  const renderKnownForCard = () => {
    return known_for.map((item) => {
      return (
        <Card
          key={item.id}
          film={item}
          image_path={IMAGE_PATH}
          addTooFavorite={addTooFavorite}
          isFavorite={isLiked(item.id)}
        />
      );
    });
  };

  return (
    <div className="about">
      <div className="about__box">
        <div className="about__poster">
          <img
            className="about__img"
            src={
              profile_path ? `${IMAGE_PATH300x450}${profile_path}` : notImage
            }
            alt="poster"
          />
        </div>
        <div className="description">
          <h2>{name}</h2>
          <p>
            <strong>Birthday: </strong>
            {birthday}
          </p>
          <p>
            <strong>Place of birth: </strong>
            {place_of_birth}
          </p>
          <h3>Biography</h3>
          <p>{biography}</p>
        </div>
      </div>
      <h1 className="fameTitle">Known for</h1>
      <div className="box-famous">{renderKnownForCard()}</div>
    </div>
  );
};

export default DetailActorView;
