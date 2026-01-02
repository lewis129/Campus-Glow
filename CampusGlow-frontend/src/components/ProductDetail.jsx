function ProductDetail({ product, onSelectProduct, onBack }) {
  if (!product) return <p>No product selected</p>;
  return (
    <>
      <section className="section-header" onClick={onBack}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
          <path d="M73.4 297.4C60.9 309.9 60.9 330.2 73.4 342.7L233.4 502.7C245.9 515.2 266.2 515.2 278.7 502.7C291.2 490.2 291.2 469.9 278.7 457.4L173.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L173.3 288L278.7 182.6C291.2 170.1 291.2 149.8 278.7 137.3C266.2 124.8 245.9 124.8 233.4 137.3L73.4 297.3z" />
        </svg>
        <h4>Back to category</h4>
      </section>
      <div class="pd-product-detail">
        <div class="pd-image">
          <img src={product.image} alt="" />
        </div>
        <div class="pd-detail">
          <h3 class="pd-type">{product.type}</h3>
          <h3 class="pd-name">{product.name}</h3>
          <h3 class="pd-reviews">⭐2.8(217reviews)</h3>
          <div class="pd-prices-detail">
            <p class="pd-price">$ {product.price}</p>
            <p class="pd-prev-price">$ {product.buyprice}</p>
            <span class="pd-prev-perc">{product.perc}%</span>
          </div>
        </div>
        <div>
          <span class="pd-desc">{product.description}</span>
        </div>
        <div class="pd-btn">
          <button class="pd-fav-btn">💗</button>
          <button
            class="pd-addtocart-btn"
            onClick={() => onSelectProduct(product)}
          >
            add to cart
          </button>
        </div>
      </div>

      
    </>
  );
}

export default ProductDetail;
