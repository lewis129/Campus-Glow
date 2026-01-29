import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  

  useEffect(() => {
    // fetch products here
    async function fetchProducts() {
      const querySnapShot = await getDocs(collection(db, "products"));
      const items = querySnapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(), // product info
      }));
      setProducts(items);
    }
    fetchProducts();
  }, []);

  return (
    <>
      <section class="view-products">
        <div class="ad-products">
          <h2>Products List</h2>
          <div class="ad-order-filters">
            <span>all</span>
            <span>pending</span>
            <span>completed</span>
          </div>
          <p class="ad-product-card-number">{products.lemgth}products</p>
          <div class="ad-product-list">
            {products.map((product) => (
              <div class="ad-product-card">
                <img src="images/sc-hugo.jpg" alt="" />
                <div class="ad-product-card-details" key={product.id}>
                  <h3>{product.name}</h3>
                  <h3>Product category{product.category}</h3>
                  <h3>{product.type}</h3>
                  <p>Price: ${product.price}</p>
                  <p>buying Price: {product.buyprice}</p>
                  <p class="ad-product-card-details-desc">
                    {product.description}
                  </p>
                  <hr />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default AdminProducts;
