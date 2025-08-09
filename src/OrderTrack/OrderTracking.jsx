import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader, PackageSearch } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import logo from "../eLogo.png";

const fetchUser = async () => {
  const res = await axios.get("http://localhost:5000/api/me", {
    withCredentials: true,
  });
  return res.data;
}

export const OrderTracking = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/myOrders", {
        withCredentials: true,
      })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, []);

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

    const gotoCart = () => navigate("/cart");


  return (
<>

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



    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 py-10 px-4">
      <motion.h1
        className="text-4xl font-bold text-orange-600 text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        My Orders
      </motion.h1>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-40 text-gray-500">
          <Loader className="w-6 h-6 animate-spin mb-2" />
          <p>Loading your orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 text-gray-400">
          <PackageSearch className="w-8 h-8 mb-2" />
          <p>No orders found yet.</p>
        </div>
      ) : (
        <motion.div
          className="space-y-8 max-w-6xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delayChildren: 0.2,
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {orders.map((order, i) => (
            <motion.div
              key={order._id}
              variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
              className="bg-white border border-gray-100 rounded-2xl shadow-md p-6"
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-orange-700">
                  Order #{i + 1}
                </h3>
                <p className="text-sm text-gray-600">
                  Status:{" "}
                  <span className="text-blue-600 font-medium">{order.status}</span>
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {order.cartItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.03 }}
                    className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm transition"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-36 object-cover rounded mb-3"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">₹{item.price}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      <p className="mt-2 text-sm text-green-600 font-semibold text-right">
                        Total: ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
    </>
  );
};

export default OrderTracking;
