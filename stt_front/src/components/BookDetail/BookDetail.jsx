import  { useEffect, useState } from "react";
import cl from "./BookDetail.module.scss";
import trans from "../../assets/transfer.png";
import axios from "axios";
import { useParams } from "react-router-dom";
import {api} from "../../store/requests/api.js";

function BookDetail() {
  const [bookData, setBookData] = useState(null);
  const [bookData2, setBookData2] = useState(null);
  const { id } = useParams(); // Получение id книги из URL

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/book/${id}/translate/`
        );
        setBookData(response.data);
        setBookData2(response.data); // Сохранение полученных данных о книге
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    fetchBookData();

    return () => {
      setBookData(null);
    };
  }, [id]);

  const fetchTranslation = async (language) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/book/${id}/translate?language=${language}`
      );
      setBookData2(response.data); // Обновление данных перевода книги
    } catch (error) {
      console.error("Error fetching translation:", error);
    }
  };

  if (!bookData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={cl.wrap}>
      <div className={cl.right}>
        <p className={cl.rText}>{bookData.content}</p>
        <div className={cl.rbtns}>
          <div className={cl.rsmall} onClick={() => fetchTranslation("kg")}>
            <p>Кыргызский</p>
          </div>
        </div>
      </div>

      <img src={trans} alt="photo" className={cl.trans} />

      <div className={cl.right}>
        <p className={cl.rText}>{bookData2.content}</p>
        <div className={cl.rbtns}>
          <div className={cl.rsmall} onClick={() => fetchTranslation("ru")}>
            <p>Русский</p>
          </div>
          <div className={cl.rsmall} onClick={() => fetchTranslation("en")}>
            <p>Английский</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
