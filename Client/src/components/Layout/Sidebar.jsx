import { NavLink ,useNavigate } from "react-router-dom";
import { FaHome, FaMoneyBill, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";
import "../Css/sidebar.css";
import { useAuth } from "../../Context/AuthContext";
import LogoutModal from "../Common/LogoutModal";

const Sidebar = ({ collapsed }) => {
    const [showLogout, setShowLogout] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>

            <div className="sidebar-header">
                {collapsed ? "💸" : "💸 Expense Tracker"}
            </div>

            <ul className="menu">
                <li>
                    <NavLink to="/dashboard">
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


<div className="logout-section">
  <div className="logout-btn" onClick={() => setShowLogout(true)}>
    <FaSignOutAlt />
    {!collapsed && <span>Logout</span>}
  </div>
</div>

{showLogout && (
  <LogoutModal
    onConfirm={handleLogout}
    onCancel={() => setShowLogout(false)}
  />
)}
</div>
    );
};

export default Sidebar;