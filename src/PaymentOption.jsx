// components/PaymentOptions.jsx
export const PaymentOption = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">💳 Payment Options</h2>
      
      <div className="space-y-4">
        {[
          { label: "Cash on Delivery", icon: "💵" },
          { label: "Credit / Debit Card", icon: "💳" },
          { label: "UPI (PhonePe, GPay, etc.)", icon: "📱" },
          { label: "Net Banking", icon: "🏦" },
        ].map((option, idx) => (
          <label
            key={idx}
            className="flex items-center justify-between p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 transition-all duration-200"
          >
            <div className="flex items-center gap-3 text-gray-700 font-medium">
              <input
                type="radio"
                name="payment"
                className="accent-orange-500 w-5 h-5"
              />
              <span className="text-base">{option.icon} {option.label}</span>
            </div>
          </label>
        ))}
      </div>

      <button className="btn-animated w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg shadow hover:shadow-md transition duration-300 ease-in-out">
        🔐 Proceed to Payment
      </button>
    </div>
  );
}
