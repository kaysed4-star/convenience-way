import {
  createContext,
  useEffect,
  useState
} from "react";

export const AuthContext =
  createContext();

function AuthProvider({ children }) {

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }

  }, []);

  const login = () => {
    setIsLoggedIn(true);
  };

const logout = () => {

  localStorage.removeItem("token");

  setIsLoggedIn(false);

  window.location.href =
    "/login";

};

  return (

    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}

export default AuthProvider;