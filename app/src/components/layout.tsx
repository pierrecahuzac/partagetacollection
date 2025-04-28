import { Outlet } from "react-router";
import Header from "../components/header"; 

import "../styles/layout.scss"; 

const Layout = () => {
    return (
        <div className="layout">
            <Header />
            <main className="layout__content">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;