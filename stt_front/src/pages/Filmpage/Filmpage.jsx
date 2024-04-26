import classes from "./Filmpage.module.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../store/requests/api.js";

const Filmpage = () => {
  const [toggle, setToggle] = useState(true);
  const [films, setFilms] = useState([]);

  useEffect(() => {
    async function fetchFilms() {
      try {
        const response = await axios.get("http://localhost:8000/movies/");
        setFilms(response.data);
      } catch (error) {
        console.error("Error fetching films:", error);
      }
    }

    fetchFilms();
  }, []);
  console.log(films);
  const changeHandler = (newValue) => {
    setToggle(newValue);
  };

  const [filmData, setFilmData] = useState({
    name: "",
    photo: null,
    video: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFilmData({
      ...filmData,
      [name]: files ? files[0] : value, // Если это файл, сохраняем объект файла, иначе сохраняем значение
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("asdasd");
    try {
      const formData = new FormData();
      formData.append("title", filmData.name);
      formData.append("image", filmData.photo);
      formData.append("file", filmData.video);

      const response = await axios.post(
        "http://localhost:8000/movies/",
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error adding film:", error);
    }
  };

  return (
    <div className={classes.Filmpage}>
      <div className={classes.cont}>
        <nav>
          <ul>
            <li onClick={() => changeHandler(true)}>Видео</li>
            <li onClick={() => changeHandler(false)}>Загрузить свое</li>
          </ul>
        </nav>
        {toggle === true ? (
          <div className={classes.cont_left}>
            <section className={classes.film}>
              <video autoPlay loop width={800} height={500}>
                <source
                  src="https://cdn.pixabay.com/video/2023/12/10/192687-893427276_large.mp4"
                  type="video/mp4"
                />
              </video>
              <div>
                <h4>Керемет көч</h4>
                <p>
                  В этом году широко известному мультфильму «Керемет коч»
                  (Волшебное путешествие) исполняется 10 лет.
                </p>
                <button>
                  <Link to={"/videodetail/1"}>Подробнее</Link>
                </button>
              </div>
            </section>

            <section className={classes.film_card}>
              {films.map((item) => (
                <article key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <aside>
                    <h5>{item.title}</h5>
                    <Link to={`/videodetail/${item.id}`}>Подробнее</Link>
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
                name="name"
                placeholder="Name of film"
                value={filmData.name}
                onChange={handleChange}
              />
              <div>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleChange}
                />
                <input
                  type="file"
                  name="video"
                  accept="video/mp4"
                  onChange={handleChange}
                />
              </div>
              <button type="submit">Отправить</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filmpage;
