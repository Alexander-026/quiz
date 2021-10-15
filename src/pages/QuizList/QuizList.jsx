import React, { useEffect, useContext } from "react";
import classes from "./QuizList.module.scss";
import { NavLink } from "react-router-dom";
import {QuizContext} from '../../context/quizContext';

import Loader from "../../components/UI/Loader/Loader";

const QuizLists = () => {

  const {state, fetchQuizes} = useContext(QuizContext)
  

  useEffect(() => {
    fetchQuizes()
  }, []);

  const renderQuiz = () => {
    return state.quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={"/quiz/" + quiz.id}>{quiz.name}</NavLink>
        </li>
      );
    });
  };

  return (
    <div className={classes.QuizList}>
      <div>
        <h1>Quiz List</h1>
        {state.loading ? <Loader /> : <ul>{renderQuiz()}</ul>}
      </div>
    </div>
  );
};

export default QuizLists;
