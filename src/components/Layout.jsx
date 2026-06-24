import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Chatbot from "./Chatbot";
import { useState } from "react";
function Layout({ children }) {
  const [sidebarOpen,
  setSidebarOpen] =
  useState(false);
  return (
    <div className="flex">

  <div className="hidden md:block fixed left-0 top-0 h-screen">
<div className="hidden md:block">
  <Sidebar isOpen={true} />
</div>
</div>

      <div className="flex-1 w-full md:ml-64">

     <Navbar
  toggleSidebar={() =>
    setSidebarOpen(
      !sidebarOpen
    )
  }
/>
{sidebarOpen && (

  <div className="fixed inset-0 z-50 md:hidden">

    <div
      className="absolute inset-0 bg-black/40"
      onClick={() =>
        setSidebarOpen(false)
      }
    />

    <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-2xl">

     <Sidebar
  isOpen={sidebarOpen}
/>

    </div>

  </div>

)}

        <div className="pt-20 p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
          {children}
        </div>

        <Chatbot />

      </div>

    </div>
  );
}

export default Layout;