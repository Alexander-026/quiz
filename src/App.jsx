import React, { useContext, useEffect } from "react";
import "./App.scss";
import Quiz from "./pages/Quiz/Quiz";
import Layout from "./hoc/Layout/Layout";
import { Route, Switch, Redirect} from "react-router-dom";
import QuizLists from "./pages/QuizList/QuizList";
import QuizState from "./context/quizState";
import QuizCreatorContainer from "./pages/QuizCreator/container/QuizCreatorContainer";
import Auth from "./pages/Auth/Auth";
import { AuthContext } from "./pages/Auth/container/AuthContext";
import Logout from "./components/Logout/Logout";

const App = () => {
  const { stateAuth, autoLogin } = useContext(AuthContext);
  useEffect(() => {
    console.log('AutoLogout')
    autoLogin()
  }, [])

  console.log(!!stateAuth.token)

  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/quiz/:id" component={Quiz} />
      <Route path="/" exact component={QuizLists} />
      <Redirect to="/" />
    </Switch>
  );

  if (!!stateAuth.token) {
    routes = (
      <Switch>
        <Route path="/quiz-creator" component={QuizCreatorContainer} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={QuizLists} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Layout>
      <QuizState>
          {routes}
      </QuizState>
    </Layout>
  );
};

export default App
