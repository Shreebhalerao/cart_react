import { useCart } from "../context/CartContext";
import { removeFromCart } from "../services/api";
import CartItem from "../components/CartItem";

export default function Cart() {
 
  const { cart, loadCart } = useCart();

  const handleRemove = async (cartItemId) => {
    console.log("🆔 Removing cart item:", cartItemId); // Debug log
    await removeFromCart(cartItemId);
    await loadCart();
  };

  return (
    
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">🛒 Your Cart</h1>

      {cart.items.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty!</p>
      ) : (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-4">
          {cart.items.map((item, index) => (
            <CartItem
              key={item._id || index}
              item={item}
              onRemove={() => handleRemove(item._id)} // ✅ use _id of cart item
            />
          ))}

          <div className="border-t pt-4 mt-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Total:</h2>
            <span className="text-2xl font-bold text-green-700">
              ₹{cart.totalPrice ||999}
            </span>
          </div>

          <div className="mt-6 text-right">
            <a
              href="/checkout"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Proceed to Checkout →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

