import { useEffect } from "react";


export default function OrderSuccessPopup({ onClose, order }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 800000); // auto close after 8 sec

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="success-overlay">
      <div className="success-card">
        <div className="checkmark">✓</div>

        <h2>Order Successful!</h2>
        <p>Your Campus Glow package is on the way ✨</p>

        <div className="order-summary">
          <p><strong>Items:</strong> {order?.items?.length || 0}</p>
          <p><strong>Total:</strong> KES {order?.total}</p>
        </div>

        <button onClick={onClose}>
          Continue Shopping
        </button>

        <div className="glitter-container">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className="glitter"></span>
          ))}
        </div>
      </div>
    </div>
  );
}
