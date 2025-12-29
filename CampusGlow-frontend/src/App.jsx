import { useState, useEffect } from "react";
import Header from "./Header.jsx";
import Banner from "./Banner.jsx";
import Whyus from "./Whyus.jsx";
import BottomNav from "./BottomNav.jsx";
import Help from "./Help.jsx";
import Cart from "./Cart.jsx";
import Category from "./Category.jsx";
import Toast from "./components/Toast.jsx";
import ProductList from "./components/ProductList.jsx";
import Checkout from "./components/Checkout.jsx";
import CheckoutCart from "./components/CheckoutCart.jsx"
import HomeProductRow from "./HomeProductRow.jsx";

function App() {
  const [active, setActive] = useState("home");
  const [cartItems, setCartItems] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCheckout, setshowCheckOut] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  let redirectTimer = null;
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [phone, setPhone] = useState("");
  const [pickuppoint, setPickupPoint] = useState("");
  const [deliveryArea, setDeliveryArea] = useState("");
  const deliveryPrices = {
    thika: 300,
    juja: 200,
    riuru: 250,
  };
  const pickupointOption = {
    thika: ["thika stage", "weteithie", "kiganja"],
    juja: ["juja stage", "juja city mall", "juja gate"],
    riuru: ["ruiru membley", "ruiru stage"],
  };

  let deliveryCost = 0;
  let total = 0;

  if (showCheckout && selectedProduct) {
    deliveryCost = deliveryPrices[deliveryArea];
    total = selectedProduct.price + deliveryCost;
  }
  const resetCheckout = () => {
    setCustomerName("");
    setPhone("");
    setDeliveryArea("");
  };
  const handlePlaceOrder = () => {
    const deliveryCost = deliveryPrices[deliveryArea] || 0
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity, 0
    ) ;
    const total = subtotal + deliveryCost;
    const itemsMessage = cartItems
    .map((item) => `${item.name}: ${item.price} X ${item.quantity}= KES ${item.price * item.quantity}`)
    .join("\n")
    const message = `
Hello,i'm making an order
${itemsMessage}
Subtotal: KES ${subtotal}
delivery: ${deliveryArea}(KES${deliveryCost})
pickuppoint: ${pickuppoint}
Total: kES ${total}
customer: ${customerName}
phone: ${phone}
💳 *Payment Instructions*
Pay to: 0793302518(M-Pesa)
Account: lewis irungu
After payment, send confirmation SMS here.

Thank you for choosing us! ✨
`;
    const whatsappNumber = "254793302518";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };
  useEffect(() => {
    setLoading(true);
    fetch(
      "https://script.google.com/macros/s/AKfycbxy3o8SWwGZl0iFbsS4X204jucYsUg3lMZWFRLblMg89q502yLh045PA90pAxXmHJj-2w/exec"
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
        showToast(`welcome!`, "info");
      })
      .catch((err) => {
        console.log("fetch error:", err);
        setLoading(false);
        showToast("an error occured!", "err");
      });
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };
  const handleToastClose = () => {
    setToast(null);
    // cancel redirect if toast is closed manually
    if (redirectTimer) {
      clearTimeout(redirectTimer);
      redirectTimer = null;
    }
  };
  function addToCart(product){
    setCartItems((prevCart)=>{
      const productId = product.id || product.name;
      const existing = prevCart.find((item) => item.id === productId);
      if(existing){
        return prevCart.map((item)=>
        item.id === productId
         ? {...item,quantity: item.quantity +1 } 
         : item
        );
    } else {
      return [...prevCart, {...product,id: productId, quantity: 1}]
    }
    });
    showToast(`${product.name} added to cart`, "success")
  }

  return (
    <>
      <div className="App">
        <main className="content">
          {toast.show && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => {
                handleToastClose();
                setToast({ show: false });
              }}
            />
          )}

          {active === "home" && (
            <>
              <Header />
              <Banner />
              <Whyus />
              {loading && <p>Loading products...</p>}
              {active === "home" && !loading && (
                <div>
                  <HomeProductRow
                    title="Best selling Perfumes"
                    category="perfume"
                    products={products}
                    onSelectProduct={(prod) => {
                       addToCart(prod)
                      window.scrollTo(0, 0);
                      setSelectedProduct(prod);
                      
                      setActive("cart");
                      showToast(`selected: ${prod.name}`, "info");
                    }}
                    onSeeMore={(cat) => {
                      setActive("category");
                      setSelectedCategory(cat);
                    }}
                  />
                  <HomeProductRow
                    title="Best selling Body lotion"
                    category="bodylotion"
                    products={products}
                    onSelectProduct={(prod) => {
                      window.scrollTo(0, 0);
                       addToCart(prod)
                      setSelectedProduct(prod);
                      showToast(`selected: ${prod.name}`, "info");
                      
                      setActive("cart");
                    }}
                    onSeeMore={(cat) => {
                      setSelectedCategory(cat);
                      setActive("category");
                    }}
                  />
                  {/* <HomeProductRow 
                    title="Best selling skincare"
                    category="skincare"
                    products={products}
                     onSelectProduct={(prod)=> {
                       window.scrollTo(0,0);
                    setSelectedProduct(prod);
                    showToast(`selected: ${prod.name}`, "info")
                    setshowCheckOut(true);
                    setActive('category');
                  }}
                    onSeeMore={(cat)=>{
                      setActive('category')
                      setSelectedCategory(cat)
                    }}
                  /> */}
                </div>
              )}
            </>
          )}

          {active === "category" && !selectedCategory && !showCheckout && (
            <Category
              onSelect={setSelectedCategory}
              products={products || []}
              selectedCategory={selectedCategory}
            />
          )}
          {/* products */}
          {active === "category" && selectedCategory && !showCheckout && (
            <ProductList
              loading={loading}
              setLoading={setLoading}
              products={products}
              selectedCategory={selectedCategory}
              onSelectProduct={(prod) => addToCart(prod)}
              onOrderNow={() => {
                window.scrollTo(0, 0); //scrolls to top
                setActive("cart")
                showToast("proceeding to checkout...", "info");
              }}
              setSelectedCategory={setSelectedCategory}
            />
          )}
          {active === "category" && showCheckout && selectedProduct && (
            <Checkout
              product={selectedProduct}
              category={selectedCategory}
              deliveryPrices={deliveryPrices}
              deliveryArea={deliveryArea}
              setDeliveryArea={setDeliveryArea}
              setPickupPoint={setPickupPoint}
              pickupPoint={pickuppoint}
              pickupOptions={pickupointOption}
              deliveryCost={deliveryCost}
              total={total}
              customerName={customerName}
              setCustomerName={setCustomerName}
              phone={phone}
              setPhone={setPhone}
              showToast={showToast}
              onBack={() => {
                setshowCheckOut(false);
                resetCheckout();
              }}
              onPlaceOrder={handlePlaceOrder}
            />
          )}
          {active === "checkoutCart" && (
            <CheckoutCart 
              items={cartItems}
              deliveryPrices={deliveryPrices}
              deliveryArea={deliveryArea}
              setDeliveryArea={setDeliveryArea}
              setPickupPoint={setPickupPoint}
              pickupPoint={pickuppoint}
              pickupOptions={pickupointOption}
              customerName={customerName}
              setCustomerName={setCustomerName}
              phone={phone}
              setPhone={setPhone}
              showToast={showToast}
              setActive={setActive}
              onPlaceOrder={handlePlaceOrder}
              onBack={()=> setActive("cart")}    
            />
          )}
          {active === "cart" && 
          <Cart 
           items={cartItems} 
           setCartItems={setCartItems} 
           onBack={()=> setActive("category")} 
          onCheckout={()=>{
            setActive("checkoutCart");
            showToast("proceeding to checkout...", "info")
             window.scrollTo(0, 0);
          }}/>}
          {active === "help" && <Help />}
        </main>
      </div>
      <BottomNav active={active} setActive={setActive} />
    </>
  );
}

export default App;
