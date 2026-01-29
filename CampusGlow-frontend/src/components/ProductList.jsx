import { useNavigate, useParams } from "react-router-dom";
import ProductSkeleton from "./ProductSkeleton";

function ProductList({ products }) {
  const navigate = useNavigate();
  const { category } = useParams();
  if (!products || products.length === 0) {
    return <ProductSkeleton />;
  }

  const filteredProducts =
    !category || category === "all"
      ? products
      : products.filter(
          (p) => p.category?.toLowerCase() === category.toLowerCase()
        );

  return (
    <>
      <section className="section-header" onClick={() => navigate(-1)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
          <path d="M73.4 297.4C60.9 309.9 60.9 330.2 73.4 342.7L233.4 502.7C245.9 515.2 266.2 515.2 278.7 502.7C291.2 490.2 291.2 469.9 278.7 457.4L173.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L173.3 288L278.7 182.6C291.2 170.1 291.2 149.8 278.7 137.3C266.2 124.8 245.9 124.8 233.4 137.3L73.4 297.3z" />
        </svg>
        <h4>Back to category</h4>
      </section>
      <div className="product-list">
        {filteredProducts.length === 0 ? (
          <p className="no-items">No items available in this category</p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card pc-card"
              onClick={() => navigate(`/product/${product.id}`)} // ✅ ROUTE
            >
              <div className="image-container">
                <img
                  src={
                    product.images?.[0] ||
                    product.image ||
                    "https://placeholder.pics/svg/300/DEDEDE/555555/campus%20glow"
                  }
                  alt={product.name}
                  className="product-image"
                />
                <div className="price-overlay">KES {product.price}</div>
                <div className="product-type-overlay">{product.prodType}</div>
              </div>

              <div className="product-details">
                <h3 className="product-name pl-name">{product.name}</h3>

                 <button
                  className="add-to-cart"
                  onClick={(e) => {
                    e.stopPropagation(); // ✅ prevents card click
                    navigate(`/product/${product.id}`);
                  }}
                >
                  View
                </button> 
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default ProductList;
