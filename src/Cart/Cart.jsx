import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FaTruck, FaBolt, FaCrown } from "react-icons/fa";


export const Cart = () => {
  const navigate = useNavigate();

    const { data: cartItems = [],isLoading } = useQuery({
  queryKey: ["cartItems"],
  queryFn: async () => {
    const res = await axios.get('http://localhost:5000/api/MyCartProduct/getMyCart', {
      withCredentials: true,
    });
    return res.data;
  },
});

  const [selectedImages, setSelectedImages] = useState({});

  useEffect(() => {
    if (cartItems.length > 0) {
      const defaults = {};
      cartItems.forEach((item) => {
        defaults[item._id] = item.image;
      });
      setSelectedImages(defaults);
    }
  }, [cartItems]);

  const handleBuyNow = () => {
    navigate("/Address");
  };

  return (
    <div className="bg-white min-h-screen p-4 md:p-8 text-gray-800">
      {isLoading ? (
        <p className="text-center text-lg font-semibold">Loading cart items...</p>
      ) : cartItems.length === 0 ? (
        <p className="text-center text-lg">Your cart is empty.</p>
      ) : (
        <div className="space-y-20 max-w-7xl mx-auto">
          {cartItems.map((product, idx) => (
            <div
              key={product._id}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b pb-8"
            >
              {/* LEFT: Image Gallery */}
              <div>
                <img
                  src={selectedImages[product._id]}
                  alt="Selected"
                  className="w-full h-auto rounded-lg shadow"
                />
                <div className="flex gap-2 overflow-x-auto mt-4">
                  {[product.image].map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`thumb-${index}`}
                      className={`w-16 h-16 border rounded cursor-pointer ${
                        selectedImages[product._id] === img ? "border-yellow-500" : ""
                      }`}
                      onClick={() =>
                        setSelectedImages((prev) => ({
                          ...prev,
                          [product._id]: img,
                        }))
                      }
                    />
                  ))}
                </div>
              </div>

              {/* CENTER: Product Info */}
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold">{product.name}</h2>
                <div className="text-yellow-600 text-sm font-semibold">Efyer Choice</div>
                <p className="text-gray-600 text-sm">50+ bought recently</p>
                <div className="text-red-600 font-bold text-lg">₹{product.price}</div>
                <p className="text-sm text-gray-500 line-through">M.R.P: ₹998</p>
                <p className="text-sm text-gray-700">Inclusive of all taxes</p>

                <div className="space-y-2 bg-yellow-50 p-3 border border-yellow-200 rounded">
                  <h4 className="font-semibold text-sm">Offers</h4>
                  <ul className="text-sm list-disc list-inside text-gray-700">
                    <li>Cashback: Upto ₹23 as Efyer Pay</li>
                    <li>Bank Offer: Upto ₹1500 off</li>
                    <li>GST invoice available</li>
                  </ul>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600 border-t pt-3">
                  <span>10 Days Return</span>
                  <span>Cash on Delivery</span>
                  <span>Free Delivery</span>
                  <span>Top Brand</span>
                </div>
              </div>

              {/* RIGHT: Buy Box */}
              <div className="bg-white border rounded-lg shadow p-4 h-fit">
                <p className="text-2xl font-semibold mb-2">₹{product.price}</p>
                <p className="text-sm text-green-700">In Stock</p>
                <p className="text-xs text-gray-500 mb-2">Ships securely</p>

                <div className="mb-4">
                  <label htmlFor={`qty-${idx}`} className="text-sm font-medium block mb-1">
                    Quantity
                  </label>
                  <select id={`qty-${idx}`} className="w-full border px-2 py-1 rounded">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                </div>

                <button
                  onClick={handleBuyNow}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded"
                >
                  Buy Now
                </button>

                <div className="mt-3">
                  <label className="inline-flex items-center text-sm">
                    <input type="checkbox" className="mr-2" />
                    Add gift options
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
