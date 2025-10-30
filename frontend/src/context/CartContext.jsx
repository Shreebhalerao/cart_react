import { createContext, useState, useContext, useEffect } from "react";
import { getCart } from "../services/api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });

  const loadCart = async () => {
    try {
      const res = await getCart();

      // ✅ Your backend sends { success, message, cart }
      if (res.data?.success && res.data.cart) {
        setCart(res.data.cart);
      } else if (res.data?.items) {
        // fallback for older responses
        setCart(res.data);
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart, loadCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
