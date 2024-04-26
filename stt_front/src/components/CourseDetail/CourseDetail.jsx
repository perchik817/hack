import classes from "./CourseDetail.module.scss";
import { useParams } from "react-router-dom";
import { api } from "../../store/requests/api.js";
import { useEffect, useState } from "react";
import axios from "axios";

function CourseDetail() {
  const { id } = useParams();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get(`${api}/lesson/grammar/${id}/`).then((response) => {
      setCourses(response.data);
    });
  }, []);

  const [reading, setReading] = useState([]);
  useEffect(() => {
    axios.get(`${api}/lesson/reading/${id}/`).then((response) => {
      setReading(response.data);
    });
  }, []);

  const [selectedAnswers, setSelectedAnswers] = useState({});
  console.log(selectedAnswers);

  const handleAnswerChange = (questionId, selectedOptionId) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [questionId]: selectedOptionId,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const jsonData = JSON.stringify(answerData.answers);

      const response = await axios.post(`${api}/lesson/reading/${id}/test/`, {
        answers: { 1: 3, 2: 6, 3: 9 },
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error adding film:", error);
    }
  };

  const [speaking, setSpeaking] = useState([]);
  useEffect(() => {
    try {
      axios.get(`${api}/lesson/speaking/${id}/`).then((response) => {
        setSpeaking(response.data);
      });
    } catch (error) {
      console.error("Error adding film:", error);
    }
  }, []);

  const [audioUrl, setAudioUrl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/lesson/listening/5/audio`);
        const base64Data = response.data.audio_data; // Assuming this is the base64 audio data
        const binaryData = atob(base64Data);
        const blob = new Blob([binaryData], { type: "audio/mpeg" }); // Adjust the MIME type if necessary
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      } catch (error) {
        console.error("Error fetching listening lesson:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className={classes.CourseDetail}>
      <div className={classes.CourseDetail__wallpaper}>
        <img
          src="https://wallpaper.dog/large/5439940.jpg"
          alt="wallpaper"
          className={classes.CourseDetail__img}
        />
      </div>
      <div className={classes.CourseDetail__content}>
        <h2 className={classes.CourseDetail__title}>{courses.title}</h2>
        <p className={classes.CourseDetail__text}>{courses.content}</p>

        {reading.questions &&
          reading.questions.map((question, index) => (
            <div key={index}>
              <h3>{question.text}</h3>
              {question.options.map((option) => (
                <ul className={classes.answers} key={option.id}>
                  <li
                    className={classes.answer}
                    style={{
                      border: "1px solid white",
                      padding: "10px 20px",
                      margin: "20px 0",
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                    }}
                  >
                    <p>{option.id}</p>
                    <button
                      className={classes.variant}
                      onClick={() => {
                        console.log(option.id);
                        handleAnswerChange(question.id, option.id);
                      }}
                      style={{ padding: "10px 20px" }}
                    >
                      {option.text}
                    </button>
                  </li>
                </ul>
              ))}
            </div>
          ))}

        <button
          onClick={handleSubmit}
          style={{ padding: "10px 20px", width: "200px", margin: "20px 0" }}
        >
          Отправить
        </button>

        <div className={classes.test}>
          <h3 className={classes.test__title}>Разговорный</h3>
          <ul className={classes.test__questions}>
            <li>{speaking.text}</li>
          </ul>
          <div className={classes.test__end}>
            {audioUrl && (
              <audio controls>
                <source src={audioUrl} type="audio/mpeg" />
                Your browser does not support the audio tag.
              </audio>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
