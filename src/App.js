import React from "react";
import "./App.scss";
import Quiz from "./pages/Quiz/Quiz";
import Layout from "./hoc/Layout/Layout";
import {Route, Switch } from "react-router-dom";
import QuizLists from "./pages/QuizList/QuizList";
import QuizState from "./context/quizState";
import QuizCreatorContainer from "./pages/QuizCreator/container/QuizCreatorContainer";
import AuthContainer from "./pages/Auth/container/AuthContainer";

const App = () => {
  return (
    <Layout>
     
        <QuizState>
            <Switch>
              <Route path="/auth" component={AuthContainer} />
              <Route path="/quiz-creator" component={QuizCreatorContainer} />
              <Route path="/quiz/:id" component={Quiz} />
              <Route path="/" component={QuizLists} />
            </Switch>
            </QuizState>
     
    </Layout>
  );
};

export default App;
