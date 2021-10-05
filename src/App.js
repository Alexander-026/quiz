import React from "react";
import "./App.scss";
import QuizState from "./containers/context/quizState";
import Quiz from "./containers/Quiz/Quiz";
import Layout from "./hoc/Layout/Layout";

const App = () => {
  return (
    <Layout>
      <QuizState>
        <Quiz />
      </QuizState>
    </Layout>
  );
};

export default App;
