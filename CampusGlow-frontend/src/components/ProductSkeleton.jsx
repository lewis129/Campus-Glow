function ProductSkeleton({ count = 6 }) {
  return (
    <div className="product-list skeleton-list">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="product-card pc-card skeleton-card">
          <div className="image-container skeleton-img"></div>

          <div className="product-details">
            <div className="skeleton-text short"></div>
            <div className="skeleton-text long"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductSkeleton;
