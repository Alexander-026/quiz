import React, { useState } from "react";

import { QuizContext } from "./quizContext";

const QuizState = ({ children }) => {
  
 
  const [state, setState] = useState({
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [],
    loading: true,
  });


  const onAnswerClickHandler = (answerId) => {
    const question = state.quiz[state.activeQuestion];
    const results = state.results;
    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = "success";
      }
      setState({
        ...state,
        answerState: { [answerId]: "success" },
        results,
      });
      const timeout = window.setTimeout(() => {
        if (isQuizFinished()) {
          setState({
            ...state,
            answerState: null,
            isFinished: true,
          });
        } else {
          setState({
            ...state,
            answerState: null,
            activeQuestion: state.activeQuestion + 1,
          });
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = "error";
      setState({
        ...state,
        answerState: { [answerId]: "error" },
        results,
      });
    }
  };

  const onRetry = () => {
    setTimeout(() => {
      setState({
        ...state,
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
      });
    }, 1000);
  };

  const isQuizFinished = () => {
    return state.activeQuestion + 1 === state.quiz.length;
  };

  return (
    <QuizContext.Provider value={{ state, setState, onAnswerClickHandler, onRetry }}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizState;
