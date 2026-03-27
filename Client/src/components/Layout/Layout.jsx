import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "../Css/layout.css"

const Layout = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className="layout">
            <Sidebar collapsed={collapsed} />

            <div className={`main ${collapsed ? "collapsed" : ""}`}>
                {/* ✅ Header MUST be here */}
                <Header toggleSidebar={toggleSidebar} />

                <div className="content">
                    {/* ✅ This is key */}
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;