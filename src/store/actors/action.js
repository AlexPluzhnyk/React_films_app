import { API_BASE, KEY } from "../../api/paths";
import { URL_ACTORS } from "./constants";
import * as ACTORS_ACTION_TYPES from "./types";

const fetchActorsStart = () => ({
  type: ACTORS_ACTION_TYPES.FETCH_ACTORS_START,
});

const fetchActorsFailed = (error) => ({
  type: ACTORS_ACTION_TYPES.FETCH_ACTORS_FAILURE,
  payload: error,
});

const fetchActorsSuccess = (actors) => ({
  type: ACTORS_ACTION_TYPES.FETCH_ACTORS_SUCCESS,
  payload: actors,
});
const actorDescription = (actor) => ({
  type: ACTORS_ACTION_TYPES.GET_ACTOR_DESCRIPTION,
  payload: actor,
});
export const setQueryWord = (query) => ({
  type: ACTORS_ACTION_TYPES.SET_QUERY_WORD,
  payload: query,
});
export const changePage = (page) => ({
  type: ACTORS_ACTION_TYPES.CHANGE_PAGE,
  payload: page,
});

export const fetchActors = () => async (dispatch, getState) => {
  const {
    actorsReducer: { page },
  } = getState();
  dispatch(fetchActorsStart());

  const url = `${URL_ACTORS}${KEY}&page=${page}`;

  const response = await fetch(url);

  try {
    if (response.ok) {
      const { results, total_pages } = await response.json();

      dispatch(
        fetchActorsSuccess({ allActors: results, totalPages: total_pages })
      );
      return;
    }
  } catch (e) {
    console.error("Error: ", e);
    dispatch(fetchActorsFailed("Failed to load films!"));
  }
};

export const fetchActorAbout = (param) => async (dispatch, getState) => {
  dispatch(fetchActorsStart());

  const url = `${API_BASE}person/${param}?${KEY}`;
  const response = await fetch(url);
  try {
    if (response.ok) {
      const data = await response.json();
      dispatch(actorDescription(data));
      return;
    }
  } catch (e) {
    console.error("Error: ", e);
  }
};
export const searchActorFromQuery = (param) => async (dispatch, getState) => {
  const {
    actorsReducer: { page },
  } = getState();
  dispatch(fetchActorsStart());

  const url = `${API_BASE}search/person?${KEY}&page=${page}&query=${param}`;
  const response = await fetch(url);
  try {
    if (response.ok) {
      const { results, total_pages } = await response.json();

      dispatch(
        fetchActorsSuccess({ allActors: results, totalPages: total_pages })
      );
      return;
    }
  } catch (e) {
    console.error("Error: ", e);
  }
};
