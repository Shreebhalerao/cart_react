import React, { useEffect, useState } from "react";
import { getProducts, addToCart } from "../services/api";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

const Home = () => {
  const [products, setProducts] = useState([]);
   const { loadCart } = useCart(); 

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProducts();
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    console.log("Adding to cart:", product); // 👈 should log product details

    try {
      const res = await addToCart(product);
      console.log("Added to cart:", res.data);
      await loadCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-6">
     {products.map((product) => (
  <ProductCard
    key={product._id || product.id}   // ✅ Unique key added
    product={product}
    onAdd={() => handleAddToCart(product)}
  />
))}

    </div>
  );
};

export default Home;
