import React from "react";
import css from "./HomePage.module.css";
import gif from "../../gif/homegif.gif";

const HomePage = () => {
  return (
    <div className={css.homeContainer}>
      <h1 className={css.heading}>Welcome to contacts manager!</h1>

      <img src={gif} alt="GIF" className={css.gifImg} />
    </div>
  );
};

export default HomePage;
