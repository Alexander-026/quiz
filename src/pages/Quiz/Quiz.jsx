import React, { useContext, useEffect } from "react";
import classes from "./Quiz.module.scss";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import { QuizContext } from "../../context/quizContext";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

const Quiz = () => {
  const { state, onRetry } = useContext(QuizContext);

  useEffect(() => {
      console.log('okey')
  },[])
  return (
    <div className={classes.Quiz}>
      <div className={classes.Quiz__wrapper}>
        <h1>Answer all questions</h1>
        {state.isFinished ? <FinishedQuiz results={state.results} quiz={state.quiz} onRetry={onRetry}/> : <ActiveQuiz />}
      </div>
    </div>
  );
};

export default Quiz;
