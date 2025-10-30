export default function ProductCard({ product, onAdd }) {
  if (!product) return null; // safety check

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg p-4 flex flex-col items-center transition-transform transform hover:-translate-y-1">
      <div className="h-40 w-40 bg-gray-100 flex items-center justify-center rounded-md mb-4">
        <span className="text-4xl">🛒</span>
      </div>

      <h3 className="text-lg font-semibold text-gray-800 text-center">
        {product.name || "Unnamed Product"}
      </h3>
      <p className="text-gray-600 mb-3">₹{product.price ?? "N/A"}</p>

      <button
        onClick={onAdd}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200"
      >
        Add to Cart
      </button>
    </div>
  );
}
