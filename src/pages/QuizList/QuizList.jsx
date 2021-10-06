import React from "react";
import classes from "./QuizList.module.scss";
import { NavLink } from "react-router-dom";

const QuizLists = () => {
  const renderQuiz = () => {
    return [1, 2, 3].map((quiz, index) => {
      return (
        <li key={index}>
          <NavLink to={"/quiz/" + quiz}>Test {quiz}</NavLink>
        </li>
      );
    });
  };

  return (
    <div className={classes.QuizList}>
      <div>
        <h1>Quiz List</h1>
        <ul>{renderQuiz()}</ul>
      </div>
    </div>
  );
};

export default QuizLists;
