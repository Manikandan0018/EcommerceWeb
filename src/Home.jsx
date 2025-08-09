import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { LaunchNew } from "./LaunchNew.jsx";
import { Footer } from "./Footer";
import logo from "./eLogo.png";
import banner from "./c1.jpg";
import ban1 from "./ban1.png";

// === Fetch user info from backend ===
const fetchUser = async () => {
  const res = await axios.get("http://localhost:5000/api/me", {
    withCredentials: true,
  });
  return res.data;
};

export const Home = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const navigate = useNavigate();

  // Get logged-in user info
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  // Get cart items
  const {
    data: cartItems = [],
  } = useQuery({
    queryKey: ["cartItems"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/api/MyCartProduct/getMyCart", {
        withCredentials: true,
      });
      return res.data;
    },
  });

  const gotoCart = () => navigate("/cart");

  const logout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/logout",
        {},
        { withCredentials: true }
      );
      console.log(res.data.message || "Logged out successfully");
      navigate("/login");
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Logout failed";
      console.error(errorMsg);
      alert(errorMsg);
    }
  };

  return (
    <div className="font-sans bg-white text-gray-800 relative">
      {/* Overlay when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* === Sidebar === */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col gap-4">
          {user ? (
  <span className="text-sm text-orange-600 font-semibold block">
    👋 Hi, {user.fullName}
  </span>
) : (
  <button
    onClick={() => navigate("/login")}
    className="text-sm text-orange-500 hover:underline block"
  >
    Login
  </button>
)}

          {!user && (
            <button
              onClick={() => {
                navigate("/login");
                toggleSidebar();
              }}
              className="text-left text-orange-500"
            >
              Login
            </button>
          )}

          {user && (
            <button
              onClick={async () => {
                toggleSidebar();
                await logout();
              }}
              className="text-left text-orange-500"
            >
              Logout
            </button>
          )}

          <button
            onClick={() => {
              navigate("/support");
              toggleSidebar();
            }}
            className="text-left text-orange-500"
          >
            Support
          </button>
          <button
            onClick={() => {
              navigate("/order-tracking");
              toggleSidebar();
            }}
            className="text-left text-orange-500"
          >
            Order History
          </button>
          <button
            onClick={() => {
              navigate("/profile");
              toggleSidebar();
            }}
            className="text-left text-orange-500"
          >
            Settings
          </button>
          <button
            onClick={toggleSidebar}
            className="text-left text-gray-500 mt-4"
          >
            Close
          </button>
        </div>
      </div>

      {/* === Navbar === */}
      <div className="bg-white px-4 md:px-6 py-4 shadow w-full">
        {/* === Mobile Navbar === */}
        <div className="flex items-center justify-between md:hidden">
          <button
            className="text-2xl text-gray-700 hover:text-orange-500"
            onClick={toggleSidebar}
          >
            ☰
          </button>
          <div className="flex-1 flex justify-center">
            <img src={logo} alt="Efyer Logo" className="h-8 object-contain" />
          </div>
          <div
            onClick={gotoCart}
            className="relative cursor-pointer text-gray-700 hover:text-orange-500"
          >
            <span className="text-xl">🛒</span>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1">
                {cartItems.length}
              </span>
            )}
          </div>
        </div>

        {/* === Search (Mobile) === */}
        <div className="mt-3 mb-1 md:hidden">
          <div className="flex items-center border border-[#1e1e2d] rounded-full px-4 py-2">
            <input
              type="text"
              placeholder="Search for anything"
              className="flex-1 bg-transparent text-sm placeholder-gray-400 focus:outline-none"
            />
            <button className="text-xl text-black hover:text-orange-500">
              🔍
            </button>
          </div>
        </div>

        {/* === Desktop Navbar === */}
        <div className="hidden md:flex flex-row items-center justify-between gap-4">
          <img
            src={logo}
            alt="Efyer Logo"
            className="h-10 md:h-12 object-contain"
          />

          <div>
            <p
              onClick={() => navigate("/AdminProduct")}
              className="cursor-pointer text-orange-500 hover:underline hidden lg:block"
            >
              Admin
            </p>
          </div>

          {/* Search & Category */}
          <div className="flex flex-row gap-2 w-full md:w-2/5">
            <select
              onChange={(e) => {
                const selected = e.target.value;
                if (selected) navigate(selected);
              }}
              className="border border-gray-300 px-3 py-2 rounded bg-gray-100 text-sm"
            >
              <option value="">All Category</option>
              <option value="/menCategory">Men Product</option>
              <option value="/womenCategory">Women Product</option>
              <option value="/childCategory">Child Product</option>
            </select>
            <div className="flex w-full">
              <input
                type="text"
                placeholder="Search"
                className="w-full border border-gray-300 px-4 py-2 text-sm"
              />
              <button className="bg-orange-500 text-white px-4 py-2 text-sm">
                🔍
              </button>
            </div>
          </div>

          {/* Cart & User */}
          <div className="flex items-center gap-4">
            <div
              onClick={gotoCart}
              className="relative flex items-center text-gray-700 hover:text-orange-500 cursor-pointer"
            >
              <span className="text-xl">🛒</span>
              <span className="ml-1 text-sm font-medium hidden sm:inline">
                Cart
              </span>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                  {cartItems.length}
                </span>
              )}
            </div>

            {/* Show username or login button */}
            {user ? (
              <span className="text-sm text-orange-600 font-semibold hidden lg:block">
                👋 Hi, {user.fullName}
              </span>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="text-sm text-orange-500 hover:underline hidden lg:block"
              >
                Login
              </button>
            )}

            {user && (
              <button
                onClick={logout}
                className="text-sm text-orange-500 hover:underline hidden lg:block"
              >
                Logout
              </button>
            )}

            <button
              onClick={() => navigate("/support")}
              className="text-sm text-orange-500 hover:underline hidden lg:block"
            >
              Support
            </button>
            <button
              onClick={() => navigate("/order-tracking")}
              className="text-sm text-orange-500 hover:underline hidden lg:block"
            >
              Order History
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="text-sm text-orange-500 hover:underline hidden lg:block"
            >
              Settings
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section
        className="relative h-[80vh] flex items-center justify-center text-white text-center"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-black/40 p-6 sm:p-10 rounded-xl">
          <h2 className="text-4xl sm:text-6xl font-bold mb-3">GET START</h2>
          <h3 className="text-3xl sm:text-5xl font-bold mb-6">
            YOUR FAVRIOT SHOPING
          </h3>
          <button className="bg-black text-white py-3 px-6 rounded text-lg hover:bg-orange-600 transition">
            BUY NOW
          </button>
        </div>
      </section>

      {/* Fashion Title */}
      <div className="text-center py-10">
        <h2 className="text-3xl font-bold">Man & Woman Fashion</h2>
      </div>

      <LaunchNew />

      {/* Banner */}
      <div className="flex justify-center w-full bg-gray-200 px-4 py-6 md:px-12 lg:px-24">
        <img
          src={ban1}
          className="w-full max-w-6xl h-auto object-contain"
          alt="banner"
        />
      </div>

      <Footer />
    </div>
  );
};
