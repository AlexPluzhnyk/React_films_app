import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IMAGE_PATH } from "../../constants/constants";
import {
  toggleFavoriteFilm,
  fetchFilms,
  setFilter,
} from "../../store/films/actions";
import { FILTER_NAMES } from "../../store/films/constants";
import Card from "../_shared/card/Card";
import MyPagination from "../_shared/pagination/Pagination";

import "./style.scss";

const FilmList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFilms());
  }, [dispatch]);

  const { films, totalPages, page, favoriteFilms } = useSelector(
    ({
      filmsReducer: {
        films,
        totalPages,
        favoriteFilms,
        appliedFilters: { page },
      },
    }) => ({ films, totalPages, page, favoriteFilms })
  );

  const handleChange = (value) => {
    dispatch(setFilter(FILTER_NAMES.PAGE, value));
    dispatch(fetchFilms());
  };

  const addTooFavorite = (film) => {
    dispatch(toggleFavoriteFilm(film));
  };

  const renderFilmCard = () => {
    const isLiked = (id) =>
      favoriteFilms.some((elem) => {
        return elem.id === id;
      });

    return films.map((film) => (
      <Card
        film={film}
        key={film.id}
        addTooFavorite={addTooFavorite}
        isFavorite={isLiked(film.id)}
        image_path={IMAGE_PATH}
      />
    ));
  };
  const renderPagination = () => {
    return (
      <MyPagination
        currentPage={page}
        handleChange={handleChange}
        totalPages={totalPages}
      />
    );
  };
  const renderNotFound = () => {
    return (
      <div className="NotFound">
        <h1>Not found</h1>
      </div>
    );
  };

  return (
    <>
      <div className="films-wrapper">
        {films.length > 0 ? renderFilmCard() : renderNotFound()}
      </div>
      {totalPages > 1 && renderPagination()}
    </>
  );
};

export default FilmList;
