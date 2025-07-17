import { Outlet } from "react-router-dom";
import Header from "../ui/header"; 

import "../../styles/layout.scss"; 

const Layout = () => {
    return (
        <div className="layout">
            <Header />            
                <Outlet />          
        </div>
    );
};

export default Layout;