import React from "react";
import "./App.scss";
import QuizState from "./context/quizState";
import Quiz from "./pages/Quiz/Quiz";
import Layout from "./hoc/Layout/Layout";
import {Route, Switch } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import QuizLists from "./pages/QuizList/QuizList";
import QuizCreator from "./pages/QuizCreator/QuizCreator";

const App = () => {
  return (
    <Layout>
      <QuizState>
          <Switch>
            <Route path="/auth" component={Auth} />
            <Route path="/quiz-creator" component={QuizCreator} />
            <Route path="/quiz/:id" component={Quiz} />
            <Route path="/" component={QuizLists} />
          </Switch>
      </QuizState>
    </Layout>
  );
};

export default App;
