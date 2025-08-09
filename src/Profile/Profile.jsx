import { useEffect, useState } from "react";
import axios from "axios";

export const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    shippingAddress: {
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/me", { withCredentials: true })
      .then((res) => {
        setUser(res.data);
        setFormData({
          name: res.data.fullName,
          email: res.data.email,
          shippingAddress: res.data.shippingAddress || {
            address: "",
            city: "",
            state: "",
            zip: "",
            country: "",
          },
        });
      })
      .catch((err) => console.error("Fetch failed", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["address", "city", "state", "zip", "country"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        shippingAddress: {
          ...prev.shippingAddress,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:5000/api/profile/update",
        {
          fullName: formData.name,
          email: formData.email,
          shippingAddress: formData.shippingAddress,
        },
        { withCredentials: true }
      );
      setUser(res.data);
      setEditMode(false);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  if (!user) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 mt-6 shadow-xl rounded-xl bg-white print:shadow-none print:p-0">
      <h2 className="text-3xl font-bold mb-4 text-center text-orange-500">My Profile</h2>

      {!editMode ? (
        <div className="space-y-4">
          <p><strong>Name:</strong> {user.fullName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <div className="border-t pt-4">
            <h3 className="text-xl font-semibold mb-2">Shipping Address</h3>
            <p>{user.shippingAddress?.address}</p>
            <p>{user.shippingAddress?.city}, {user.shippingAddress?.state}</p>
            <p>{user.shippingAddress?.zip}, {user.shippingAddress?.country}</p>
          </div>
          <div className="mt-4 flex gap-4 print:hidden">
            <button
              onClick={() => setEditMode(true)}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            >
              Edit Profile
            </button>
            <button
              onClick={() => window.print()}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Print Profile
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 print:hidden">
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              disabled
              value={formData.email}
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.shippingAddress.address}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">City</label>
              <input
                type="text"
                name="city"
                value={formData.shippingAddress.city}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">State</label>
              <input
                type="text"
                name="state"
                value={formData.shippingAddress.state}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">ZIP</label>
              <input
                type="text"
                name="zip"
                value={formData.shippingAddress.zip}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Country</label>
              <input
                type="text"
                name="country"
                value={formData.shippingAddress.country}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
