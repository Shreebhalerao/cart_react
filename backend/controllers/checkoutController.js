import Cart from "../models/cartModel.js";

// 🧾 Mock Checkout
export const checkout = async (req, res) => {
  try {
    const { cartItems } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total
    const total = cartItems.reduce(
      (acc, item) => acc + item.product.price * item.qty,
      0
    );

    // Mock receipt
    const receipt = {
      total,
      timestamp: new Date().toISOString(),
      message: "Order placed successfully! (Mock Checkout)",
    };

    // Optionally, clear the cart after checkout
    await Cart.deleteMany();

    res.status(200).json(receipt);
  } catch (error) {
    res.status(500).json({ message: "Error during checkout", error: error.message });
  }
};
