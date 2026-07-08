import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import ProtectedRoute from "./components/ProtectedRoute"; 

import { useContext } from "react";

import {
  AuthContext
} from "./context/AuthContext";

import {
  CartContext
} from "./context/CartContext";

import Cart from "./pages/Cart";

import Admin from "./pages/Admin";

import Checkout from "./pages/Checkout";


import jwtDecode from "jwt-decode";

import Success from "./pages/Success";

import Cancel from "./pages/Cancel";

import MyOrders
  from "./pages/MyOrders";

import AdminOrders
  from "./pages/AdminOrders";

import ForgotPassword
from "./pages/ForgotPassword";

import ResetPassword
  from "./pages/ResetPassword";

import ServiceCategories
  from "./pages/ServiceCategories";

import ProviderOnboarding
  from "./pages/ProviderOnboarding";

import BookService
  from "./pages/BookService";

import ServiceBookings
  from "./pages/ServiceBookings";

import ProviderDashboard
  from "./pages/ProviderDashboard";

import AdminProviders
  from "./pages/AdminProviders";
  
function App() {

const {
  isLoggedIn,
  logout
} = useContext(AuthContext);  

const { cartItems } =
  useContext(CartContext);

  const token =
  localStorage.getItem("token");

let isAdmin = false;

if (token) {

  const decoded =
    jwtDecode(token);

  isAdmin =
    decoded.isAdmin;

}

  return (

    <BrowserRouter>

      <div className="min-h-screen bg-gray-100">

        <h1>Convenience Way</h1>

<nav className="bg-black text-white p-4 flex gap-4 items-center">

  <Link to="/">
    Home
  </Link>

  <Link to="/services">
    Services
  </Link>


  {!isLoggedIn && (

    <>

      <Link to="/login">
        Login
      </Link>

      <Link to="/register">
        Register
      </Link>

    </>

  )}

{isAdmin && (

  <>

    <Link to="/admin">
      Admin
    </Link>

    <Link to="/admin/orders">
      Orders Dashboard
    </Link>

    <Link to="/admin/providers">
      Providers
    </Link>

  </>

)}

<Link to="/my-orders">
  My Orders
</Link>

<Link to="/service-bookings">
  Service Bookings
</Link>

  {isLoggedIn && (

    <>

      <Link to="/dashboard">
        Dashboard
      </Link>

      <Link to="/provider-onboarding">
        Become a Provider
      </Link>

      <Link to="/provider-dashboard">
        Provider Dashboard
      </Link>

        <Link to="/cart">

  Cart ({cartItems.length})

</Link>

      <button
        onClick={logout}
        className="bg-red-500 px-3 py-1 rounded"
      >
        Logout
      </button>

    </>




  )}

</nav>

        <hr />

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/services"
            element={<ServiceCategories />}
          />

          <Route
            path="/provider-onboarding"
            element={
              <ProtectedRoute>
                <ProviderOnboarding />
              </ProtectedRoute>
            }
          />

          <Route
            path="/book/:providerId"
            element={
              <ProtectedRoute>
                <BookService />
              </ProtectedRoute>
            }
          />

          <Route
            path="/service-bookings"
            element={
              <ProtectedRoute>
                <ServiceBookings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/provider-dashboard"
            element={
              <ProtectedRoute>
                <ProviderDashboard />
              </ProtectedRoute>
            }
          />


          <Route
             path="/cart"
             element={<Cart />}
          
          />

          <Route
               path="/checkout"
                element={<Checkout />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

            <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route

            path="/admin"

            element={

              isAdmin
                ? <Admin />
                : <Login />

            }

          />


          <Route
            path="/success"
            element={<Success />}
          />

          <Route
            path="/cancel"
            element={<Cancel />}
          />

          <Route
            path="/my-orders"
            element={<MyOrders />}
          />

          <Route
            path="/admin/orders"
            element={<AdminOrders />}
          />

          <Route
            path="/admin/providers"
            element={
              isAdmin
                ? <AdminProviders />
                : <Login />
            }
          />

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          <Route

            path="/reset-password/:token"

            element={
              <ResetPassword />
            }

          />
          

        </Routes>

      </div>

    </BrowserRouter>

    

  );

}

export default App;
