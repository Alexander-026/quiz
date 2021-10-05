import React, { Fragment } from "react";
import Backdrop from "../../UI/Backdrop/Backdrop";
import classes from "./Drawer.module.scss";

const links = [1, 2, 3];

const Drawer = ({ isOpen, onClose }) => {
  const renderLinks = () => {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <a>Link {link}</a>
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
      {isOpen ? <Backdrop onClick={onClose}/> : null}
    </Fragment>
  );
};

export default Drawer;
