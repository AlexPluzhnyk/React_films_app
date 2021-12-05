import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Chip from "../_shared/chip/Chip";
import { DateRangeSelect } from "../_shared/dateRangeSelect/DateRangeSelect";
import ScoreLine from "../_shared/scoreLine/ScoreLine";
import ButtonCustom from "../_shared/button/Button";
import { fetchGenres, resetFilter, setFilter } from "../../store/films/actions";
import { fetchFilms } from "../../store/films/actions";
import { FILTER_NAMES } from "../../store/films/constants";
import BasicSelect from "../_shared/basicSelect/BasicSelect";

import "./style.scss";

const SideBar = () => {
  const dispatch = useDispatch();
  const { genres, appliedFilters } = useSelector(
    ({ filmsReducer: { genres, appliedFilters } }) => ({
      genres,
      appliedFilters,
    })
  );

  const enterFilter = () => {
    dispatch(fetchFilms());
  };
  const clearFilters = () => {
    dispatch(resetFilter());
  };

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  const toggleGenres = (id) => {
    const appliedGenres = appliedFilters[FILTER_NAMES.GENRE];

    if (appliedGenres.includes(id)) {
      const updatedAppliedFilters = appliedGenres.filter(
        (genreId) => genreId !== id
      );
      dispatch(setFilter(FILTER_NAMES.GENRE, updatedAppliedFilters));
      return;
    }
    dispatch(setFilter(FILTER_NAMES.GENRE, [...appliedGenres, id]));
  };

  const renderGenresChips = () => (
    <div className="form">
      <div className="form__wrapper">
        <h4 className="form__title">Select genres</h4>
        <div className="form__genres">
          {genres.map((item) => (
            <Chip
              onClick={toggleGenres}
              key={item.id}
              id={item.id}
              label={item.name}
              activeGenre={appliedFilters[FILTER_NAMES.GENRE].includes(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const handlerDate = (newValue) => {
    const [from, to] = newValue;
    const date = [null, null];

    if (from) {
      const [formISOFormat] = from.toISOString().split("T");
      date[0] = formISOFormat;
    }
    if (to) {
      const [toISOFormat] = to.toISOString().split("T");
      date[1] = toISOFormat;
    }
    dispatch(setFilter(FILTER_NAMES.RELEASE_FILMS, date));
  };

  const renderDateSelect = () => {
    const value = appliedFilters[FILTER_NAMES.RELEASE_FILMS];
    return (
      <div className="form">
        <div className="form__wrapper">
          <h4 className="form__title">Release dates</h4>
          <DateRangeSelect value={value} handlerDate={handlerDate} />
        </div>
      </div>
    );
  };

  const handleRatingChange = ([from, to]) => {
    dispatch(setFilter(FILTER_NAMES.RATING_USERS, { from, to }));
  };

  const renderUserRating = () => {
    const { from, to } = appliedFilters[FILTER_NAMES.RATING_USERS];

    return (
      <div className="form">
        <div className="form__wrapper">
          <h4 className="form__title">User rating</h4>
          <ScoreLine from={from} to={to} handleChange={handleRatingChange} />
        </div>
      </div>
    );
  };
  const handleSortBy = ({ target: { value } }) => {
    dispatch(setFilter(FILTER_NAMES.SORT_BY, value));
  };

  const renderFilterBy = () => {
    const value = appliedFilters[FILTER_NAMES.SORT_BY];

    return (
      <div className="form">
        <div className="form__wrapper">
          <h4 className="form__title">Sort by</h4>
          <BasicSelect value={value} handleChange={handleSortBy} />
        </div>
      </div>
    );
  };

  return (
    <div className="side-bar">
      {renderGenresChips()}
      {renderDateSelect()}
      {renderUserRating()}
      {renderFilterBy()}

      <div className="buttons-wrapper">
        <ButtonCustom onClick={enterFilter} name={"Apply filter"} />
        <ButtonCustom onClick={clearFilters} name={"Clear filter"} />
      </div>
    </div>
  );
};

export default SideBar;
