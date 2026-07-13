import { useState } from "react";
import api from "../api";

function ForgotPassword() {

  const [email, setEmail] =
    useState("");

  const [resetUrl, setResetUrl] =
    useState("");

  const submitHandler =
    async (e) => {

      e.preventDefault();

      try {

        setResetUrl("");

        const response =
          await api.post(
            "/users/forgot-password",
            { email }
          );

        if (response.data.resetUrl) {
          setResetUrl(response.data.resetUrl);
        }

        alert(response.data.message);

      } catch (error) {

  console.log(error.response?.data);

  alert(
    error.response?.data?.message ||
    "Something went wrong"
  );

}

    };

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Forgot Password
      </h1>

      <form onSubmit={submitHandler}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="
            border
            p-3
            w-full
            mb-4
          "
        />

        <button
          type="submit"
          className="
            bg-black
            text-white
            px-6
            py-3
          "
        >
          Reset Password
        </button>

      </form>

      {resetUrl && (

        <div className="
          mt-6
          rounded
          border
          bg-yellow-50
          p-4
        ">

          <p className="mb-3 font-bold">
            Prototype reset link
          </p>

          <a
            href={resetUrl}
            className="text-blue-600 underline break-all"
          >
            {resetUrl}
          </a>

        </div>

      )}

    </div>

  );

}

export default ForgotPassword;
