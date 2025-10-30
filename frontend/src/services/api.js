import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

//  Products
export const getProducts = () => API.get("/products");

//  Cart
export const getCart = () => API.get("/cart/getCart");

// 🛒 Add to Cart
export const addToCart = (product) =>
  API.post("/cart/addToCart", {
    productId: product._id || product.id,
    qty: 1, 
    name: product.name,
    price: product.price,
  });

//  Remove from Cart
// 🗑 Remove from Cart (FIXED)
export const removeFromCart = (id) => 
  API.delete(`/cart/removeFromCart/${id}`);

 


//  Checkout (optional)
export const checkout = (data) => API.post("/checkout", data);

//  Mock checkout (for testing)
export async function mockCheckout(data) {
  const res = await fetch("http://localhost:5000/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}
