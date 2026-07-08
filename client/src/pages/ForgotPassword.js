import { useState } from "react";
import api from "../api";

function ForgotPassword() {

  const [email, setEmail] =
    useState("");

  const submitHandler =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await api.post(
            "/users/forgot-password",
            { email }
          );

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

    </div>

  );

}

export default ForgotPassword;