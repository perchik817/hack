import React, { useState } from "react";
import axios from "axios";
import cl from "./FilmModal.module.scss";

function FilmModal(props) {
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

    try {
      const formData = new FormData();
      formData.append("title", filmData.name);
      formData.append("image", filmData.photo);
      formData.append("file", filmData.video);

      const response = await axios.post(
        "http://localhost:8000/movies/",
        formData
      );
      console.log("Film added successfully:", response.data);
      props.setIsModalActive(false);
      // Дополнительная логика после успешного добавления фильма, например, закрытие модального окна
    } catch (error) {
      console.error("Error adding film:", error);
      // Обработка ошибки при добавлении фильма
    }
  };

  return (
    <div
      className={cl.wrap}
      style={{
        display: props.isModalActive ? "flex" : "none",
      }}
    >
      <form onSubmit={handleSubmit} className={cl.content}>
        <input
          type="text"
          name="name"
          placeholder="Name of film"
          value={filmData.name}
          onChange={handleChange}
        />
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
        <button type="submit">Submit</button>

        <p
          className={cl.close}
          onClick={() => {
            props.setIsModalActive(!props.isModalActive);
          }}
        >
          X
        </p>
      </form>
    </div>
  );
}

export default FilmModal;
