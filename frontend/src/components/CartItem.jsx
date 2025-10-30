export default function CartItem({ item, onRemove }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-200">
      <div>
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-gray-500">₹{item.price} * {item.qty}</p>
      </div>

      <div className="flex items-center gap-4">
        <p className="font-semibold text-gray-800">
          ₹{item.price * item.qty}
        </p>
        <button
          onClick={onRemove}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
