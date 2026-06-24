import { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

function ResetPassword() {
  const { token } = useParams();

  const [password,
    setPassword] =
    useState("");

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        const response =
          await API.post(
            `/auth/reset-password/${token}`,
            {
              password,
            }
          );

        alert(
          response.data.message
        );
      } catch (error) {
        alert(
          error.response.data
            .message
        );
      }
    };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow w-96"
      >

        <h2 className="text-2xl font-bold mb-6">
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="border p-3 rounded w-full mb-4"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-3 rounded"
        >
          Reset Password
        </button>

      </form>

    </div>
  );
}

export default ResetPassword;