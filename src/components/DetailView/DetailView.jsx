import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import { Rating } from "@mui/material";

import { fetchFilmAbout } from "../../store/films/actions";
import notImage from "../../images/placeholder.png";

const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
const BG_PATH = "https://image.tmdb.org/t/p/original/";

const DetailView = () => {
  const dispatch = useDispatch();
  const { filmId } = useParams();
  const { aboutFilm } = useSelector(
    ({ filmsReducer: { aboutFilm, isLoading } }) => ({
      aboutFilm,
      isLoading,
    })
  );

  useEffect(() => {
    dispatch(fetchFilmAbout(filmId));
  }, [dispatch, filmId]);

  const {
    title,
    backdrop_path,
    release_date,
    runtime,
    genres,
    poster_path,
    overview,
    vote_average,
    production_countries,
    popularity,
  } = aboutFilm;

  const spawnCountries = () => {
    if (production_countries) {
      return production_countries
        .map((item) => {
          return item.name;
        })
        .join(", ");
    }
  };

  const bgPoster = {
    backgroundImage: `url(${BG_PATH}${backdrop_path})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  const spawnGenre = () => {
    if (genres) {
      return genres
        .map((item) => {
          return item.name;
        })
        .join(", ");
    }
  };

  return (
    <div style={bgPoster}>
      <div className="about-content">
        <img
          className="poster"
          src={poster_path ? `${IMAGE_PATH}${poster_path}` : notImage}
          alt="poster"
        />
        <div className="description-wrapper">
          <section className="description">
            <div className="film-title-wrapper">
              <h2 className="film-title">{title}</h2>
              <div className="film-facts">
                <span className="description-title">Film genre:</span>
                {spawnGenre()}
                <div className="description-title">
                  Release date: {release_date}
                </div>
                <div className="description-title">
                  Run time: {runtime} mins
                </div>
                <div className="description-title">
                  Production countries: {spawnCountries()}
                </div>
                <div className="description-title">
                  Popularity: {popularity}
                </div>
              </div>
            </div>
            <div>
              <span className="description-title">User score:</span>
              <Rating
                max={10}
                value={vote_average}
                name="read-only"
                readOnly
                precision={0.5}
                size="large"
              />
            </div>
            <div className="overview">
              <div className="description-title">Overview:</div>
              <p>{overview}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DetailView;
