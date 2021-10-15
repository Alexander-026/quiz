import axiosQuiz from "../components/axios/axiosQuiz";
import React, { useReducer } from "react";
import { QuizReducer } from "./quizReducer";
import {
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZ_SUCCESS,
  NEXT_QUIZ,
  ON_RETRY,
  QUIZ_FINISHED,
  RIGHT_ANSWER,
  WRONG_ANSWER,
  CREATE_QUIZ_QUESTION,
  RESET_QUIZ_CREATION
} from "./quizTypes";
import { QuizContext } from "./quizContext";

const QuizState = ({ children }) => {
  const initialState = {
    quizes: [],
    loading: true,
    error: null,
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: null,
  };

  const [state, dispatch] = useReducer(QuizReducer, initialState);

  

  const fetchQuizes = async () => {
    dispatch(fetchQuizesStart());
    try {
      const response = await axiosQuiz.get("/quizes.json");

      let quizes = [];
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Test N ${index + 1}`,
        });
      });
      dispatch(fetchQuizesSuccess(quizes));
    } catch (error) {
      dispatch(fetchQuizesError(error));
    }
  };

  const fetQuizByID = async (id) => {
    dispatch(fetchQuizesStart());
    try {
      const response = await axiosQuiz.get(`/quizes/${id}.json`);
      const quiz = response.data;
      dispatch(fetchQuizSuccess(quiz));
    } catch (error) {
      dispatch(fetchQuizesError(error));
    }
  };

  const fetchQuizesStart = () => ({
    type: FETCH_QUIZES_START,
  });
  const fetchQuizesSuccess = (quizes) => {
    return {
      type: FETCH_QUIZES_SUCCESS,
      quizes,
    };
  };
  const fetchQuizSuccess = (quiz) => {
    return {
      type: FETCH_QUIZ_SUCCESS,
      quiz,
    };
  };
  const fetchQuizesError = (error) => ({
    type: FETCH_QUIZES_ERROR,
    error,
  });

  const quizAnswerClick = (answerId) => {
    const question = state.quiz[state.activeQuestion];
    const results = state.results;
    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = "success";
      }
      dispatch({
        type: RIGHT_ANSWER,
        answerState: { [answerId]: "success" },
        results,
      });
      const timeout = window.setTimeout(() => {
        if (isQuizFinished()) {
          dispatch({
            type: QUIZ_FINISHED,
          });
        } else {
          dispatch({
            type: NEXT_QUIZ,
            activeQuestion: state.activeQuestion + 1,
          });
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = "error";
      dispatch({
        type: WRONG_ANSWER,
        answerState: { [answerId]: "error" },
        results,
      });
    }
  };

  const onRetry = () => {
    setTimeout(() => {
      dispatch({
        type: ON_RETRY,
      });
    }, 1000);
  };

  const isQuizFinished = () => {
    return state.activeQuestion + 1 === state.quiz.length;
  };

  
  return (
    <QuizContext.Provider
      value={{
        state,
        fetchQuizes,
        quizAnswerClick,
        onRetry,
        fetQuizByID
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizState;
