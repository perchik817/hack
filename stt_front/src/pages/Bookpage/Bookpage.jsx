import classes from "./Bookpage.module.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../store/requests/api.js";

const Bookpage = () => {
  const [toggle, setToggle] = useState(true);
  const [book, setBook] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios.get("http://localhost:8000/book/all/");
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching films:", error);
      }
    }

    fetchBooks();
  }, []);

  const changeHandler = (newValue) => {
    setToggle(newValue);
  };

  const [bookData, setBookData] = useState({
    title: "",
    autor: "",
    content: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setBookData({
      ...bookData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", bookData.title);
      formData.append("author", bookData.author);
      formData.append("content", bookData.content);
      formData.append("image", bookData.image);

      const response = await axios.post(
        "http://localhost:8000/book/",
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
            <li onClick={() => changeHandler(true)}>Книги</li>
            <li onClick={() => changeHandler(false)}>Загрузить свое</li>
          </ul>
        </nav>
        {toggle === true ? (
          <div className={classes.cont_left}>
            {/* <section className={classes.film}>
              <video autoPlay loop width={800} height={500}>
                <source
                  src="https://cdn.pixabay.com/video/2023/12/10/192687-893427276_large.mp4"
                  type="video/mp4"
                />
              </video>
              <div>
                <h4>Керемет коч</h4>
                <p>
                  В этом году широко известному мультфильму «Керемет коч»
                  (Волшебное путешествие) исполняется 10 лет.
                </p>
                <button>
                  <Link to={"/videodetail/1"}>Подробнее</Link>
                </button>
              </div>
            </section> */}
            <section className={classes.film_card}>
              {book.map((item) => (
                <article key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <aside>
                    <h5>{item.title}</h5>
                    <Link to={`/bookdetail/${item.id}`}>Подробнее</Link>
                  </aside>
                </article>
              ))}
            </section>
          </div>
        ) : (
          <div className={classes.wrap}>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Title of book"
                value={bookData.title}
                onChange={handleChange}
                style={{
                  width: "60%",
                }}
              />
              <input
                type="text"
                style={{
                  width: "60%",
                }}
                name="author"
                placeholder="Author"
                value={bookData.author}
                onChange={handleChange}
              />
              <textarea
                name="content"
                style={{
                  width: "60%",
                  height: "200px",
                }}
                placeholder="Content"
                value={bookData.content}
                onChange={handleChange}
              />
              <input
                type="file"
                name="image"
                accept="image/*"
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

export default Bookpage;
