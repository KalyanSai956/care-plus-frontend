import { useState } from "react";
import { FaUserMd } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showLogin, setShowLogin] =
  useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await API.post(
        "/auth/login",
        formData
      );

   localStorage.setItem(
  "token",
  response.data.token
);

localStorage.setItem(
  "user",
  JSON.stringify(
    response.data.user
  )
);

navigate("/dashboard");

      // Don't redirect yet
      // First verify login works

    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">

    {/* Navbar */}
    <div className="flex justify-center pt-8">

      <div className="bg-white shadow-xl rounded-full px-4 md:px-8 py-3 md:py-4 flex items-center gap-4 md:gap-10">

        <div className="flex items-center gap-2">

          <FaUserMd className="text-blue-600" />

          <span className="font-bold">
            Care Plus
          </span>

        </div>

        <button
          onClick={() =>
            setShowLogin(true)
          }
          className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700"
        >
          Login
        </button>

      </div>

    </div>

    {/* Hero Section */}
    <div className="flex flex-col items-center justify-center text-center px-6 mt-15">

      <div className="bg-blue-100 p-6 rounded-3xl mb-8">

        <FaUserMd
          size={80}
          className="text-blue-700"
        />

      </div>

     <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-tight">

        Smart Pharmacy

        <br />

        <span className="text-blue-600">
          Management 
        </span>

      </h1>

      <p className="mt-6 max-w-3xl text-base md:text-lg lg:text-xl text-slate-600">

        Manage inventory, medicines,
        billing, invoices, analytics,
        expiry tracking and pharmacist
        operations from one unified
        platform.

      </p>

      <button
        onClick={() =>
          setShowLogin(true)
        }
        className="mt-10 bg-gradient-to-r from-blue-600 to-indigo-800 text-white px-6 md:px-10 py-3 md:py-4 rounded-2xl text-base md:text-lg font-semibold shadow-xl hover:scale-105 transition mb-5"
      >
        Login to Dashboard →
      </button>

    </div>

    {/* Login Modal */}
    {showLogin && (

      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
<div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-[95vw] md:w-full max-w-md relative">

          <button
            onClick={() =>
              setShowLogin(false)
            }
            className="absolute right-5 top-4 text-2xl"
          >
            ×
          </button>

          <h2 className="text-3xl font-bold text-center mb-2">
            Welcome Back
          </h2>

          <p className="text-center text-slate-500 mb-8">
            Login to continue
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />

         <input
  type="password"
  name="password"
  placeholder="Password"
  value={formData.password}
  onChange={handleChange}
  className="w-full border rounded-xl px-4 py-3"
/>

<div className="text-right">

  <button
    type="button"
    onClick={() =>
      navigate("/forgot-password")
    }
    className="text-blue-600 text-sm hover:underline"
  >
    Forgot Password?
  </button>

</div>

            {error && (
              <div className="bg-red-100 text-red-600 p-3 rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-3 rounded-xl font-semibold"
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>
            <div className="mt-5 bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm">

  <p className="font-semibold text-blue-700 mb-2">
    Demo Credentials
  </p>

  <p>
    <span className="font-medium">
      Email:
    </span>{" "}
    admin@careplus.com
  </p>

  <p>
    <span className="font-medium">
      Password:
    </span>{" "}
    Admin123
  </p>

</div>
    

          </form>

        </div>

      </div>

    )}

  </div>
);
}

export default Login;