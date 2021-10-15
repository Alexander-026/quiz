import React, { useReducer } from "react";
import axiosQuiz from "../../../components/axios/axiosQuiz";
import QuizCreator from "../QuizCreator";
import { QuizCreatorContext } from "./quizCreatorContext";
import { QuizCreatorReducer } from "./quizCreatorReducer";
import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION } from "./quizCreatorTypes";

const QuizCreatorContainer = () => {
  const initialState = {
    quiz: [],
  };

  const [stateCreator, dispatch] = useReducer(QuizCreatorReducer, initialState);

  const createQuizQuestion = (item) => {
    dispatch({ type: CREATE_QUIZ_QUESTION, item });
  };

  const setQuizCreation = () => ({
    type: RESET_QUIZ_CREATION,
  });

  const finishCreateQuiz = async (quiz) => {
    await axiosQuiz.post("/quizes.json", quiz);
    dispatch(setQuizCreation());
  };

  // const finishCreateQuiz = async(dispatch, stateCreator) => {
  //     await axiosQuiz.post("/quizes.json", stateCreator);
  //     dispatch({ type: RESET_QUIZ_CREATION,})
  // }



  return (
    <QuizCreatorContext.Provider
      value={{ stateCreator, createQuizQuestion, finishCreateQuiz }}
    >
      <QuizCreator />
    </QuizCreatorContext.Provider>
  );
};

export default QuizCreatorContainer;
