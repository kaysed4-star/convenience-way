import { useState } from "react";
import api from "../api";

import {
  useContext
} from "react";

import {
  AuthContext
} from "../context/AuthContext";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const { login } =
  useContext(AuthContext);

  const loginUser = async (e) => {

    e.preventDefault();


    try {

      const response = await api.post(
        "/users/login",
        {
          email,
          password
        }
      );

      console.log(response.data);

      localStorage.setItem(
        "token",
        response.data.token
      );

      login();

      window.location.href =
  "/dashboard";

      alert("Login successful!");

    } catch (error) {

      console.log(error);

      alert("Login failed");

    }

  };

return (

  <div className="flex justify-center items-center min-h-screen">

    <div className="bg-white p-8 rounded-lg shadow-lg w-96">

      <h2 className="text-3xl font-bold mb-6 text-center">
        Login
      </h2>

      <form onSubmit={loginUser}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border p-3 mb-4 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border p-3 mb-4 rounded"
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded"
        >
          Login
        </button>

        <p className="mt-4">

          <a

            href="/forgot-password"

            className="
              text-blue-500
            "

          >

            Forgot Password?

          </a>

        </p>

      </form>

    </div>

  </div>

);

}

export default Login;