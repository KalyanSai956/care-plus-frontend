import {
  FaHome,
  FaPills,
  FaFileInvoice,
  FaUsers,
  FaChartLine,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaUserMd } from "react-icons/fa";
function Sidebar({ isOpen =true }) {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
<div
  className={`
    fixed top-0 left-0 h-screen w-64
    bg-white text-indigo-600 shadow-2xl z-50
    flex flex-col
    transform transition-transform duration-300
    md:translate-x-0
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
  `}
>
  

      {/* Logo */}
       <div className="flex items-center gap-4 mb-7 mt-8 ml-4">
               <FaUserMd size={50} />
     
               <h1 className="text-2xl font-bold">
                 Care Plus
               </h1>
             </div>

      {/* Menu */}
     <div className="flex-1 overflow-y-auto p-4">

        <div className="space-y-2">

          {/* ACTIVE PAGE */}
      <Link
  to="/dashboard"
  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600 text-white"
>
  
  Dashboard
</Link>

        <Link
  to="/medicines"
  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-300 transition"
>
  
  Medicines
</Link>

         <Link
  to="/billing"
  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-300 transition"
>
 
  Billing
</Link>
          <Link
  to="/invoices"
  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-300  transition"
>
  Invoices
</Link>

         {user?.role === "admin" && (
  <Link
    to="/users"
    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-300 transition"
  >
    
    Users
  </Link>
)}

    <Link
  to="/analytics"
  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-300 transition"
>
 
  Analytics
</Link>

        </div>
      </div>

      {/* User */}
      <div className="mt-auto border-t border-slate-200 p-4 bg-white">

        <div className="mb-4">
          <h3 className="font-semibold">
            {user?.name}
          </h3>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 bg-red-500 py-2 text-white rounded-lg hover:bg-red-600"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </div>
  );
}

export default Sidebar;