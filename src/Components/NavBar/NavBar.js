/* eslint-disable react/function-component-definition */
import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => (
  <div className="navbar" data-au="nav-bar">
    <NavLink
      to="/"
      className="nav-link"
      activeClassName="active"
    >
      Super Health Inc.
    </NavLink>
  </div>
);

export default NavBar;
