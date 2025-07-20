import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaHeart,
  FaTruck,
  FaBolt,
  FaCrown
} from "react-icons/fa";

// Dummy Images
import newp1 from './newp1.jpg';
import newp2 from './newp2.jpg';
import newp3 from './newp3.jpg';
import newp4 from './newp4.jpg';
import newp5 from './newp5.jpg';
import newp6 from './newp6.jpg';
import newp7 from './newp7.jpg';
import newp8 from './newp8.jpg';
import newp9 from './newp9.jpg';
import { useNavigate } from "react-router-dom";

const products = [
  { name: "Elegant Evening Gown", price: "₹2,999", image: newp1 },
  { name: "Casual Denim Jacket", price: "₹1,499", image: newp2 },
  { name: "Summer Floral Dress", price: "₹1,199", image: newp3 },
  { name: "Classic Black Blazer", price: "₹2,299", image: newp4 },
  { name: "Elegant Evening Gown", price: "₹2,999", image: newp5 },
  { name: "Casual Denim Jacket", price: "₹1,499", image: newp6 },
  { name: "Summer Floral Dress", price: "₹1,199", image: newp7 },
  { name: "Classic Black Blazer", price: "₹2,299", image: newp8 },
  { name: "Classic Black Blazer", price: "₹1,299", image: newp9 },
];


  

export const LaunchNew = () => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState([]);

  const toggleLike = (index) => {
    setLiked((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const handleAddToCart = () => {
    // Optional: add logic for adding item to cart
    navigate("/cart"); // navigates to the cart page
  };

  return (
    <section className="bg-white py-10 px-6">
      <h2 className="text-3xl font-bold text-center text-orange-500 mb-8">
        New Product Launches
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition-transform hover:scale-[1.02] relative"
          >
            {/* Like */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-orange-500"
              onClick={() => toggleLike(index)}
            >
              <FaHeart
                className={liked.includes(index) ? "fill-orange-500" : ""}
              />
            </button>

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover rounded-t-lg"
            />

            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-orange-600 font-bold">{product.price}</p>

              <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                <span className="flex items-center gap-1 bg-orange-100 px-2 py-0.5 rounded-full">
                  <FaTruck className="text-sm" /> Free Delivery
                </span>
                <span className="flex items-center gap-1 bg-orange-100 px-2 py-0.5 rounded-full">
                  <FaBolt className="text-sm" /> Fast Delivery
                </span>
                <span className="flex items-center gap-1 bg-orange-100 px-2 py-0.5 rounded-full">
                  <FaCrown className="text-sm" /> Prime
                </span>
              </div>

              <button onClick={handleAddToCart} className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md text-sm">
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
