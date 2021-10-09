import React, { useContext, useEffect} from "react";
import classes from "./Quiz.module.scss";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import { QuizContext } from "../../context/quizContext";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import { useParams } from "react-router";
import axiosQuiz from "../../components/axios/axiosQuiz";

const Quiz = () => {
  const { state, setState, onRetry } = useContext(QuizContext);
  const params = useParams()
   useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosQuiz.get(`/quizes/${params.id}.json`);
        const quiz = response.data;
        setState({
          ...state,
          quiz,
          loading: false,
        });
      } catch (e) {
        console.log(e);
      }
    }
    fetchData()

    
  }, []);
  return (
    <div className={classes.Quiz}>
      <div className={classes.Quiz__wrapper}>
        <h1>Answer all questions</h1>
        {state.loading ? (
          <Loader />
        ) : state.isFinished ? (
          <FinishedQuiz
            results={state.results}
            quiz={state.quiz}
            onRetry={onRetry}
          />
        ) : (
          <ActiveQuiz />
        )}
      </div>
    </div>
  );
};

export default Quiz;
