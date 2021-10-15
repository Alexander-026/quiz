import React from "react";
import classes from "./ActiveQuiz.module.scss";
import AnswersList from "./AnswersList/AnswersList";

const ActiveQuiz = ({state}) => {
  const question = state.quiz[state.activeQuestion].question;
  const quizLength = state.quiz.length;
  const answerNumber = state.activeQuestion + 1;

  return (
    <div className={classes.ActiveQuiz}>
      <p className={classes.Question}>
        <span>
          <strong>{answerNumber}.</strong>&nbsp;
          {question}
        </span>
        <small>
          {answerNumber} of {quizLength}
        </small>
      </p>
      <AnswersList state={state} />
    </div>
  );
};

export default ActiveQuiz;
