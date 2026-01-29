import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import OrderSuccessPopup from "./OrderSuccessPopup";

function CheckoutCart({
  items,
  deliveryPrices,
  deliveryArea,
  pickupOptions,
  setPickupPoint,
  pickupPoint,
  setDeliveryArea,
  customerName,
  setCustomerName,
  phone,
  setPhone,
  showToast,
  resetCheckout,
}) {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // ---- calculations ----
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryCost = deliveryPrices[deliveryArea] || 0;
  const total = subtotal + deliveryCost;

  const isFormValid =
    customerName.trim() !== "" &&
    phone.trim() !== "" &&
    deliveryArea.trim() !== "" &&
    pickupPoint.trim() !== "";

  const submitToBackend = async () => {
    if (submitting) return;
    setSubmitting(true);

    try {
      if (!customerName || !phone || !deliveryArea || !pickupPoint) {
        showToast("Please fill all required fields", "error");
        setSubmitting(false);
        return;
      }

      const safeItems = items.map((item) => ({
        name: item.name || "Unknown",
        price: Number(item.price) || 0,
        quantity: Number(item.quantity) || 1,
        type: item.type || "N/A",
        image: item.image || "",
      }));

      const orderData = {
        items: safeItems,
        deliveryArea: deliveryArea || "",
        deliveryCost: Number(deliveryCost) || 0,
        pickupPoint: pickupPoint || "",
        subtotal: Number(subtotal) || 0,
        total: Number(total) || 0,
        customerName: customerName || "",
        phone: phone || "",
        status: "pending",
        createdAt: Date.now(),
      };

      await addDoc(collection(db, "orders"), orderData);
      setShowSuccess(true);
      showToast("Order placed successfully!", "success");
    } catch (err) {
      console.error("Order error:", err);
      showToast("Failed to submit order", "error");
    } finally {
      setSubmitting(false);
    }
  };
  const handleClick = () => {
    setShowSuccess(true); //trigger popup
    submitToBackend();
    resetCheckout();
  };

  

  // ---- submit order ----
  // const submitToBackend = async () => {
  //   if (!isFormValid || submitting) return;

  //   setSubmitting(true);

  //   const orderData = {
  //     items: items.map((item) => ({
  //       name: item.name,
  //       price: item.price,
  //       quantity: item.quantity,
  //       type: item.type,
  //     })),
  //     deliveryArea,
  //     deliveryCost,
  //     pickupPoint,
  //     subtotal,
  //     total,
  //     customerName,
  //     phone,
  //     status: "pending",
  //     createdAt: Date.now(),
  //   };

  //   try {
  //     const token = localStorage.getItem("idToken");

  //     const res = await fetch("https://campus-glow-r1y3.onrender.com/orders", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(orderData),
  //     });

  //     if (!res.ok) throw new Error("Order failed");

  //     await res.json();
  //     showToast("Order received successfully!", "success");
  //     onPlaceOrder();
  //   } catch (err) {
  //     console.error(err);
  //     showToast("Failed to submit order", "error");
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  return (
    <>
      {/* Header */}
      <section className="section-header" onClick={() => navigate(-1)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
          <path d="M73.4 297.4C60.9 309.9 60.9 330.2 73.4 342.7L233.4 502.7C245.9 515.2 266.2 515.2 278.7 502.7L173.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L173.3 288L278.7 182.6z" />
        </svg>
        <h4>Cart Checkout</h4>
      </section>

      <div className="cartCheckout">
        {/* Items */}
        <div className="cc-list">
          {items.map((item) => (
            <div key={item.id} className="cc-items">
              <img
                src={
                  item.image || item.images || "https://placehold.co/600x400?text=Campus+Glow"
                }
                alt={item.name}
              />
              <div className="cc-items-info">
                <p>{item.name}</p>
                <p>Qty: {item.quantity}</p>
                <p>KES {item.price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Delivery */}
        <div className="c-delivery">
          <h3>Delivery Area</h3>
          <select
            value={deliveryArea}
            onChange={(e) => setDeliveryArea(e.target.value)}
          >
            <option value="">-- select area --</option>
            {Object.keys(deliveryPrices).map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>

        {/* Pickup */}
        <div className="c-pickup-point">
          <h3>Pickup Point</h3>
          <select
            value={pickupPoint}
            onChange={(e) => setPickupPoint(e.target.value)}
          >
            <option value="">-- select pickup --</option>
            {pickupOptions[deliveryArea]?.map((point) => (
              <option key={point} value={point}>
                {point}
              </option>
            ))}
          </select>
        </div>

        {/* Customer Info */}
        <div className="c-cost-breakdown">
          {" "}
          <div className="c-card-header">
            <svg
              className="c-svg"
              style={{ backgroundColor: "yellow" }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <path d="M296 88C296 74.7 306.7 64 320 64C333.3 64 344 74.7 344 88L344 128L400 128C417.7 128 432 142.3 432 160C432 177.7 417.7 192 400 192L285.1 192C260.2 192 240 212.2 240 237.1C240 259.6 256.5 278.6 278.7 281.8L370.3 294.9C424.1 302.6 464 348.6 464 402.9C464 463.2 415.1 512 354.9 512L344 512L344 552C344 565.3 333.3 576 320 576C306.7 576 296 565.3 296 552L296 512L224 512C206.3 512 192 497.7 192 480C192 462.3 206.3 448 224 448L354.9 448C379.8 448 400 427.8 400 402.9C400 380.4 383.5 361.4 361.3 358.2L269.7 345.1C215.9 337.5 176 291.4 176 237.1C176 176.9 224.9 128 285.1 128L296 128L296 88z" />
            </svg>{" "}
            <div className="c-card-header-info">
              <h3>Cost Breakdown</h3>
            </div>
          </div>
          {/* Cost Breakdown */}
          <div className="cost-breakdown-info">
            <div className="cost-breakdown-info-delivery-price">
              <p>delivery cost</p>
              <span className="c-delivery-cost">KES {deliveryCost}</span>
            </div>
            <div className="cost-breakdown-info-delivery-price ">
              <p>SubTotal</p>
              <span className="c-product-total">KES {subtotal}</span>
            </div>
            <div className="cost-breakdown-info-delivery-price ">
              <p>total</p>
              <span className="c-product-total">KES {total}</span>
            </div>
          </div>
        </div>

        <div className="cc-personal-detail">
          {/*customer details */}
          <div className="cc-name">
            <p>Name</p>
            <input
              placeholder="write your name"
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          <div className="cc-phone">
            <p>Phone</p>
            <input
              placeholder="write you phoneNumber"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        {/* Submit */}
        <div className="order-btn">
          <button
            className={`button ${
              isFormValid && !submitting ? "enabled" : "disabled"
            }`}
            disabled={!isFormValid || submitting}
            onClick={handleClick}
          >
            {submitting ? "Processing..." : "Complete Order"}
          </button>
          {showSuccess && (
            <OrderSuccessPopup
              onClose={() => setShowSuccess(false)}
              order={{ items, total }}
            />
          )}
          <span>Take a screenshot of the M-Pesa message and forward</span>
        </div>
      </div>
    </>
  );
}

export default CheckoutCart;
