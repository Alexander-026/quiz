import React, {useContext, useEffect } from "react";
import classes from "./Quiz.module.scss";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import { QuizContext } from "../../context/quizContext";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import { useParams } from "react-router";

const Quiz = () => {
  const { state, onRetry, fetQuizByID } = useContext(QuizContext);
  const params = useParams();
  useEffect(() => {
    setTimeout(() => {
      fetQuizByID(params.id);
    }, 100)
    
  }, []);
  
  return (
    <div className={classes.Quiz}>
      <div className={classes.Quiz__wrapper}>
        <h1>Answer all questions</h1>
        {state.loading || !state.quiz ? (
          <Loader />
        ) : state.isFinished  ? (
          <FinishedQuiz
            results={state.results}
            quiz={state.quiz}
            onRetry={onRetry}
          />
        ) : (
          <ActiveQuiz state={state} />
        )}
      </div>
    </div>
  );
};

export default Quiz;
