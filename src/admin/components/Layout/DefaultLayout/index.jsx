import React, { useState } from "react";
import NavBar from "../../NavBar";
import Sidebar from "../../Sidebar";
import './index.scss'
function DefaultLayout({children}) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const openSidebar = () => {
        setSidebarOpen(true);
      };
      const closeSidebar = () => {
        setSidebarOpen(false);
      };
    return ( 
    <>
        <div className="main__admin">
                <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar}/>
            <div className="container__admin">
                    <NavBar sidebarOpen={sidebarOpen} openSidebar={openSidebar}/>
                <div className="content__admin">
                    {children}
                </div>
            </div>
        </div>
       
    </> 
    );
}

export default DefaultLayout;