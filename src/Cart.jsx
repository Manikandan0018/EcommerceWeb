import mainImage from "./newp1.jpg"; // replace with actual image path
import thumb1 from "./newp1.jpg";
import thumb2 from "./newp1.jpg";
import thumb3 from "./newp1.jpg";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const navigate = useNavigate();
  const thumbnails = [mainImage, thumb1, thumb2, thumb3];
 const handleAddToCart = () => {
    // Optional: add logic for adding item to cart
    navigate("/Address"); // navigates to the cart page
  };
  return (
    <div className="bg-white min-h-screen p-4 md:p-8 text-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left image gallery */}
        <div className="col-span-1">
          <div className="mb-4">
            <img
              src={mainImage}
              alt="Product"
              className="w-full h-auto rounded-lg shadow"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {thumbnails.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumb-${index}`}
                className="w-16 h-16 border rounded hover:border-yellow-500 cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* Center content */}
        <div className="col-span-1 space-y-3">
          <h2 className="text-xl md:text-2xl font-semibold">
            Soch Womens Taffeta Solid Sleeveless Padded Blouse
          </h2>
          <div className="text-yellow-600 text-sm font-semibold">Amazon's Choice</div>
          <p className="text-gray-600 text-sm">50+ bought in past month</p>
          <div className="text-red-600 font-bold text-lg">-23% ₹768</div>
          <p className="text-sm text-gray-500 line-through">M.R.P: ₹998</p>
          <p className="text-sm text-gray-700">Inclusive of all taxes</p>

          {/* Offers */}
          <div className="space-y-2 bg-yellow-50 p-3 border border-yellow-200 rounded">
            <h4 className="font-semibold text-sm">Offers</h4>
            <ul className="text-sm list-disc list-inside text-gray-700">
              <li>Cashback: Upto ₹23 as Amazon Pay</li>
              <li>Bank Offer: Upto ₹1500 on HDFC</li>
              <li>Partner Offer: GST invoice available</li>
            </ul>
          </div>

          {/* Icons */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 border-t pt-3">
            <span>10 Days Return</span>
            <span>Cash on Delivery</span>
            <span>Free Delivery</span>
            <span>Top Brand</span>
          </div>

          {/* Color options */}
          <div className="mt-4">
            <h4 className="font-semibold text-sm mb-2">Colour: <span className="text-black">Black</span></h4>
            <div className="flex gap-2">
              {[thumb1, thumb2, thumb3].map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`variant-${i}`}
                  className="w-16 h-16 border rounded hover:border-blue-500 cursor-pointer"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right action box */}
        <div className="col-span-1 bg-white border rounded-lg shadow p-4 h-fit">
          <p className="text-2xl font-semibold mb-2">₹768</p>
          <p className="text-sm text-green-700">In Stock</p>
          <p className="text-xs text-gray-500 mb-2">Ships from Amazon</p>

          {/* Quantity */}
          <div className="mb-4">
            <label htmlFor="qty" className="text-sm font-medium block mb-1">Quantity</label>
            <select id="qty" className="w-full border px-2 py-1 rounded">
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>

          <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded mb-2">
            Add to Cart
          </button>
          <button onClick={ handleAddToCart} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded">
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
    </div>
  );
};
