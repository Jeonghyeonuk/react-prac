import React from "react";
import PropTyeps from "prop-types";
import { Link } from "react-router-dom";

function Movie({ id, coverImg, title, summary, genres }) {
  return (
    <div>
      <img src={coverImg} alt="커버이미지" />
      <Link to={`movie/${id}`}>{title}</Link>
      <div>{summary}</div>
      <ul>
        {genres.map((g, index) => (
          <li key={index}>{g}</li>
        ))}
      </ul>
    </div>
  );
}

Movie.PropTyeps = {
  id: PropTyeps.string.isRequired,
  coverImg: PropTyeps.string.isRequired,
  title: PropTyeps.string.isRequired,
  summary: PropTyeps.string.isRequired,
  genres: PropTyeps.arrayOf(PropTyeps.string).isRequired,
};

export default Movie;
