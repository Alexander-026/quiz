import {
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_FINISH,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZ_SUCCESS,
  NEXT_QUIZ,
  ON_RETRY,
  QUIZ_FINISHED,
  RIGHT_ANSWER,
  WRONG_ANSWER,
} from "./quizTypes";



const handlers = {
  [FETCH_QUIZES_START]: (state) => ({
    ...state,
    loading: true,
  }),
  [FETCH_QUIZES_FINISH]: (state) => ({
    ...state,
    loading: false,
  }),
  [FETCH_QUIZES_SUCCESS]: (state, { quizes }) => ({
    ...state,
    quizes,
    loading: false,
  }),
  [FETCH_QUIZ_SUCCESS]: (state, { quiz }) => ({
    ...state,
    quiz,
    loading: false,
  }),
  [FETCH_QUIZES_ERROR]: (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }),
  [RIGHT_ANSWER]: (state, {answerState, result}) => ({
    ...state,
    answerState,
    result
  }),
  [WRONG_ANSWER]: (state, {answerState, result}) => ({
    ...state,
    answerState,
    result
  }),
  [QUIZ_FINISHED] : (state) => ({
    ...state,
    answerState: null,
    isFinished: true,
  }),
  [NEXT_QUIZ] : (state, {activeQuestion}) => ({
    ...state,
    answerState: null,
    activeQuestion
  }),
  [ON_RETRY]: (state) => ({
    ...state,
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
  }),
  DEFAULT: (state) => state,
};

export const QuizReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;

  return handler(state, action);
};
