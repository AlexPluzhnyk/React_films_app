import * as ACTION_TYPES from "./types";
import { FILTER_NAMES } from "./constants";

const initialFilters = {
  [FILTER_NAMES.GENRE]: [],
  [FILTER_NAMES.RATING_USERS]: {
    from: 0,
    to: 10,
  },
  [FILTER_NAMES.RELEASE_FILMS]: [null, null],
  [FILTER_NAMES.SORT_BY]: "",
  [FILTER_NAMES.PAGE]: 1,
};
const users = [
  {
    login: "admin@gmail.com",
    password: "123456789",
  },
  {
    login: "eva@gmail.com",
    password: "123456789",
  },
  {
    login: "ivan@gmail.com",
    password: "123456789",
  },
  {
    login: "lisa@gmail.com",
    password: "123456789",
  },
];

const initialState = {
  films: [],
  favoriteFilms: [],
  isLoading: false,
  errorMessage: "",
  aboutFilm: {},
  totalPages: 0,
  genres: [],
  searchWord: "",
  appliedFilters: { ...initialFilters },
  users: [...users],
};

export default function filmsReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.FETCH_FILMS_START:
      return {
        ...state,
        isLoading: true,
        errorMessage: "",
      };

    case ACTION_TYPES.FETCH_FILMS_SUCCESS:
      const { films, totalPages } = action.payload;
      return {
        ...state,
        isLoading: false,
        films,
        totalPages,
      };
    case ACTION_TYPES.FETCH_FILMS_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };
    case ACTION_TYPES.FETCH_FILM_ABOUT:
      return {
        ...state,
        aboutFilm: action.payload,
        isLoading: false,
      };
    case ACTION_TYPES.FETCH_GENRES_START:
      return {
        ...state,
        isLoading: true,
        errorMessage: "",
      };
    case ACTION_TYPES.FETCH_GENRES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        genres: action.payload,
      };
    case ACTION_TYPES.FETCH_GENRES_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };
    case ACTION_TYPES.SET_FILTER:
      const { filterName, value } = action.payload;
      return {
        ...state,
        appliedFilters: {
          ...state.appliedFilters,
          [filterName]: value,
        },
      };
    case ACTION_TYPES.RESET_FILTER:
      return {
        ...state,
        appliedFilters: initialFilters,
      };
    case ACTION_TYPES.SET_SEARCH_WORD:
      return {
        ...state,
        searchWord: action.payload,
      };
    case ACTION_TYPES.TOGGLE_FAVORITE:
      const film = action.payload;
      const isAlreadyExistInFavorite = state.favoriteFilms.find(
        ({ id }) => id === film.id
      );
      const updatedFilms = isAlreadyExistInFavorite
        ? state.favoriteFilms.filter(({ id }) => id !== film.id)
        : [...state.favoriteFilms, film];

      return {
        ...state,
        favoriteFilms: updatedFilms,
      };
    case ACTION_TYPES.REMOVE_FAVORITE_FILM:
      const filmId = action.payload;
      const favorite = state.favoriteFilms.filter(({ id }) => id !== filmId.id);
      return {
        ...state,
        favoriteFilms: favorite,
      };

    default:
      return state;
  }
}
