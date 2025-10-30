import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-700">
        🛍 Vibe Commerce
      </Link>

      <div className="space-x-6">
        <Link to="/" className="hover:text-blue-700">Products</Link>
        <Link to="/cart" className="hover:text-blue-700">
          Cart ({cart?.items?.length || 0})
        </Link>
        <Link to="/checkout" className="hover:text-blue-700">Checkout</Link>
      </div>
    </nav>
  );
}
