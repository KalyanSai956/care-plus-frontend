import { useState } from "react";
import API from "../api/axios";

function ForgotPassword() {
  const [email, setEmail] =
    useState("");

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        const response =
          await API.post(
            "/auth/forgot-password",
            { email }
          );

        alert(
          response.data.message
        );
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Something went wrong"
        );
      }
    };

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100">

    <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-blue-100 p-8">

      <div className="text-center mb-8">

        <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-600 to-indigo-800 rounded-full flex items-center justify-center text-white text-3xl mb-4">
          🔒
        </div>

        <h1 className="text-3xl font-bold text-slate-800">
          Forgot Password
        </h1>

        <p className="text-slate-500 mt-2">
          Enter your email address to receive a password reset link.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <div>

          <label className="block mb-2 text-sm font-medium text-slate-700">
            Email Address
          </label>

          <input
            type="email"
            placeholder="admin@careplus.com"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
        >
          Send Reset Link
        </button>

      </form>

      <div className="text-center mt-6">

        <a
          href="/"
          className="text-blue-600 font-medium hover:underline"
        >
          ← Back to Login
        </a>

      </div>

    </div>

  </div>
);
}

export default ForgotPassword;