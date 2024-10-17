import { useState } from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

import Sidebar from "../components/core/Dashboard/Sidebar"

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)
  const [showSidebar, setShowSidebar] = useState(false);

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }


  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] flex-col md:flex-row">
      {/* Sidebar toggle button - placed lower to avoid overlapping */}
      <button
        className="absolute top-1 border-black border-2 left-[66%] z-10 block md:hidden bg-yellow-50 p-2 rounded"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? "Close Menu" : "Menu"}
      </button>

      {/* Sidebar that can be toggled on small screens */}
      <div
        className={`absolute md:relative z-20 transition-all duration-300 md:block ${
          showSidebar ? "block" : "hidden"
        }`}
      >
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
  

  // return (
  //   <div className="relative flex min-h-[calc(100vh-3.5rem)]">
  //     <Sidebar />
  //     <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
  //       <div className="mx-auto w-11/12 max-w-[1000px] py-10">
  //         <Outlet />
  //       </div>
  //     </div>
  //   </div>
  // )

}

export default Dashboard
