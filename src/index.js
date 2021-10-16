import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthContainer from "./pages/Auth/container/AuthContainer";

const app = (
  <BrowserRouter>
    <AuthContainer>
      <App />
    </AuthContainer>
  </BrowserRouter>
);

ReactDOM.render(
  <React.StrictMode>{app}</React.StrictMode>,
  document.getElementById("root")
);
