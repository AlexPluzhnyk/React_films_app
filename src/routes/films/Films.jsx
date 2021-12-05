import React from "react";
import { useSelector, useDispatch } from "react-redux";

import FilmList from "../../components/FilmList/FilmList";
import SideBar from "../../components/SideBar/SideBar";
import Search from "../../components/_shared/search/Search";

import { fetchFilms, setSearchWord } from "../../store/films/actions";

import "./styles.scss";

const Films = () => {
  const dispatch = useDispatch();
  const { searchWord } = useSelector(({ filmsReducer: { searchWord } }) => ({
    searchWord,
  }));

  const handleSearchChange = (value) => {
    dispatch(setSearchWord(value));
  };

  const onSearch = () => {
    dispatch(fetchFilms(true));
  };

  return (
    <div className="films">
      <Search value={searchWord} handleChange={handleSearchChange} onSearch={onSearch}/>
      <section className="page-content">
        <div className="side-bar-wrapper">
          <SideBar />
        </div>
        <div className="film-list-wrapper">
          <FilmList />
        </div>
      </section>
    </div>
  )
};

export default Films;
