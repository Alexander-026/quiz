import React, { useEffect, useState } from "react";
import classes from "./QuizList.module.scss";
import { NavLink } from "react-router-dom";
import axios from "../../components/axios/axiosQuiz";
import Loader from "../../components/UI/Loader/Loader";

const QuizLists = () => {
  const [state, setState] = useState({
    quizes: [],
    loading: true,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/quizes.json");
        let quizes = [];
        Object.keys(response.data).forEach((key, index) => {
          quizes.push({
            id: key,
            name: `Test N ${index + 1}`,
          });
        });
        setState({
          quizes,
          loading: false,
        });
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
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
