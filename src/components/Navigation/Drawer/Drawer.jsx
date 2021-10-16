import React, { Fragment, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../pages/Auth/container/AuthContext";
import Backdrop from "../../UI/Backdrop/Backdrop";
import classes from "./Drawer.module.scss";



const Drawer = ({ isOpen, onClose }) => {
  const { stateAuth } = useContext(AuthContext);
  const renderLinks = () => {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            onClick={() => onClose()}
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
          >
            {link.label}
          </NavLink>
        </li>
      );
    });
  };

  const cls = [classes.Drawer];

  if (!isOpen) {
    cls.push(classes.close);
  }

  const links = [
    { to: "/", label: "Quiz lists", exact: true }
  ];


  if(!!stateAuth.token) {
    links.push( { to: "/quiz-creator", label: "Create Quiz", exact: false })
    links.push( { to: "/logout", label: "Logout", exact: false })
  }else {
    links.push( { to: "/auth", label: "Auth", exact: false })
  }

  return (
    <Fragment>
      <nav className={cls.join(" ")}>
        <ul>{renderLinks()}</ul>
      </nav>
      {isOpen ? <Backdrop onClick={onClose} /> : null}
    </Fragment>
  );
};

export default Drawer;
