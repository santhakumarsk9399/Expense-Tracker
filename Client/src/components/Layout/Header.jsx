import React, { useState } from "react";
import "../Css/header.css";
import { useLocation } from "react-router-dom";
const Header = ({ toggleSidebar }) => {
  const location = useLocation();

  const toggleTheme = () => {
    document.body.classList.toggle("dark");
  };
  const routeTitles = {
    "/": "Dashboard",
    "/expenses": "Expenses",
    "/reports": "Reports",
  };

  const getTitle = () => routeTitles[location.pathname] || "Dashboard";

  return (
    <div className="header">
      <div className="header-left">
        <div className="toggle-btn" onClick={toggleSidebar}>
          ☰
        </div>
        <h4>{getTitle()}</h4>
      </div>

      <div className="profile" onClick={toggleTheme}>
        <img src="/user.png" alt="user" />
        <span>Santha</span>
      </div>
    </div>
  );
};

export default Header;