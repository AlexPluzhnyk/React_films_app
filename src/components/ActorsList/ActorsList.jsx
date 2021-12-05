import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { IMAGE_PATH } from "../../constants/constants";
import { fetchActors } from "../../store/actors/action";
import { CardActor } from "../_shared/cardActor/CardActor";
import Search from "../_shared/search/Search";
import Pagination from "../_shared/pagination/Pagination";
import {
  setQueryWord,
  searchActorFromQuery,
  changePage,
} from "../../store/actors/action.js";

import "./style.scss";

const ActorsList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchActors());
  }, [dispatch]);

  const { allActors, queryWord, totalPages, page } = useSelector(
    ({ actorsReducer: { allActors, queryWord, totalPages, page } }) => ({
      allActors,
      queryWord,
      totalPages,
      page,
    })
  );
  const renderCardActor = () => {
    return allActors.map(({ name, profile_path, id }) => {
      return (
        <CardActor
          key={id}
          name={name}
          posterLink={profile_path}
          pathImg={IMAGE_PATH}
          id={id}
        />
      );
    });
  };
  const handleSearchChange = (value) => {
    dispatch(setQueryWord(value));
  };

  const handleSearch = () => {
    if (queryWord) {
      dispatch(searchActorFromQuery(queryWord));
      return;
    }
    dispatch(changePage(1));
    dispatch(fetchActors());
  };

  const handleChangePage = (page) => {
    dispatch(changePage(page));
    if (queryWord) {
      dispatch(searchActorFromQuery(queryWord));
      return;
    }
    dispatch(fetchActors());
  };
  const renderNotFound = () => {
    return (
      <div className="NotFound">
        <h1>Not found</h1>
      </div>
    );
  };
  const renderPagination = () => {
    return (
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        handleChange={handleChangePage}
      />
    );
  };

  return (
    <section>
      <Search
        handleChange={handleSearchChange}
        value={queryWord}
        onSearch={handleSearch}
      />
      <div className="list-wrapper">
        {allActors.length > 0 ? renderCardActor() : renderNotFound()}
      </div>
      {totalPages > 1 && renderPagination()}
    </section>
  );
};

export default ActorsList;
