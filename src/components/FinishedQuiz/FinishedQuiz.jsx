import React from "react";
import { Link } from "react-router-dom";
import Button from "../UI/Button/Button";
import classes from "./FinishedQuiz.module.scss";

const FinishedQuiz = ({ results, quiz, onRetry }) => {
  const successCount = Object.keys(results).reduce((total, key) => {
    if (results[key] === "success") {
      total++;
    }
    return total;
  }, 0);

  return (
    <div className={classes.FinishedQuiz}>
      <ul className={classes.FinishedQuiz__list}>
        {quiz.map((quizItem, index) => {
          const cls = [
            "fa",
            results[quizItem.id] === "error" ? "fa-times" : "fa-check",
            classes[results[quizItem.id]],
          ];
          return (
            <li key={index}>
              <strong>{index + 1}.</strong>
              {quizItem.question}
              <i className={cls.join(" ")}></i>
            </li>
          );
        })}
      </ul>
      <p>
        Right {successCount} of {quiz.length}
      </p>
      <Button onClick={() => onRetry()} type={"primary"}>
        Repeat
      </Button>
      <Link to='/'>
        <Button type={"success"}>test list</Button>
      </Link>
    </div>
  );
};

export default FinishedQuiz;
