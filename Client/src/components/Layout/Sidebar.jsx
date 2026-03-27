import { NavLink } from "react-router-dom";
import { FaHome, FaMoneyBill, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";
import "../Css/sidebar.css";

const Sidebar = ({ collapsed }) => {
    const [showLogout, setShowLogout] = useState(false);

    const handleLogout = () => {
        // clear session/local storage
        localStorage.clear();

        // redirect
        window.location.href = "/login";
    };

    return (
        <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>

            <div className="sidebar-header">
                {collapsed ? "💸" : "💸 Expense Tracker"}
            </div>

            <ul className="menu">
                <li>
                    <NavLink to="/">
                        <FaHome />
                        <span>Dashboard</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/expenses">
                        <FaMoneyBill />
                        <span>Expenses</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/reports">
                        <FaChartBar />
                        <span>Reports</span>
                    </NavLink>
                </li>
            </ul>

            {/* ✅ Logout at bottom */}
            <div className="logout-section">
                <div className="logout-btn" onClick={() => setShowLogout(true)}>
                    <FaSignOutAlt />
                    {!collapsed && <span>Logout</span>}
                </div>
            </div>

            {/* ✅ Popup */}
            {showLogout && (
                <div className="logout-modal">
                    <div className="logout-box">
                        <h3 className="logoutText">Logout</h3>
                        <p>Are you sure you want to logout?</p>

                        <div className="logout-actions">
                            <button className="yes-btn" onClick={handleLogout}>
                                Yes
                            </button>
                            <button className="cancel-btn" onClick={() => setShowLogout(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;