import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import BottomNav from "./BottomNav.jsx";
import Help from "./Help.jsx";
import Cart from "./Cart.jsx";
import Category from "./Category.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Profile from "./pages/Profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import Toast from "./components/Toast.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import ProductList from "./components/ProductList.jsx";
import CheckoutCart from "./components/CheckoutCart.jsx";
import { useNavigate } from "react-router-dom";
import Admin from "./pages/Admin/Admin.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import AdminProducts from "./pages/Admin/AdminProducts.jsx";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase.js";
import { useLocation } from "react-router-dom";
import Settings from "./pages/Settingscard/Settings.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import DarkMode from "./pages/Settingscard/DarkMode.jsx";

function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const hideDarkMode =
    location.pathname.startsWith("/product") ||
    location.pathname === "/checkout" ||
    location.pathname === "/category" ||
    location.pathname === "/profile" ||
    location.pathname === "/settings" ||
    location.pathname === "/admin" ||
    location.pathname === "/cart";
  const hideBottomNav =
    location.pathname.startsWith("/product") ||
    location.pathname === "/checkout" ||
    location.pathname === "/category/:category" ||
    location.pathname === "/settings" 
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all ");
  const [orders, setOrders] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  let redirectTimer = null;
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [phone, setPhone] = useState("");
  const [pickuppoint, setPickupPoint] = useState("");
  const [deliveryArea, setDeliveryArea] = useState("");
  const deliveryPrices = {
    Thika: 100,
    Juja: 80,
    Campuses: 120,
  };
  const pickupointOption = {
    Thika: ["thika stage", "weteithie", "mku", "weteithie", "ngoingwa"],
    Juja: ["juja stage", "juja city mall", "juja gate", "highpoint"],
    Campuses: [
      "Greitsa uni",
      "MKU(thika)",
      "JKUAT uni",
      "Zetech uni",
      "Thika Training Technical Institute(TTTI)",
      "KMTC(thika)",
    ],
  };

  const resetCheckout = () => {
    setCustomerName("");
    setPhone("");
    setDeliveryArea("");
    
  };
  const handlePlaceOrder = () => {
    const deliveryCost = deliveryPrices[deliveryArea] || 0;
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const total = subtotal + deliveryCost;
    const itemsMessage = cartItems
      .map(
        (item) =>
          `${item.name}: ${item.price} X ${item.quantity}= KES ${
            item.price * item.quantity
          }`,
      )
      .join("\n");
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
      message,
    )}`;
    window.open(url, "_blank");
  };
  useEffect(() => {
    async function fetchProducts() {
      try {
        const snapshot = await getDocs(collection(db, "products"));

        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(items);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
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
  function addToCart(product) {
    setCartItems((prevCart) => {
      const productId = product.id || product.name;
      const existing = prevCart.find((item) => item.id === productId);
      if (existing) {
        return prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [...prevCart, { ...product, id: productId, quantity: 1 }];
      }
    });
    showToast(`${product.name} added to cart`, "success");
  }

  const navigate = useNavigate();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

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
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Protected app */}
            <Route
              path="/"
              element={
                <Home
                  loading={loading}
                  products={products}
                  setSelectedCategory={setSelectedCategory}
                  showToast={showToast}
                />
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* CATEGORY */}
            <Route
              path="/category"
              element={
                <Category
                  products={products || []}
                  onSelect={setSelectedCategory}
                />
              }
            />

            {/* PRODUCTS IN CATEGORY */}
            <Route
              path="/category/:category"
              element={
                <ProductList
                  selectedCategory={selectedCategory}
                  products={products}
                />
              }
            />

            {/* PRODUCT DETAILS */}
            <Route
              path="/product/:id"
              element={
                <ProductDetail
                  products={products}
                  addToCart={addToCart}
                  showToast={showToast}
                  onAddToCart={(prod) => addToCart(prod)}
                  onBuyNow={() => navigate("/checkout")}
                  cart={cartItems}
                />
              }
            />

            {/* CART */}
            <Route
              path="/cart"
              element={
                <Cart
                  orders={orders}
                  setOrders={setOrders}
                  items={cartItems}
                  setCartItems={setCartItems}
                  onCheckout={() => navigate("/checkout")}
                />
              }
            />

            {/* CHECKOUT */}
            <Route
              path="/checkout"
              element={
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
                  showToast={showToast}
                  phone={phone}
                  setPhone={setPhone}
                  onPlaceOrder={handlePlaceOrder}
                  resetCheckout={resetCheckout}
                />
              }
            />

            {/* HELP */}
            <Route path="/help" element={<Help />} />
            <Route
              path="/darkmode"
              element={<DarkMode theme={theme} setTheme={setTheme} />}
            />

            {/* PROFILE (PROTECTED) */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            {/* ADMIN DASHBOARD */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <AdminRoute>
                  <AdminProducts />
                </AdminRoute>
              }
            />
            <Route
              path="/settings"
              element={<Settings theme={theme} setTheme={setTheme} />}
            />
          </Routes>
        </main>
        {!hideBottomNav && <BottomNav />}
        {!hideDarkMode && <ThemeToggle theme={theme} setTheme={setTheme} />}
      </div>
    </>
  );
}

export default App;
