import React from "react";
import AnswerItem from "./AnswerItem/AnswerItem";
import classes from "./AnswersList.module.scss";

const AnswersList = ({state}) => {
  const quiz = state.quiz[state.activeQuestion];
  return (
    <ul className={classes.AnswersList}>
      {quiz.answers.map((answer, index) => {
        return (
          <AnswerItem
            key={index}
            state={state.answerState ? state.answerState[answer.id] : null}
            answer={answer}
          />
        );
      })}
    </ul>
  );
};

export default AnswersList;
