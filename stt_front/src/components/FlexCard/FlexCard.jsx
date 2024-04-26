import React, { useState, useEffect } from "react";
import cl from "./FlexCard.module.scss";
import { Link } from "react-router-dom";

const FlexCard = (props) => {
  const [state, setState] = useState(0);

  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/bookpage") {
      setState(3);
    } else if (path === "/audiopage") {
      setState(2);
    } else if (path === "/videopage") {
      setState(1);
    } else {
      setState(0);
    }
  }, []);

  const handleClick = () => {
    props.setIsModalActive(!props.isModalActive);
  };

  return (
    <>
      <div
        className={cl.wrap}
        style={{
          display: state !== 0 ? "flex" : "none", // Изменено условие для отображения компонента
        }}
      >
        <Link to="#">
          <div
            className={cl.btnModal}
            style={{
              boxShadow:
                state === 1
                  ? "0px 0px 20px 2px #21FF87"
                  : state === 2
                    ? "0px 0px 20px 2px #FF5F5F"
                    : "0px 0px 20px 2px #D9B32D",
            }}
            onClick={handleClick}
          >
            <p
              className={cl.btnText}
              style={{
                color:
                  state === 1 ? "#21FF87" : state === 2 ? "#FF5F5F" : "#D9B32D",
              }}
            >
              Загрузить
              {state === 1 ? " видео" : state === 2 ? " аудио" : " книгу"}
            </p>
          </div>
        </Link>
        <p className={cl.rightText}>
          Загрузите своё
          {state === 1 ? " видео" : state === 2 ? " аудио" : " книгу"}, и
          получите
          {state === 1 || state === 2 ? " текст" : " озвучку"}
        </p>
      </div>
    </>
  );
};
export default FlexCard;
