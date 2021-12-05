import * as ACTION_TYPES from "./types";

const initialState = {
  allActors: [],
  actorDescription: {},
  isLoading: false,
  page: 1,
  totalPages: 500,
  queryWord: "",
};

export default function actorsReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.FETCH_ACTORS_START:
      return { ...state, isLoading: true, errorMessage: "" };

    case ACTION_TYPES.FETCH_ACTORS_SUCCESS:
      const { allActors, totalPages } = action.payload;
      return {
        ...state,
        isLoading: false,
        allActors,
        totalPages,
      };
    case ACTION_TYPES.FETCH_ACTORS_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };
    case ACTION_TYPES.GET_ACTOR_DESCRIPTION:
      return {
        ...state,
        isLoading: false,
        actorDescription: action.payload,
      };
    case ACTION_TYPES.SET_QUERY_WORD:
      return {
        ...state,
        queryWord: action.payload,
      };
    case ACTION_TYPES.CHANGE_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    default:
      return state;
  }
}
