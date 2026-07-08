import {
  useEffect,
  useState
} from "react";

import api from "../api";

function Dashboard() {

  const [user, setUser] =
    useState(null);

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const token =
          localStorage.getItem("token");

        const response =
          await api.get(
            "/users/profile",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        console.log(response.data);

        setUser(response.data.user);

      } catch (error) {

        console.log(error);

      }

    };

    fetchProfile();

  }, []);

return (

  <div className="p-10">

    <div className="bg-white p-8 rounded-lg shadow-lg">

      <h1 className="text-4xl font-bold mb-6">
        Dashboard
      </h1>

      {user ? (

        <div>

          <h2 className="text-2xl mb-4">
            Welcome {user.name}
          </h2>

          <p className="text-gray-700">
            Email: {user.email}
          </p>

        </div>

      ) : (

        <p>Loading...</p>

      )}

    </div>

  </div>

);

}

export default Dashboard;