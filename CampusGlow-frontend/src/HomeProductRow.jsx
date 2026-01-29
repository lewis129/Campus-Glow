import { useNavigate } from "react-router-dom";
import ProductSkeleton from "./components/ProductSkeleton";
const HomeProductRow = ({ title, category, products }) => {
  const navigate = useNavigate();
  if (!products || products.length === 0) {
    return <ProductSkeleton />;
  }
  const filtered = products.filter((p) => p.category === category).slice(0, 10);
  return (
    <section style={{ padding: "1rem" }}>
      <h2
        style={{
          marginBottom: "0.5rem",
          fontWeight: "300",
          fontSize: "20px",
        }}
      >
        {title}
      </h2>
      {/* See more → CATEGORY PAGE */}
      <button
        className="see-more"
        onClick={() => navigate(`/category/${category}`)}
        style={{ marginTop: "0.5rem" }}
      >
        See more →
      </button>
      <div style={{ display: "flex", gap: "1rem", overflowX: "auto" }}>
        {filtered.map((prod) => (
          <div
            className="product-card hpr-card "
            key={prod.id}
            onClick={() => navigate(`/product/${prod.id}`)} // ✅ PRODUCT PAGE
          >
            <div className="image-container">
              <img
                src={
                  prod.images ||
                  "https://placeholder.pics/svg/300/DEDEDE/555555/campus%20glow"
                }
                className="product-image"
              />
              <div className="price-overlay">KES {prod.price}</div>
              <div className="product-type-overlay">{prod.prodType}</div>
            </div>

            <div className="product-details">
              <h3 className="product-category hpr-category">{prod.category}</h3>
              <h3 className="product-name hpr-name">{prod.name}</h3>
            </div>
            <button
              className="add-to-cart"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/product/${prod.id}`); // ✅ ROUTE
              }}
            >
              View
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeProductRow;
