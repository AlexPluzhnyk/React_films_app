import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "../../components/_shared/card/Card";
import { IMAGE_PATH } from "../../constants/constants";
import { removeFavoriteFilm } from "../../store/films/actions";

import "./style.scss";

const FavoriteFilmsPage = () => {
  const dispatch = useDispatch();
  const { favoriteFilms } = useSelector(
    ({ filmsReducer: { favoriteFilms } }) => ({ favoriteFilms })
  );

  const removeFilm = (film) => {
    dispatch(removeFavoriteFilm(film));
  };

  const renderCard = () => {
    const isLiked = (id) =>
      favoriteFilms.some((elem) => {
        return elem.id === id;
      });

    return favoriteFilms.map((item) => {
      return (
        <Card
          film={item}
          key={item.id}
          image_path={IMAGE_PATH}
          addTooFavorite={removeFilm}
          isFavorite={isLiked(item.id)}
        />
      );
    });
  };

  const listIsClear = () => {
    return (
      <div className="listIsClear">
        <span className="text">List is clear</span>
      </div>
    );
  };

  return (
    <div className="favorite-wrapper">
      {favoriteFilms.length > 0 ? renderCard() : listIsClear()}
    </div>
  );
};

export default FavoriteFilmsPage;
