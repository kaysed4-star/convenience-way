import { useState } from "react";
import api from "../api";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {

    e.preventDefault();

    try {

      const response = await api.post(
        "/users/register",
        {
          name,
          email,
          password
        }
      );

      console.log(response.data);

      alert("User registered successfully!");

    } catch (error) {

      console.log(error);

      alert("Registration failed");

    }

  };

  return (

    <div>

      <h2>Register</h2>

      <form onSubmit={registerUser}>

        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />
        </div>

        <br />

        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />
        </div>

        <br />

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />
        </div>

        <br />

        <button type="submit">
          Register
        </button>

      </form>

    </div>

  );

}

export default Register;