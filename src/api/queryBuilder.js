import { API_BASE, KEY, SEARCH_API } from "./paths";
import { FILTER_NAMES } from "../store/films/constants";

const filtersParser = {
  [FILTER_NAMES.GENRE]: (value) => {
    if (value.length) {
      return `${FILTER_NAMES.GENRE}=${value}`;
    }
  },
  [FILTER_NAMES.RATING_USERS]: (value) => {
    if (value) {
      return `${FILTER_NAMES.RATING_FROM}=${value.from}&${FILTER_NAMES.RATING_TO}=${value.to}`;
    }
  },
  [FILTER_NAMES.RELEASE_FILMS]: (value) => {
    const [from, to] = value;

    if (from && to) {
      return `${FILTER_NAMES.RELEASE_FROM}=${from}&${FILTER_NAMES.RELEASE_TO}=${to}`;
    }
  },
  [FILTER_NAMES.PAGE]: (value) => {
    if (value) {
      return `${FILTER_NAMES.PAGE}=${value}`;
    }
  },
  [FILTER_NAMES.SORT_BY]: (value) => {
    if (value) {
      return `${FILTER_NAMES.SORT_BY}=${value}`;
    }
  },
};

const getSearchQuery = (searchWord, page) => {
  const SEARCH_URL = `${SEARCH_API}${KEY}&query=${searchWord}`;
  const PAGE_PARAM = filtersParser[FILTER_NAMES.PAGE](page);

  return `${SEARCH_URL}&${PAGE_PARAM}`;
};

const getFilterQuery = (filters) => {
  let query = API_BASE + `discover/movie?${KEY}`;

  const filterList = Object.entries(filters);

  filterList.forEach(([key, value]) => {
    const parsedParam = filtersParser[key](value);

    if (parsedParam) {
      query = `${query}&${parsedParam}`;
    }
  });

  return query;
};

const queryBuilder = (filters, searchWord) => {
  const query = searchWord
    ? getSearchQuery(searchWord, filters[FILTER_NAMES.PAGE])
    : getFilterQuery(filters);

  return query;
};

export default queryBuilder;
