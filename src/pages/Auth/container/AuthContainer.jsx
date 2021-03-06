import axios from "axios";
import React, { useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { AuthReducer } from "./AuthReducer";
import { AUTH_SUCCESS, AUTH_LOGOUT } from "./authTypes";

const AuthContainer = ({ children }) => {
  const initilaState = {
    token: null,
  };
  const [stateAuth, dispatch] = useReducer(AuthReducer, initilaState);
  const auth = async (email, password, isLogin) => {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCwP8LDhbBKy3Jy2DWZU2dsGcI1w4zlAzs";
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCwP8LDhbBKy3Jy2DWZU2dsGcI1w4zlAzs";
    }
    const response = await axios.post(url, authData);

    const data = response.data;

    console.log(data);

    const experationDate = new Date(
      new Date().getTime() + data.expiresIn * 1000
    );
    localStorage.setItem("token", data.idToken);
    localStorage.setItem("userId", data.localId);
    localStorage.setItem("experationDate", experationDate);
    dispatch(authSuccess(data.idToken));
    autoLogout(data.expiresIn);
  };

  const authSuccess = (payload) => ({ type: AUTH_SUCCESS, payload });

  const autoLogout = (time) => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("experationDate");
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  };

  const logout = () => ({ type: AUTH_LOGOUT });

  const autoLogin = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const experationDate = new Date(localStorage.getItem("experationDate"));
      if (experationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        autoLogout((experationDate.getTime() - new Date().getTime()) / 1000);
      }
    }
  };

  const exportLogout = () => {
    console.log('LogOut')
    dispatch(logout());
  };

  return (
    <AuthContext.Provider value={{ auth, exportLogout, stateAuth, autoLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContainer;
