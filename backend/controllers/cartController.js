 import Cart from "../models/cartModel.js";
import products from "../data/products.js"; // ✅ Use hardcoded data

export const addToCart = async (req, res) => {
  try {
    const { productId, qty, name, price } = req.body;

    if (!productId || !qty || !name || !price) {
      return res.status(400).json({
        success: false,
        message: "All fields are required to add the product to the cart",
      });
    }

    const product = products.find((p) => p.id === Number(productId)); // ✅ use array
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    let cart = await Cart.findOne(); // ✅ No callback
    if (!cart) {
      cart = new Cart({ items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === String(productId)
    );

    if (existingItem) {
      existingItem.qty += Number(qty);
    } else {
      cart.items.push({
        product: productId,
        name,
        price,
        qty: Number(qty),
      });
    }
   cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.qty, 0);


    await cart.save();
    console.log(cart)
    res.status(201).json({
      
      success: true,
      message: "Item added to cart successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding item to cart",
      error: error.message,
    });
  }
};



export const getCart = async (req, res) => {
  try {
    //find the cart
    const cart = await Cart.findOne().populate("items.product");

    if (!cart) {
      return res.status(200).json({ success: true, items: [], total: 0 });
    }
    //to find the total
    const total = cart.items.reduce((acc, item) => {
      if (item.product) {
        return acc + item.product.price * item.qty;
      }
      return acc;
    }, 0);
    //return the reponce
    res.status(200).json({
      success: true,
      items: cart.items,
      total,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching cart",
      error: error.message,
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params; // since you’re sending it in URL
    const cart = await Cart.findOne();

    console.log("🛒 Cart Items:", cart.items);
    console.log("🆔 ID from frontend:", id);

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const existingItem = cart.items.find(
      (item) => item._id.toString() === id
    );

    if (!existingItem) {
      return res.status(404).json({ success: false, message: "Item not found in cart" });
    }

    cart.items = cart.items.filter(
      (item) => item._id.toString() !== id
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error removing item",
      error: error.message,
    });
  }
};

