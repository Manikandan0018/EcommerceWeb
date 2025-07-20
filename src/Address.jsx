import { useState } from "react";
import { PaymentOption } from "./PaymentOption";

export const Address = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const fields = [
    { label: "Full Name", type: "text" },
    { label: "Phone Number", type: "tel" },
    { label: "Pincode", type: "text" },
    { label: "City / Town", type: "text" },
    { label: "State", type: "text" },
    { label: "Address (Area and Street)", type: "text", full: true },
    { label: "Landmark (Optional)", type: "text", full: true },
    { label: "Alternate Phone (Optional)", type: "text" },
  ];

  return (
    <>
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white px-4 md:px-6 py-4 shadow flex items-center justify-between gap-4">
        {/* Brand */}
        <h1 className="text-3xl font-extrabold text-orange-500">Efyer</h1>

        {/* Hamburger Button (for mobile) */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>

        {/* Search + Language/Cart (Desktop only) */}
        <div className="hidden md:flex gap-6 items-center w-full md:w-auto">
          {/* Search */}
          <div className="flex gap-2 w-full md:w-[20rem]">
            <select className="border border-gray-300 px-2 py-2 rounded-l bg-gray-100 text-sm">
              <option>All Category</option>
            </select>
            <input
              type="text"
              placeholder="Search this blog"
              className="w-full border border-gray-300 px-4 py-2"
            />
            <button className="bg-orange-500 text-white px-4 py-2 rounded-r">
              🔍
            </button>
          </div>

          {/* Language + Cart */}
          <div className="flex items-center gap-4">
            <select className="border border-gray-300 px-2 py-1 rounded text-sm">
              <option>English</option>
            </select>
            <span className="flex gap-1 text-gray-700 hover:text-orange-500 cursor-pointer">
              🛒 CART
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Search / Cart dropdown */}
      {showMobileMenu && (
        <div className="md:hidden bg-white shadow px-4 pb-4">
          <div className="flex gap-2 mt-2">
            <select className="border border-gray-300 px-2 py-2 rounded-l bg-gray-100 text-sm">
              <option>All Category</option>
            </select>
            <input
              type="text"
              placeholder="Search"
              className="w-full border border-gray-300 px-4 py-2"
            />
            <button className="bg-orange-500 text-white px-4 py-2 rounded-r">
              🔍
            </button>
          </div>

          <div className="flex items-center justify-between mt-4">
            <select className="border border-gray-300 px-2 py-1 rounded text-sm">
              <option>English</option>
            </select>
            <span className="flex gap-1 text-gray-700 hover:text-orange-500 cursor-pointer">
              🛒 CART
            </span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex mt-10 flex-col lg:flex-row gap-8 px-4 py-10 bg-gray-100 justify-center items-start">
        {/* Address Form */}
        <div className="bg-white w-full lg:w-2/3 p-6 md:p-10 rounded-2xl shadow-xl animate-fadeIn">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span>📍</span> Delivery Address
          </h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map((field, idx) => (
              <div key={idx} className={`relative group ${field.full ? "md:col-span-2" : ""}`}>
                <input
                  type={field.type}
                  required={!field.label.includes("Optional")}
                  placeholder=" "
                  className="peer w-full px-4 pt-5 pb-2 text-sm border border-gray-300 rounded-md bg-white text-gray-800 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                />
                <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all duration-200 peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-orange-500">
                  {field.label}
                </label>
              </div>
            ))}

            <button
              type="submit"
              className="w-full md:col-span-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
            >
              🚚 Save Delivery Address
            </button>
          </form>
        </div>

        {/* Payment Option Component */}
        <div className="w-full lg:w-1/3">
          <PaymentOption />
        </div>
      </div>
    </>
  );
};
