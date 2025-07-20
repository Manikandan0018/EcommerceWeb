import React from 'react'

export const Footer = () => {
  return (
    <>
    <footer className="bg-black text-white py-10 px-6 sm:px-12 lg:px-24">
  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

    {/* Logo & About */}
    <div>
      <h2 className="text-2xl font-bold text-orange-400 mb-3">FurniHub</h2>
      <p className="text-sm text-gray-300">
        Discover modern furniture with style and comfort. Shop with confidence and elegance.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-lg font-semibold text-orange-300 mb-3">Quick Links</h3>
      <ul className="space-y-2 text-sm text-gray-400">
        <li><a href="#" className="hover:text-white transition">About Us</a></li>
        <li><a href="#" className="hover:text-white transition">Contact</a></li>
        <li><a href="#" className="hover:text-white transition">FAQs</a></li>
        <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
      </ul>
    </div>

    {/* Categories */}
    <div>
      <h3 className="text-lg font-semibold text-orange-300 mb-3">Categories</h3>
      <ul className="space-y-2 text-sm text-gray-400">
        <li><a href="#" className="hover:text-white transition">Living Room</a></li>
        <li><a href="#" className="hover:text-white transition">Bedroom</a></li>
        <li><a href="#" className="hover:text-white transition">Dining</a></li>
        <li><a href="#" className="hover:text-white transition">Office</a></li>
      </ul>
    </div>

    {/* Newsletter */}
    <div>
      <h3 className="text-lg font-semibold text-orange-300 mb-3">Newsletter</h3>
      <p className="text-sm text-gray-300 mb-3">Subscribe for latest updates</p>
      <form className="flex flex-col sm:flex-row items-center gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-3 py-2 rounded bg-gray-800 text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
        >
          Subscribe
        </button>
      </form>
    </div>
  </div>

  <hr className="my-8 border-gray-700" />

  {/* Bottom copyright */}
  <div className="text-center text-sm text-gray-500">
    &copy; {new Date().getFullYear()} FurniHub. All rights reserved.
  </div>
</footer>


    </>
  )
}
