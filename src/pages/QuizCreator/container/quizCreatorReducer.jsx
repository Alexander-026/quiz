import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION } from "./quizCreatorTypes";

const handlers = {
  [CREATE_QUIZ_QUESTION]: (state, { item }) => ({
    ...state,
    quiz: [...state.quiz, item],
  }),
  [RESET_QUIZ_CREATION]: (state) => ({
    ...state,
    quiz: []
  }),
  DEFAULT: (state) => state,
};

export const QuizCreatorReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
