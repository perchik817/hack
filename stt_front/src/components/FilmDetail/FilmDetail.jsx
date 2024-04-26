import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import classes from "./FilmDetail.module.scss";
import { api } from "../../store/requests/api.js";

const FilmDetail = () => {
  const [filmData, setFilmData] = useState(null);
  const { id } = useParams(); // Получение id фильма из URL

  useEffect(() => {
    const fetchFilmData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/movies/${id}`
        );
        setFilmData(response.data); // Сохранение полученных данных о фильме
        console.log(response);
      } catch (error) {
        console.error("Error fetching film data:", error);
      }
    };

    fetchFilmData();

    return () => {
      setFilmData(null);
    };
  }, [id]);

  if (!filmData) {
    return <div>Loading...</div>;
  }

  const { file, subtitles } = filmData;

  const handleSubtitlesRequest = async (language) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/movies/${id}/subtitles?language=${language}`
      );
      setFilmData(response.data); // Сохранение полученных субтитров
    } catch (error) {
      console.error("Error fetching subtitles:", error);
    }
  };

  return (
    <div className={classes.wrap}>
      <div className={classes.left}>
        <video className={classes.leftArea} controls>
          <source src={file} allowFullScreen type="video/mp4" />
        </video>
        {/* <Link to="#">
          <div className={classes.btn}>
            <p className={classes.btnText}>Включить субтитры</p>
          </div>
        </Link> */}
      </div>
      <div className={classes.right}>
        <p className={classes.rText}>
          {subtitles
            ? subtitles
            : "Включите субтитры, чтобы получить текст с видео"}
        </p>
        <div className={classes.rbtns}>
          <div
            className={classes.rsmall}
            onClick={() => handleSubtitlesRequest("kg")}
          >
            <p>Кыргызский</p>
          </div>
          <div
            className={classes.rsmall}
            onClick={() => handleSubtitlesRequest("ru")}
          >
            <p>Русский</p>
          </div>
          <div
            className={classes.rsmall}
            onClick={() => handleSubtitlesRequest("en")}
          >
            <p>Английский</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmDetail;
