import React, {useContext} from "react";
import classes from "./ActiveQuiz.module.scss";
import AnswersList from "./AnswersList/AnswersList";
import {QuizContext} from '../../containers/context/quizContext'

const ActiveQuiz = () => {
  const {state} = useContext(QuizContext)
  const question = state.quiz[state.activeQuestion].question
  const quizLength = state.quiz.length
  const answerNumber = state.activeQuestion + 1

  return (
    <div className={classes.ActiveQuiz}>
      <p className={classes.Question}>
        <span>
          <strong>{answerNumber}.</strong>&nbsp;
          {question}
        </span>
        <small>{answerNumber} of {quizLength}</small>
      </p>
      <AnswersList />
    </div>
  );
};

export default ActiveQuiz;
