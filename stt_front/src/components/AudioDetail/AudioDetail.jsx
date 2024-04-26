import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import classes from "./AudioDetail.module.scss";
import { api } from "../../store/requests/api";

const AudioDetail = () => {
  const [audioData, setAudioData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchAudioData = async () => {
      try {
        const response = await axios.get(`${api}/audio/${id}`);
        setAudioData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching audio data:", error);
      }
    };

    fetchAudioData();

    return () => {
      setAudioData(null);
    };
  }, [id]);

  const handleSubtitlesRequest = async (language) => {
    try {
      const response = await axios.get(
        `${api}/audio/${id}/subtitles?language=${language}`
      );
      setAudioData((prevState) => ({
        ...prevState,
        subtitles: response.data.subtitles,
      }));
    } catch (error) {
      console.error("Error fetching subtitles:", error);
    }
  };

  if (!audioData) {
    return <div>Loading...</div>;
  }

  const { file, subtitles } = audioData;

  return (
    <div className={classes.wrap}>
      <div className={classes.left}>
        <audio src={`${api}${file}`} className={classes.leftArea} controls>
          <source type="audio/mpeg" />
        </audio>
      </div>
      <div className={classes.right}>
        <p className={classes.rText}>
          {subtitles
            ? subtitles
            : "Выберите язык, чтобы получить текст от аудио"}
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

export default AudioDetail;
