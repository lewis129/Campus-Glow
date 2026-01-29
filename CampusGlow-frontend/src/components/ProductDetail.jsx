import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

function ProductDetail({ products, onAddToCart, cart }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [open, setOpen] = useState(false)

  const product = products.find((p) => String(p.id) === id);
  const images = product?.images?.length ? product.images : [product?.image]; // fallback for old products

  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);

  const nextImage = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;

    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;

    if (distance > 50) nextImage(); // swipe left
    if (distance < -50) prevImage(); // swipe right

    setTouchStart(null);
  };

  if (!product) return <p>No product selected</p>;

  const suggestedProducts = products
    ?.filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category || p.prodType === product.prodType),
    )
    .slice(0, 4);
  return (
    <>
    <section className="product-detail">

  
      <section
        className="section-header product-detail-svg"
        onClick={() => navigate(-1)}
      
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
          <path d="M73.4 297.4C60.9 309.9 60.9 330.2 73.4 342.7L233.4 502.7C245.9 515.2 266.2 515.2 278.7 502.7C291.2 490.2 291.2 469.9 278.7 457.4L173.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L173.3 288L278.7 182.6C291.2 170.1 291.2 149.8 278.7 137.3C266.2 124.8 245.9 124.8 233.4 137.3L73.4 297.3z" />
        </svg>
        <h4>Back to category</h4>
      </section>
    <section className="detail-header">
        <div
          className="product-image-detail"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="image-track"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Product ${i + 1}`}
                className="product-main-image"
              />
            ))}
          </div>

          {/* Dots */}
          <div className="image-dots">
            {images.map((_, i) => (
              <span
                key={i}
                className={`dot ${i === activeIndex ? "active" : ""}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="product-detail-section">
        <div className="product-info-detail">
          <p className="product-type-detail">{product.type}</p>
          <h3 className="product-name-detail">{product.name}</h3>
          <div className="variants">
            {product.variants && product.variants.length > 0 && (
              <div className="variants-detail">
                {product.variants.map((variant, index) => (
                  <span
                    key={index}
                    className={
                      selectedVariant === variant ? "variant active" : "variant"
                    }
                    onClick={() => setSelectedVariant(variant)}
                  >
                    {variant.label}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="product-prices-detail">
            <p className="product-price-detail">
              ${selectedVariant?.price || product.price}
            </p>
            <p className="product-price-detail product-buyprice-detail">
              ${selectedVariant?.buyprice || product.buyprice}
            </p>
            {/* <p className="product-price-detail product-buyprice-detail">20%</p> */}
          </div>

          <div className="more-detail">
            <p>{selectedVariant?.stock || product.stock} in stock</p>
          </div>
          <h4>Description</h4>
            <div className={`expand-card ${open ? "open" : ""}`}onClick={() => setOpen(!open)}>
            Description
              <div className=" expand-content">
                  {product.description || "No description available..."}
              </div>
            </div>
        </div>
      </section>
      <section className="detail-tail-btn">
        <button
          className="add-to-cart-detail product-detail-btn"
          disabled={product.stock <= 0}
          onClick={() =>
            onAddToCart({
              ...product,
              selectedVariant,
              price: selectedVariant?.price || product.price,
              volume: selectedVariant?.label || null,
            })
          }
        >
          {product.stock <= 0 ? "Out of Stock" : "+ Add to Cart"}
        </button>

        <button
          className="product-detail-btn Proceed-to-cart-detail"
          disabled={!cart || cart.length === 0}
          onClick={() => navigate("/checkout")}
        >
          {cart && cart.length === 0 ? "Cart is Empty" : "Proceed to Checkout"}
        </button>
      </section>

      <section className="morelike-this">
        <h3>You May Also Like</h3>

        <div className="detail-card-list">
          {suggestedProducts.length === 0 ? (
            <p>No similar products yet</p>
          ) : (
            suggestedProducts.map((item) => (
              <div
                key={item.id}
                className="detail-card-mores"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <img
                  src={item.images || "https://placeholder.pics/svg/300"}
                  alt={item.name}
                />
                <div className="detail-card-mores-details">
                  <p className="detail-card-mores-type">{item.prodType}</p>
                  <p className="detail-card-mores-name">{item.name}</p>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p className="detail-card-mores-price">KSH {item.price}</p>

                    <button
                      className="detail-card-mores-add"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(item);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
        </section>
    </>
  );
}

export default ProductDetail;
