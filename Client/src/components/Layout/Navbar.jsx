// Navbar.jsx
import React from "react";
import { FaMoon } from "react-icons/fa";
import "../Css/commonitems.css";

const Navbar = ({ toggleTheme }) => {
    return (
        <div className="navbar">
            <h2>Dashboard</h2>

            <div className="right">
                <FaMoon className="theme-icon" onClick={toggleTheme} />

                <div className="profile">
                    <span>Santhakumar R</span>
                    <img src="https://i.pravatar.cc/40" alt="user" />
                </div>
            </div>
        </div>
    );
};

export default Navbar;