import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    items: [
      {
        product: {
          type: String, // ✅ changed from ObjectId to String
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
     totalPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
