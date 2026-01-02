import Category from "../Category";

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
  onBack,
  showToast,
  setActive,
  onPlaceOrder,
}) {
  
  const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    )

  const submitToBackend = async ()=>{
    const orderData = {
        items:items.map ((item)=>({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            type: item.type,
        })),
      deliveryArea,
      deliveryCost,
      pickupPoint,
      total,
      subtotal,
      customerName,
      phone,
    };
    try{
      const res = await fetch(
      "https://campus-glow-r1y3.onrender.com/order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData),
      }
    )
    const data = await res.json()
    console.log ("response from google:", data)
    showToast("order recieved by backend", "success");
      }catch(err)  {
        console.error("Error:", err);
        showToast("an error occured !", "error");
      }
    }
//   const sendToGoogleSheets = async () => {
//     const orderData = {
//         items:items.map ((item)=>({
//             name: item.name,
//             price: item.price,
//             quantity: item.quantity,
//             type: item.type,
//         })),
//       deliveryArea,
//       pickupPoint,
//       total,
//       customerName,
//       phone,
//     };
//     try {
//      const res = await fetch(
//       "https://script.google.com/macros/s/AKfycbwffTF-L1AE8K83c9ksKjyjhS-INmql7qkq9nL3VJaX2U2MGc9DxGw5Pt9NniengDkk/exec",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(orderData),
//       }
//     )
//     console.log("status", res.status)
//     const data = await res.json()
//     console.log ("response from google:", data)
//  if (data.ok) {
//           console.log("order sent");
//           showToast("ordersubmitted succesfully !", "success");
//         } else {
//           showToast("failed" + data.error, "error")
//           console.log("failed:" + data.error);
//         } 
//       }catch(err)  {
//         console.error("Error:", err);
//         showToast("an error occured !", "error");
//       }  
// };
  const deliveryCost = deliveryPrices[deliveryArea] || 0;
  const total = subtotal + deliveryCost;
  const isFormValid =
    customerName.trim() !== "" &&
    phone.trim() !== "" &&
    deliveryArea.trim() !== "" &&
    pickupPoint.trim() !== "";

  return (
    <>
      <section className="section-header" onClick={onBack}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
          <path d="M73.4 297.4C60.9 309.9 60.9 330.2 73.4 342.7L233.4 502.7C245.9 515.2 266.2 515.2 278.7 502.7C291.2 490.2 291.2 469.9 278.7 457.4L173.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L173.3 288L278.7 182.6C291.2 170.1 291.2 149.8 278.7 137.3C266.2 124.8 245.9 124.8 233.4 137.3L73.4 297.3z" />
        </svg>
        <h4>Cart Checkout</h4>
      </section>

      <div className="cartCheckout">
        {/*show all cart items */}
        <div className="cc-list">
          {items.map((item)=>(
          <div key={item.id} className="cc-items">
            <img src={item.image} alt="" />
              <div className="cc-items-info">
                <p>{item.name}</p>
                <p>quantity: {item.quantity} </p>
                <p style={{marginTop: "-5px"}}>Kes{item.price * item.quantity}</p>
              </div>
          </div>
          ))}
        </div>
        <div>
            {/*delivery area */}
          <div className="c-delivery">
            <div className="c-card-header">
              <svg
                className="c-svg"
                style={{ backgroundcolor: "pink" }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <path d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z" />
              </svg>
              <div className="c-card-header-info">
                <h3>Delivery Area</h3>
              </div>
            </div>
            <select
              name=""
              id="c-delivary-area"
              value={deliveryArea}
              onChange={(e) => setDeliveryArea(e.target.value)}
            >
              <option value=""> --select delivery area---</option>
              {Object.keys(deliveryPrices).map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>
           <div className="c-pickup-point">
            <div className="c-card-header">
              <svg
                className="c-svg"
                style={{ backgroundColor: "green" }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <path d="M465.4 192L431.1 144L209 144L174.7 192L465.4 192zM96 212.5C96 199.2 100.2 186.2 107.9 175.3L156.9 106.8C168.9 90 188.3 80 208.9 80L431 80C451.7 80 471.1 90 483.1 106.8L532 175.3C539.8 186.2 543.9 199.2 543.9 212.5L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 212.5z" />
              </svg>{" "}
              <div className="c-card-header-info">
                <h3>Pickup Point</h3>
              </div>
            </div> {/*pickup point */}
            <select
              value={pickupPoint}
              required
              onChange={(e) => setPickupPoint(e.target.value)}
            >
              <option value="">--select pickup point--</option>
              {pickupOptions[deliveryArea]?.map((point) => (
                <option key={point} value={point}>
                  {point}
                </option>
              ))}
            </select>
          </div>
          <div className="c-cost-breakdown">
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
        </div>
        
         
          {/*order button */}
          <div className="order-btn">
              <button
                className={`button ${isFormValid ? "enabled" : "disabled"}`}
                type="submit"
                disabled={!isFormValid}
                aria-disabled={!isFormValid}
                onClick={() => {
                  showToast("ordersubmitted succesfully !", "success");
                  submitToBackend();
                  onPlaceOrder();
                }}
              >
                complete order
              </button>
            <span>Take a screenshot of mpesa massege and forward</span>
            </div>
          </div>
    </>
  );
  }

export default CheckoutCart;
