import classes from "./Audiopage.module.scss";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../store/requests/api.js";

const Audiopage = () => {
  const [toggle, setToggle] = useState(true);
  const [audio, setAudio] = useState([]);

  useEffect(() => {
    async function fetchFilms() {
      try {
        const response = await axios.get("http://localhost:8000/audio/");
        setAudio(response.data);
      } catch (error) {
        console.error("Error fetching films:", error);
      }
    }
    
    fetchFilms();
  }, []);
  console.log(audio);
  const changeHandler = (newValue) => {
    setToggle(newValue);
  };

  const [audioData, setAudioData] = useState({
    title: "",
    audio: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setAudioData({
      ...audioData,
      [name]: files ? files[0] : value, // Если это файл, сохраняем объект файла, иначе сохраняем значение
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("asdasd");
    try {
      const formData = new FormData();
      formData.append("title", audioData.title);
      formData.append("file", audioData.audio);

      const response = await axios.post(
        "http://localhost:8000/audio/",
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error adding film:", error);
    }
  };

  return (
    <div className={classes.Audiopage}>
      <div className={classes.cont}>
        <nav>
          <ul>
            <li onClick={() => changeHandler(true)}>Аудио</li>
            <li onClick={() => changeHandler(false)}>Загрузить свое</li>
          </ul>
        </nav>
        {toggle === true ? (
          <div className={classes.cont_left}>
            {/*<section className={classes.film}>*/}
            {/*    <video autoPlay loop width={800} height={500}>*/}
            {/*        <source src="https://cdn.pixabay.com/video/2023/12/10/192687-893427276_large.mp4"*/}
            {/*                type="video/mp4"/>*/}
            {/*    </video>*/}
            {/*    <div>*/}
            {/*        <h4>Керемет коч</h4>*/}
            {/*        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, qui?</p>*/}
            {/*        <button>*/}
            {/*            <Link to={"/audiodetail/1"}>button</Link>*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*</section>*/}

            <section className={classes.film_card}>
              {audio.map((item) => (
                <article key={item.id}>
                  <img
                    src="https://img.freepik.com/free-vector/colorful-wavy-background_23-2148497772.jpg"
                    alt={item.name}
                  />
                  <aside>
                    <h5>{item.title}</h5>
                    <Link to={`/audiodetail/${item.id}`}>Подробнее</Link>
                  </aside>
                </article>
              ))}
            </section>
          </div>
        ) : (
          <div className={classes.wrap}>
            <form onSubmit={handleSubmit} className={classes.content}>
              <input
                type="text"
                name="title" // Обновленное имя поля ввода
                placeholder="Название аудиофайла"
                value={audioData.title} // Используем audioData.title вместо audioData.name
                onChange={handleChange}
              />

              <input
                type="file"
                name="audio" // Обновленное имя поля ввода
                accept="audio/mp3"
                onChange={handleChange}
              />
              <button type="submit">Отправить</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Audiopage;
