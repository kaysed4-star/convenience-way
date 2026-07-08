import { useState } from "react";

import { useParams }
  from "react-router-dom";

import api from "../api";

function ResetPassword() {

  const { token } =
    useParams();

  const [password,
    setPassword] =
    useState("");

  const resetPassword =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await api.put(

            `/users/reset-password/${token}`,

            {
              password
            }

          );

        alert(
          response.data.message
        );

        window.location.href =
          "/login";

      } catch (error) {

        console.log(error);

        alert(
          "Reset link invalid or expired"
        );

      }

  };

  return (

    <div className="
      p-10
      flex
      justify-center
      items-center
      min-h-screen
    ">

      <div className="
        bg-white
        p-8
        rounded-lg
        shadow-lg
        w-96
      ">

        <h1 className="
          text-3xl
          font-bold
          mb-6
          text-center
        ">
          Reset Password
        </h1>

        <form
          onSubmit={resetPassword}
        >

          <input

            type="password"

            placeholder="New Password"

            value={password}

            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }

            className="
              w-full
              border
              p-3
              mb-4
              rounded
            "

            required

          />

          <button

            type="submit"

            className="
              w-full
              bg-black
              text-white
              p-3
              rounded
            "

          >

            Update Password

          </button>

        </form>

      </div>

    </div>

  );

}

export default ResetPassword;