import * as FILMS_ACTION_TYPES from "./types";
import queryBuilder from "../../api/queryBuilder";
import { API_BASE, KEY, FETCH_GENRE } from "../../api/paths";

const fetchFilmsStart = () => ({
  type: FILMS_ACTION_TYPES.FETCH_FILMS_START,
});

const fetchFilmsFailed = (error) => ({
  type: FILMS_ACTION_TYPES.FETCH_FILMS_FAILURE,
  payload: error,
});

const fetchFilmsSuccess = (films) => ({
  type: FILMS_ACTION_TYPES.FETCH_FILMS_SUCCESS,
  payload: films,
});
const filmDescription = (description) => ({
  type: FILMS_ACTION_TYPES.FETCH_FILM_ABOUT,
  payload: description,
});

const fetchGenresStart = () => ({
  type: FILMS_ACTION_TYPES.FETCH_GENRES_START,
});

const fetchGenresFailed = (error) => ({
  type: FILMS_ACTION_TYPES.FETCH_GENRES_FAILURE,
  payload: error,
});

const fetchGenresSuccess = (films) => ({
  type: FILMS_ACTION_TYPES.FETCH_GENRES_SUCCESS,
  payload: films,
});

export const setFilter = (filterName, value) => ({
  type: FILMS_ACTION_TYPES.SET_FILTER,
  payload: { filterName, value },
});

export const resetFilter = () => ({
  type: FILMS_ACTION_TYPES.RESET_FILTER,
});

export const setSearchWord = (value) => ({
  type: FILMS_ACTION_TYPES.SET_SEARCH_WORD,
  payload: value,
});
export const toggleFavoriteFilm = (film) => ({
  type: FILMS_ACTION_TYPES.TOGGLE_FAVORITE,
  payload: film,
});
export const removeFavoriteFilm = (films) => ({
  type: FILMS_ACTION_TYPES.TOGGLE_FAVORITE,
  payload: films,
});
export const resetPagination = (page) => ({
  type: FILMS_ACTION_TYPES.TOGGLE_FAVORITE,
  payload: page,
});

export const fetchFilms = (isSearch) => async (dispatch, getState) => {
  dispatch(fetchFilmsStart());
  const {
    filmsReducer: { appliedFilters, searchWord },
  } = getState();

  let url = "";

  if (isSearch) {
    dispatch(resetFilter());
    url = queryBuilder(appliedFilters, searchWord);
  } else {
    dispatch(setSearchWord(""));
    url = queryBuilder(appliedFilters);
  }

  const response = await fetch(url);

  try {
    if (response.ok) {
      const { results, total_pages } = await response.json();

      dispatch(fetchFilmsSuccess({ films: results, totalPages: total_pages }));
      return;
    }
  } catch (e) {
    console.error("Error: ", e);
    dispatch(fetchFilmsFailed("Failed to load films!"));
  }
};

export const fetchFilmAbout = (param) => async (dispatch) => {
  dispatch(fetchFilmsStart());

  const url = `${API_BASE}movie/${param}?${KEY}`;
  const response = await fetch(url);
  try {
    if (response.ok) {
      const data = await response.json();
      dispatch(filmDescription(data));
      return;
    }
  } catch (e) {
    console.error("Error: ", e);
  }
};

export const fetchGenres = () => async (dispatch) => {
  dispatch(fetchGenresStart());

  const response = await fetch(`${FETCH_GENRE}`);

  try {
    if (response.ok) {
      const data = await response.json();
      dispatch(fetchGenresSuccess(data.genres));

      return;
    }
  } catch (e) {
    console.error("Error: ", e);
    dispatch(fetchGenresFailed("Failed to load genres!"));
  }
};
