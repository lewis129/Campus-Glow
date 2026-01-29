import { useNavigate } from "react-router-dom";

function Cart({ items, setCartItems, onBack }) {
  const navigate = useNavigate();

  // remove item
  const removeItem = (id) => {
    setCartItems(items.filter((item) => item.id !== id));
  };

  // update quantity
  const updateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeItem(id);
    } else {
      setCartItems(
        items.map((item) =>
          item.id === id ? { ...item, quantity: newQty } : item
        )
      );
    }
  };

  // calculate total
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* header */}
      <section className="section-header" onClick={onBack}>
        <h4 style={{ marginLeft: "20px" }}>My Cart</h4>
      </section>

      <section className="cart">
        {items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="cart-item-card">
            {items.map((item) => (
              <div key={item.id} className="cart-card">
                <div className="cart-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: 90,
                      height: 90,
                      objectFit: "contain",
                      marginRight: 10,
                    }}
                  />

                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.name}</p>
                    <p>KES {item.price}</p>
                  </div>
                </div>

                <div className="cart-calc">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <p>{item.quantity}</p>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                  <button onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* footer */}
        {items.length > 0 && (
          <div className="cart-finance">
            <p>
              <strong>Total: KES {total}</strong>
            </p>
            <button
              onClick={() => navigate("/checkout")}
              style={{
                marginTop: 15,
                padding: 15,
                backgroundColor: "#4caf50",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </section>
    </>
  );
}

export default Cart;
