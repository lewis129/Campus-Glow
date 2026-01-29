import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import AdminProducts from "./AdminProducts";
import { updateDoc } from "firebase/firestore";
import AdminOrderChart from "./AdminOrderChart";

export default function AdminDashboard() {
  const [imageInput, setImageInput] = useState("");
  const [showInputs, setShowInputs] = useState(false);
  const [orders, setOrders] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [variantInput, setVariantInput] = useState({
    label: "",
    price: "",
    stock: "",
  });
  const [editingVariantIndex, setEditingVariantIndex] = useState(-1);
  const [form, setForm] = useState({
    name: "",
    price: "",
    buyprice: "",
    prodType: "",
    category: "",
    description: "",
    images: [],
    variants: [],
  });
  // 🔹 Fetch products
  useEffect(() => {
    async function fetchProducts() {
      const snap = await getDocs(collection(db, "products"));
      const list = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setProducts(list);
      setLoading(false);
    }
    fetchProducts();

    async function fetchOrders() {
      const snap = await getDocs(collection(db, "orders"));
      const list = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setOrders(list);
    }
    fetchOrders();
  }, []);

  // 🔹 Add product
  async function handleSubmit(e) {
    e.preventDefault();

    const computedPrice =
      form.variants.length > 0
        ? Number(form.variants[0].price)
        : Number(form.price);

    if (editingId) {
      const ref = doc(db, "products", editingId);
      await updateDoc(ref, {
        ...form,
        price: computedPrice,
        buyprice: Number(form.buyprice),
      });
      setProducts(
        products.map((p) =>
          p.id === editingId ? { ...p, ...form, price: computedPrice } : p,
        ),
      );
      setEditingId(null);
      setForm({
        name: "",
        price: "",
        buyprice: "",
        prodType: "",
        category: "",
        description: "",
        images: [],
        variants: [],
      });
    } else {
      const docRef = await addDoc(collection(db, "products"), {
        ...form,
        price: computedPrice,
        buyprice: Number(form.buyprice),
        createdAt: Date.now(),
      });
      setProducts([
        ...products,
        { id: docRef.id, ...form, price: computedPrice },
      ]);
      setForm({
        name: "",
        price: "",
        buyprice: "",
        prodType: "",
        category: "",
        description: "",
        images: [],
        variants: [],
      });
    }
  }
  // 🔹 Delete product
  async function deleteProduct(id) {
    await deleteDoc(doc(db, "products", id));
    setProducts(products.filter((p) => p.id !== id));
  }

 function deleteImage(index) {
  setForm((prev) => ({
    ...prev,
    images: prev.images.filter((_, i) => i !== index),
  }));
}
  return (
    <div className="admin" style={{ padding: "1rem" }}>
      <h1>Admin Dashboard</h1>
      <button
        onClick={() => signOut(auth)}
        style={{
          marginRight: "40px",
          display:
            "flex" /* Makes the Icon and "Logout" text sit side-by-side */,
          alignItems: "center" /* Centers the icon and text vertically */,
          gap: "5px" /* Adds space between the icon and the text "Logout" */,
          background: "none",
          border: "none" /* Removes default button border */,
          color: "red",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path
            d="M5 22a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v3h-2V4H6v16h12v-2h2v3a1 1 0 0 1-1 1H5zm13-6v-3h-7v-2h7V8l5 4-5 4z"
            fill="red" /* Changed to red to match your text color */
          ></path>
        </svg>
        Sign Out
      </button>
      <hr />
      {/* 🔘 TABS */}
      <div className="admin-dashboard">
        <h1>Admin Dashboard</h1>
        <div className="dashboard-options">
          <a
            className="dashboard-link"
            onClick={() => setActiveTab("dashboard")}
          >
            Admin Dashboard
          </a>

          <a
            className="dashboard-link"
            onClick={() => setActiveTab("products")}
          >
            View Products
          </a>

          <a className="dashboard-link" onClick={() => setActiveTab("orders")}>
            Manage Orders
          </a>
        </div>
        <hr />

        {/* 🧠 DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <>
            <div>
              <h2>Overview</h2>
              <p>Total products: {products.length}</p>
              <p>Status: Online ✅</p>
            </div>
            {/*sale analytics  */}
            <AdminOrderChart orders={orders} />
          </>
        )}
        {/* 📦 PRODUCTS TAB */}
        {activeTab === "products" && (
          <>
            <h2>Add Product</h2>
            <button
              onClick={() => setShowInputs(!showInputs)}
              className="add-product-btn"
            >
              + Add product
            </button>
            <div className="addproduct-inputs ">
              {showInputs && (
              <form
                onSubmit={handleSubmit}
                style={{ maxWidth: 400 }}
                className="add-product-inputs"
              >
                <input
                  placeholder="Product name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />

                <input
                  placeholder="Price"
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  required
                />

                <input
                  placeholder="Buying price"
                  type="number"
                  value={form.buyprice}
                  onChange={(e) =>
                    setForm({ ...form, buyprice: e.target.value })
                  }
                  required
                />

                <input
                  placeholder="Product type"
                  value={form.prodType}
                  onChange={(e) =>
                    setForm({ ...form, prodType: e.target.value })
                  }
                  required
                />

                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  required
                >
                  <option value="">--select category--</option>
                  <option value="fragrance">fragrance</option>
                  <option value="self-care">self-care</option>
                  <option value="gift&collectable">gift&collectable</option>
                  <option value="skincare">Skin care</option>
                  <option value="styel&accessories">styel&accessories</option>
                  <option value="campusessential">Campus Essential</option>
                </select>

                <h4>Product Images</h4>

                <div className="image-builder">
                  <input
                    placeholder="Paste image URL"
                    value={imageInput}
                    onChange={(e) => setImageInput(e.target.value)}
                  />

                  <button
                    type="button"
                    className="btn"
                    onClick={() => {
                      if (!imageInput) return;

                      setForm({
                        ...form,
                        images: [...form.images, imageInput],
                      });

                      setImageInput("");
                    }}
                  >
                    + Add Image
                  </button>
                </div>
            {form.images && form.images.length > 0 && (
              <div className="image-preview">
                {form.images.map((img, i) => (
                  <div key={i} style={{ display: "inline-flex", alignItems: "center", marginRight: "8px" }}>
                    <img
                      src={img}
                      alt="preview"
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "6px",
                      }}
                    />
                    <button
                      onClick={() => deleteImage(i)} // pass the index or proper id
                      style={{ marginLeft: 10 }}
                      className="btn"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}



                <input
                  placeholder="product description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  
                  required
                />
                <h4 style={{ marginTop: "15px" }}>
                  Product Variants (Optional)
                </h4>
                <div className="variant-builder">
                  <input
                    placeholder="Label (15ml, 25ml, Large)"
                    value={variantInput.label}
                    onChange={(e) =>
                      setVariantInput({
                        ...variantInput,
                        label: e.target.value,
                      })
                    }
                  />

                  <input
                    type="number"
                    placeholder="Variant price"
                    value={variantInput.price}
                    onChange={(e) =>
                      setVariantInput({
                        ...variantInput,
                        price: e.target.value,
                      })
                    }
                  />

                  <input
                    type="number"
                    placeholder="Stock (optional)"
                    value={variantInput.stock}
                    onChange={(e) =>
                      setVariantInput({
                        ...variantInput,
                        stock: e.target.value,
                      })
                    }
                  />

                  <button
                    type="button"
                    className="btn"
                    onClick={() => {
                      if (!variantInput.label || !variantInput.price) return;

                      if (editingVariantIndex !== -1) {
                        // Update existing variant
                        const newVariants = [...form.variants];
                        newVariants[editingVariantIndex] = variantInput;
                        setForm({ ...form, variants: newVariants });
                        setEditingVariantIndex(-1);
                      } else {
                        // Add new variant
                        setForm({
                          ...form,
                          variants: [...form.variants, variantInput],
                        });
                      }
                      setVariantInput({ label: "", price: "", stock: "" });
                    }}
                  >
                    {editingVariantIndex !== -1
                      ? "Update Variant"
                      : "+ Add Variant"}
                  </button>
                  {editingVariantIndex !== -1 && (
                    <button
                      type="button"
                      className="btn"
                      onClick={() => {
                        setEditingVariantIndex(-1);
                        setVariantInput({ label: "", price: "", stock: "" });
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
                {form.variants.length > 0 && (
                  <div className="variant-list">
                    <h4>Variants Added</h4>
                    {form.variants.map((v, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "5px",
                        }}
                      >
                        <span>
                          {v.label} — KES {v.price} — Stock: {v.stock || "∞"}
                        </span>
                        <div>
                          <button
                            type="button"
                            className="btn"
                            onClick={() => {
                              setEditingVariantIndex(i);
                              setVariantInput({ ...v });
                            }}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn"
                            onClick={() => {
                              setForm({
                                ...form,
                                variants: form.variants.filter(
                                  (_, idx) => idx !== i,
                                ),
                              });
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <button type="submit" className="btn">
                  {editingId ? "Update product" : "Add Product"}
                </button>
              </form>
            )}
            </div>
            

            <hr />

            <h2>Products</h2>

            {loading ? (
              <p className="spinner"></p>
            ) : (
              <ul>
                {products.map((p) => (
                  <li key={p.id}>
                    <strong>{p.name}</strong> — KES {p.price}
                    <p>{p.description}</p>
                    <p>{p.prodType}</p>
                    <p>{p.buyprice}</p>
                    <p>{p.category}</p>
                    <p>{p.image}</p>
                    <button
                      onClick={() => {
                        setEditingId(p.id);
                        setEditingVariantIndex(-1); // Reset variant editing
                        setForm({
                          name: p.name,
                          price: p.price,
                          buyprice: p.buyprice,
                          prodType: p.prodType,
                          category: p.category,
                          description: p.description,
                          images: p.images,
                          variants: p.variants || [],
                        });
                      }}
                      style={{ marginLeft: "10" }}
                      className="btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(p.id)}
                      style={{ marginLeft: 10 }}
                      className="btn"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
        {activeTab === "product-list" && <AdminProducts />}
        {activeTab === "orders" && (
          <div>
            <h2>Orders</h2>

            {orders.length === 0 ? (
              <p>No orders yet</p>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  style={{
                    border: "1px solid #ccc",
                    padding: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <p>
                    <strong>Customer:</strong> {order.customerName}
                  </p>
                  <p>
                    <strong>Phone:</strong> {order.phone}
                  </p>
                  <p>
                    <strong>Total:</strong> KES {order.total}
                  </p>
                  <p>
                    <strong>Delivery:</strong> {order.deliveryArea}
                  </p>
                  <p>
                    <strong>Status:</strong> {order.status || "pending"}
                  </p>

                  <details>
                    <summary>Items</summary>
                    {order.items?.map((item, i) => (
                      <h1 key={i}>
                        <p>category{item.name} </p>
                        <p>{item.type}</p>
                        <p> quantity :{item.quantity}</p>
                        <p> {item.variant}</p>
                      </h1>
                    ))}
                  </details>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
