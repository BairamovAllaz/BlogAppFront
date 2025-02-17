import React from 'react'
import { Outlet } from "react-router-dom";
// import ToolBar from '../components/Toolbar';
function MainLayout() {
  return (
    <div>
      {/* <ToolBar /> */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout
