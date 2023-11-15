import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const getDetails = async () => {
    const response = await fetch(
      `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
    );
    const result = await response.json();
    setDetail(result.data.movie);
  };
  console.log(detail);

  useEffect(() => {
    getDetails();
  }, []);
  return <div>{detail.title}</div>;
}

export default Detail;
