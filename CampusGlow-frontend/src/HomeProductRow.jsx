const HomeProductRow = ({
  title,
  category,
  products,
  onSeeMore,
  onSelectProduct,
}) => {
  const filtered = products.filter((p) => p.category === category).slice(0, 10); //shoe only 3

  return (
    <section style={{ padding: "1rem" }}>
      <h2 style={{ marginBottom: "0.5rem", fontWeight: "300", fontSize:"20px" }}>{title}</h2>
      <button
      className="see-more"
        onClick={() => onSeeMore(category)}
        style={{ marginTop: "0.5rem" }}
      >
        See more →
      </button>
      <div style={{ display: "flex", gap: "1rem", overflowX: "auto" }}>
        {filtered.map((prod) => (
          <div
            className="product-card hpr-card"
            key={prod.id}
            onClick={() => onSelectProduct(prod)}
          >
            <div className="image-container">
              <img src={prod.image} alt={prod.name} className="product-image" />
              <div className="price-overlay">ksh {prod.price}</div>
              <div className="product-type-overlay">{prod.type}</div>
            </div>
            <div className="product-details">
              <h3 className="product-category">{prod.category}</h3>
              <h3 className="product-name hpr-name">{prod.name}</h3>
            </div>
            <button
              className="add-to-cart"
              onClick={(e) => {
                e.stopPropagation(); // prevent card click conflict
                onSelectProduct(prod);
              }}
            >
              view
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeProductRow;
