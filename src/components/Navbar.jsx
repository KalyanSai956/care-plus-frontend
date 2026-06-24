import { useState } from "react";
import {
  FaBell,
  FaUserCircle,
  FaChevronDown,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";

function Navbar({
  toggleSidebar,
}) {
  const navigate = useNavigate();
  const user = JSON.parse(
    localStorage.getItem("user")
  );
  const [showMenu, setShowMenu] =
  useState(false);

  return (
    <div className="fixed top-0
left-0 md:left-64
right-0 z-40 bg-white/95 backdrop-blur-xl shadow-sm  h-16 flex items-center justify-between px-6">

    <div className="flex items-center gap-4">

 <button
  className="md:hidden text-xl"
  onClick={toggleSidebar}
>
  ☰
</button>

  <h1 className="text-2xl text-indigo-600">
    ERP
  </h1>

</div>

      <div className="flex items-center gap-6">


  <div
  className="flex items-center gap-3 cursor-pointer relative"
  onClick={() =>
    setShowMenu(!showMenu)
  }
>

  <FaUserCircle className="text-3xl text-slate-600" />

  <div>
    <p className="font-semibold">
      {user?.name}
    </p>

    <p className="text-xs text-gray-500 capitalize">
      {user?.role}
    </p>
  </div>

<FaChevronDown />

{showMenu && (
  <div className="absolute top-14 right-0 bg-white shadow-lg rounded-lg w-48 border z-50">

  <button
  onClick={() => {
    setShowMenu(false);
    navigate("/forgot-password");
  }}
  className="w-full text-left px-4 py-3 hover:bg-gray-100"
>
  Change Password
</button>

    <button
      onClick={() => {
        localStorage.clear();
        window.location.href = "/";
      }}
      className="w-full text-left px-4 py-3 text-red-500 hover:bg-gray-100"
    >
      Logout
    </button>

  </div>
)}

</div>

      </div>

    </div>
  );
}

export default Navbar;