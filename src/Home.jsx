import { LaunchNew } from "./LaunchNew";
import banner from "./c1.jpg"; // Replace with the hero image from your design
import ban1 from "./ban1.png"; // Replace with the hero image from your design
import { Footer } from "./Footer";
import { useNavigate } from "react-router-dom";


export const Home = () => {

  const navigate = useNavigate();
   const handleAddToCart = () => {
    navigate("/adminProduct"); 
  };

  return (
    <div className="font-sans bg-white text-gray-800">
      {/* Top Nav */}
      <div className="bg-black text-white text-sm px-6 py-2 flex justify-between">
        <div className="flex gap-6">
          <span className="hover:text-orange-400 cursor-pointer">Best Sellers</span>
          <span className="hover:text-orange-400 cursor-pointer">Gift Ideas</span>
          <span className="hover:text-orange-400 cursor-pointer">New Releases</span>
          <span className="hover:text-orange-400 cursor-pointer">Today's Deals</span>
          <span onClick={handleAddToCart} className="hover:text-orange-400 cursor-pointer">Admin</span>
        </div>
      </div>

      {/* Logo + Search + Language + Cart */}
      <div className="bg-white px-6 py-4 shadow flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-4xl font-extrabold text-orange-500">Efyer</h1>

        <div className="flex gap-2 w-full md:w-2/5">
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

        <div className="flex items-center gap-4">
          <select className="border border-gray-300 px-2 py-1 rounded text-sm">
            <option>English</option>
          </select>
          <span className="flex gap-1 text-gray-700 hover:text-orange-500 cursor-pointer">
            🛒 CART
          </span>
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
          <h2 className="text-4xl sm:text-6xl font-bold mb-3">
            GET START
          </h2>
          <h3 className="text-3xl sm:text-5xl font-bold mb-6">
            YOUR FAVRIOT SHOPING
          </h3>
          <button className="bg-black text-white py-3 px-6 rounded text-lg hover:bg-orange-600 transition">
            BUY NOW
          </button>
        </div>
      </section>

      {/* Fashion Section Title */}
      <div className="text-center py-10">
        <h2 className="text-3xl font-bold">Man & Woman Fashion</h2>
      </div>

      <LaunchNew />

     <div className="flex justify-center w-full bg-gray-200 px-4 py-6 md:px-12 lg:px-24">
  <img
    src={ban1}
    className="w-full max-w-6xl h-auto object-contain"
    alt="banner"
  />
</div>

<Footer/>






    </div>
  );
};
