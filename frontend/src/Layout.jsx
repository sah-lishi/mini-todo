import Header from './components/Header/Header'
import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar/SideBar'
import { useEffect, useState } from 'react';

function Layout() {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // default sidebar width
  const OPEN_WIDTH = 260;   // e.g. w-64 ~ 256px -> use 260 for margin safety
  const CLOSED_WIDTH = 80;

  useEffect(() => {
  const header = document.getElementById("main-header");

  const updateSizes = () => {
    setHeaderHeight(header.offsetHeight);
  };
  updateSizes();
  window.addEventListener("resize", updateSizes);

  return () => window.removeEventListener("resize", updateSizes);
  }, []);

  const sidebarWidth = isSidebarOpen ? OPEN_WIDTH : CLOSED_WIDTH;
  return (
  <div>
    <Header/>
    <div className="flex">
      <aside className="bg-[#ff8b82] text-white" style={{
            position: "fixed",
            top: headerHeight + "px",
            left: 0,
            width: `${sidebarWidth}px`,
            height: `calc(100vh - ${headerHeight}px)`,
            overflowY: "hidden",
            transition: "width 300ms ease",
            zIndex: 40
          }}>
        <Sidebar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(v => !v)}/>
      </aside>
      <main className="flex-1 p-6 md:p-8" style={{
            marginLeft: sidebarWidth + "px",
            marginTop: headerHeight + "px",
            height: `calc(100vh - ${headerHeight}px)`,
            overflowY: "auto",
      }}>
        <Outlet />
      </main>
    </div>
  </div>
  )
}

export default Layout