import { useState } from "react";
import { useCart } from "../context/CartContext";
import { mockCheckout } from "../services/api";

export default function Checkout() {
  const { cart, loadCart } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

 const handleCheckout = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  try {
    // ✅ Include cart items in the request body
    const res = await mockCheckout({
      name,
      email,
      address,
      cartItems: cart.items,
    });

    setMessage(res.message || "Order placed successfully!");
    await loadCart(); // clear the cart after mock checkout
  } catch (err) {
    console.error("Checkout error:", err);
    setMessage("Something went wrong!");
  } finally {
    setLoading(false);
  }
};


  if (cart.items.length === 0)
    return (
      <div className="text-center p-6">
        <h2 className="text-xl font-semibold">Your cart is empty 🛒</h2>
        <a href="/" className="text-blue-600 underline mt-4 block">
          Go Shopping
        </a>
      </div>
    );

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-2xl">
      <h1 className="text-2xl font-bold mb-4 text-center">Checkout</h1>

      <form onSubmit={handleCheckout} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border rounded-lg px-4 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          className="w-full border rounded-lg px-4 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Shipping Address"
          className="w-full border rounded-lg px-4 py-2"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        ></textarea>

        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold">
            Total: <span className="text-green-700">₹{cart.totalPrice || 999}</span>
          </p>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
            disabled={loading}
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </div>
      </form>

      {message && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
          <p className="text-blue-800 font-medium">{message}</p>
        </div>
      )}
    </div>
  );
}
