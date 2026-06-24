import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";

function Users() {
  const [users, setUsers] =
    useState([]);
    const [showModal, setShowModal] =
  useState(false);

const [formData, setFormData] =
  useState({
    name: "",
    email: "",
    password: "",
    role: "pharmacist",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response =
        await API.get("/users");

      setUsers(
        response.data.users
      );
    } catch (error) {
      console.error(error);
    }
  };
const createUser = async (e) => {
  e.preventDefault();

  try {
    await API.post(
      "/users",
      formData
    );

    alert(
      "User created successfully"
    );

    setShowModal(false);

    fetchUsers();

    setFormData({
      name: "",
      email: "",
      password: "",
      role: "pharmacist",
    });
  } catch (error) {
    console.error(error);

    alert(
      error.response?.data
        ?.message ||
        "Failed to create user"
    );
  }
};
const handleDelete = async (
  id
) => {
  const confirmDelete =
    window.confirm(
      "Delete this user?"
    );

  if (!confirmDelete) return;

  try {
    await API.delete(
      `/users/${id}`
    );

    fetchUsers();

    alert(
      "User deleted successfully"
    );
  } catch (error) {
    console.error(error);
  }
};
  return (
    <Layout>
   <div className="p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
    

<div className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white rounded-3xl shadow-xl p-8 mb-6">



    <button
      onClick={() =>
        setShowModal(true)
      }
      className="bg-white/20 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/30 transition"
    >
      + Add User
    </button>


</div>

      <div className="bg-white/80 backdrop-blur-2xl  shadow-2xl border border-blue-100 overflow-hidden">

        <div className="overflow-x-auto">

  <div className="overflow-x-auto">
  <table className="hidden md:table w-full">
<thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <tr>
              <th className="p-4 text-left text-indigo-900 font-semibold uppercase tracking-wide text-sm">
                Name
              </th>

              <th className="p-4 text-left text-indigo-900 font-semibold uppercase tracking-wide text-sm">
                Email
              </th>

              <th className="p-4 text-left text-indigo-900 font-semibold uppercase tracking-wide text-sm">
                Role
              </th>
              <th className="p-4 text-left text-indigo-900 font-semibold uppercase tracking-wide text-sm">
  Actions
</th>
            </tr>

          </thead>

        <tbody>
  {users.map((user) => (
    <tr
      key={user._id}
      className="border-b border-blue-100 hover:bg-blue-50 transition-all duration-300"
    >
      <td className="p-4 font-semibold text-slate-800">
        {user.name}
      </td>

      <td className="p-4 font-semibold text-slate-800">
        {user.email}
      </td>

      <td className="p-3">
        <span
          className={`px-3 py-1 rounded-full text-white ${
            user.role === "admin"
              ? "bg-gradient-to-r from-indigo-600 to-purple-700"
              : "bg-gradient-to-r from-blue-500 to-indigo-600"
          }`}
        >
         {user.role === "admin"
  ? "Administrator"
  : "Pharmacist"}
        </span>
      </td>

      <td className="p-3">
        {user.role !== "admin" && (
          <button
            onClick={() =>
              handleDelete(
                user._id
              )
            }
            className="bg-gradient-to-r from-rose-500 to-red-600 text-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition"
          >
            Delete
          </button>
        )}
      </td>

    </tr>
  ))}
</tbody>

        </table>
 <div className="md:hidden space-y-3 p-3">

  {users.map((user) => (

    <div
      key={user._id}
      className="bg-white rounded-xl shadow p-4 border border-blue-100"
    >

      <h3 className="font-bold text-lg text-indigo-700">
        {user.name}
      </h3>

      <p className="text-slate-600">
        {user.email}
      </p>

      <div className="mt-2">

        <span
          className={`px-3 py-1 rounded-full text-white text-sm ${
            user.role === "admin"
              ? "bg-gradient-to-r from-indigo-600 to-purple-700"
              : "bg-gradient-to-r from-blue-500 to-indigo-600"
          }`}
        >
          {user.role === "admin"
            ? "Administrator"
            : "Pharmacist"}
        </span>

      </div>

      {user.role !== "admin" && (

        <button
          onClick={() =>
            handleDelete(user._id)
          }
          className="mt-4 w-full bg-gradient-to-r from-red-500 to-rose-600 text-white py-2 rounded-xl"
        >
          Delete User
        </button>

      )}

    </div>

  ))}

</div>
        </div>
        </div>

      </div>
      {showModal && (
  <div className="fixed inset-0 bg-black/50 flex items-start md:items-center justify-center overflow-y-auto p-4 z-50">

    <div className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-blue-100 w-full max-w-md">

      <h2 className="text-2xl font-bold mb-4">
        Add User
      </h2>

      <form
        onSubmit={createUser}
        className="space-y-4"
      >

        <input
          type="text"
          placeholder="Name"
          className="border border-blue-200 rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="border border-blue-200 rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded w-full"
          value={formData.password}
          onChange={(e) =>
            setFormData({
              ...formData,
              password:
                e.target.value,
            })
          }
        />

        <select
          className="border p-3 rounded w-full"
          value={formData.role}
          onChange={(e) =>
            setFormData({
              ...formData,
              role: e.target.value,
            })
          }
        >
          <option value="pharmacist">
            Pharmacist
          </option>

          <option value="admin">
            Admin
          </option>
        </select>

        <div className="flex justify-end gap-3">

          <button
            type="button"
            onClick={() =>
              setShowModal(false)
            }
           className="bg-slate-200 px-5 py-2 rounded-xl hover:bg-slate-300 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
           className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white px-5 py-2 rounded-xl shadow-lg hover:shadow-xl transition"
          >
            Create User
          </button>

        </div>

      </form>

    </div>

  </div>
)}

    </div>
    <div className="mb-4 text-slate-600 font-medium">
  Total Users: {users.length}
</div>
    </Layout>
  );
}

export default Users;