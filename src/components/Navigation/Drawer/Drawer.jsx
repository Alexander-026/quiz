import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import Backdrop from "../../UI/Backdrop/Backdrop";
import classes from "./Drawer.module.scss";

const links = [
  { to: "/", label: "Quiz lists", exact: true },
  { to: "/auth", label: "Auth", exact: false },
  { to: "/quiz-creator", label: "Create Quiz", exact: false },
];

const Drawer = ({ isOpen, onClose }) => {
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
