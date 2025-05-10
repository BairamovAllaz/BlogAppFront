import React from 'react'
import { Outlet,useLocation } from "react-router-dom";
import ToolBar from '../components/Toolbar';
function MainLayout() {
  const location = useLocation();
  const hideTollbar = ["/login","/sign-in"].includes(location.pathname);
  return (
    <div>
      <main>
        {!hideTollbar && <ToolBar />}
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout
