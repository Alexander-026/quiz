import React, { useState } from "react";
import Drawer from "../../components/Navigation/Drawer/Drawer";
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import classes from "./Layout.module.scss";
const Layout = ({ children }) => {
  const [stateMenu, setStateMenu] = useState(false);
  const toggleMenuHandler = () => {
    setStateMenu(!stateMenu);
  };
  const menuCloseHandler = () => {
    setStateMenu(false);
  }
  return (
    <div className={classes.Layout}>
      <Drawer onClose={menuCloseHandler} isOpen={stateMenu}/>
      <MenuToggle onToggle={toggleMenuHandler} isOpen={stateMenu} />
      <main>{children}</main>
    </div>
  );
};
export default Layout;
