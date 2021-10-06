import React, { useContext } from "react";
import classes from "./AnswerItem.module.scss";
import { QuizContext } from "../../../../context/quizContext";

const AnswerItem = ({ state, answer }) => {
  const cls = [classes.AnswerItem];
  if (state) {
    cls.push(classes[state]);
  }
  const { onAnswerClickHandler } = useContext(QuizContext);
  return (
    <li
      onClick={() => onAnswerClickHandler(answer.id)}
      className={cls.join(' ')}
    >
      {answer.text}
    </li>
  );
};

export default AnswerItem;
