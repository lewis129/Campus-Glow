function Category({ onSelect, products }) {
  // count products per category
  const countProducts = (category) => {
    if (!products || products.length === 0) return 0;

    const count = products.filter(
      (p) =>
        p.category &&
        p.category.toLowerCase().trim() === category.toLowerCase().trim()
    ).length;

    console.log("Category:", category, "Count:", count);
    return count;
  };

  // ...rest of your JSX




  return (
    <>
      <section className="section-header">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
          <path d="M73.4 297.4C60.9 309.9 60.9 330.2 73.4 342.7L233.4 502.7C245.9 515.2 266.2 515.2 278.7 502.7C291.2 490.2 291.2 469.9 278.7 457.4L173.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L173.3 288L278.7 182.6C291.2 170.1 291.2 149.8 278.7 137.3C266.2 124.8 245.9 124.8 233.4 137.3L73.4 297.3z" />
        </svg>
        <h4>All Categorys</h4>
      </section>
      <section className="category">
        <p className="category-intro">
          {" "}
          Browse our wide range of products for campus students
        </p>
        <div className="category-list">
          <div className="category-card" onClick={() => onSelect("perfume")}>
            <svg
              className="c-icon-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <path d="M320.1 32C329.1 32 337.4 37.1 341.5 45.1L415 189.3L574.9 214.7C583.8 216.1 591.2 222.4 594 231C596.8 239.6 594.5 249 588.2 255.4L473.7 369.9L499 529.8C500.4 538.7 496.7 547.7 489.4 553C482.1 558.3 472.4 559.1 464.4 555L320.1 481.6L175.8 555C167.8 559.1 158.1 558.3 150.8 553C143.5 547.7 139.8 538.8 141.2 529.8L166.4 369.9L52 255.4C45.6 249 43.4 239.6 46.2 231C49 222.4 56.3 216.1 65.3 214.7L225.2 189.3L298.8 45.1C302.9 37.1 311.2 32 320.2 32zM320.1 108.8L262.3 222C258.8 228.8 252.3 233.6 244.7 234.8L119.2 254.8L209 344.7C214.4 350.1 216.9 357.8 215.7 365.4L195.9 490.9L309.2 433.3C316 429.8 324.1 429.8 331 433.3L444.3 490.9L424.5 365.4C423.3 357.8 425.8 350.1 431.2 344.7L521 254.8L395.5 234.8C387.9 233.6 381.4 228.8 377.9 222L320.1 108.8z" />
            </svg>
            <div className="category-info">
              <h2>perfumes</h2>
              <p>signature scent for every mood</p>
              <span>
                {countProducts("perfume") > 0
                ? `${countProducts("perfume")} products`
                : "no items available"}
              </span>
            </div>
          </div>
          <div
            className="category-card"
            onClick={() => onSelect("bodylotion")}
          >
            <svg
              className="c-icon-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <path d="M320 576C214 576 128 490 128 384C128 292.8 258.2 109.9 294.6 60.5C300.5 52.5 309.8 48 319.8 48L320.2 48C330.2 48 339.5 52.5 345.4 60.5C381.8 109.9 512 292.8 512 384C512 490 426 576 320 576zM240 376C240 362.7 229.3 352 216 352C202.7 352 192 362.7 192 376C192 451.1 252.9 512 328 512C341.3 512 352 501.3 352 488C352 474.7 341.3 464 328 464C279.4 464 240 424.6 240 376z" />
            </svg>
            <div className="category-info">
              <h2>Body lotion</h2>
              <p>signature scent for every mood</p>
               <span>
                {countProducts("bodylotion") > 0
                ? `${countProducts("bodylotion")} products`
                : "no items available"}
              </span>
            </div>
          </div>
          <div
            className="category-card"
            onClick={() => onSelect("beautyproducts")}
          >
            <svg
              className="c-icon-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <path d="M576 320C576 320.9 576 321.8 576 322.7C575.6 359.2 542.4 384 505.9 384L408 384C381.5 384 360 405.5 360 432C360 435.4 360.4 438.7 361 441.9C363.1 452.1 367.5 461.9 371.8 471.8C377.9 485.6 383.9 499.3 383.9 513.8C383.9 545.6 362.3 574.5 330.5 575.8C327 575.9 323.5 576 319.9 576C178.5 576 63.9 461.4 63.9 320C63.9 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320zM192 352C192 334.3 177.7 320 160 320C142.3 320 128 334.3 128 352C128 369.7 142.3 384 160 384C177.7 384 192 369.7 192 352zM192 256C209.7 256 224 241.7 224 224C224 206.3 209.7 192 192 192C174.3 192 160 206.3 160 224C160 241.7 174.3 256 192 256zM352 160C352 142.3 337.7 128 320 128C302.3 128 288 142.3 288 160C288 177.7 302.3 192 320 192C337.7 192 352 177.7 352 160zM448 256C465.7 256 480 241.7 480 224C480 206.3 465.7 192 448 192C430.3 192 416 206.3 416 224C416 241.7 430.3 256 448 256z" />
            </svg>
            <div className="category-info">
              <h2>beauty products</h2>
              <p>signature scent for every mood</p>
               <span>
                {countProducts("beautyproducts") > 0
                ? `${countProducts("beautyproducts")} products`
                : "no items available"}
              </span>
            </div>
          </div>
          <div className="category-card" onClick={() => onSelect("skincare")}>
            <svg
              className="c-icon-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <path d="M442.9 144C415.6 144 389.9 157.1 373.9 179.2L339.5 226.8C335 233 327.8 236.7 320.1 236.7C312.4 236.7 305.2 233 300.7 226.8L266.3 179.2C250.3 157.1 224.6 144 197.3 144C150.3 144 112.2 182.1 112.2 229.1C112.2 279 144.2 327.5 180.3 371.4C221.4 421.4 271.7 465.4 306.2 491.7C309.4 494.1 314.1 495.9 320.2 495.9C326.3 495.9 331 494.1 334.2 491.7C368.7 465.4 419 421.3 460.1 371.4C496.3 327.5 528.2 279 528.2 229.1C528.2 182.1 490.1 144 443.1 144zM335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1C576 297.7 533.1 358 496.9 401.9C452.8 455.5 399.6 502 363.1 529.8C350.8 539.2 335.6 543.9 320 543.9C304.4 543.9 289.2 539.2 276.9 529.8C240.4 502 187.2 455.5 143.1 402C106.9 358.1 64 297.7 64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1L320 171.8L335 151.1z" />
            </svg>
            <div className="category-info">
              <h2>skincare</h2>
              <p>signature scent for every mood</p>
               <span>
                {countProducts("skincare") > 0
                ? `${countProducts("skincare")} products`
                : "no items available"}
              </span>
            </div>
          </div>
          <div
            className="category-card"
            onClick={() => onSelect("accessories")}
          >
            <svg
              className="c-icon-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <path d="M208 64C172.7 64 144 92.7 144 128L144 512C144 547.3 172.7 576 208 576L432 576C467.3 576 496 547.3 496 512L496 128C496 92.7 467.3 64 432 64L208 64zM280 480L360 480C373.3 480 384 490.7 384 504C384 517.3 373.3 528 360 528L280 528C266.7 528 256 517.3 256 504C256 490.7 266.7 480 280 480z" />
            </svg>
            <div className="category-info">
              <h2>Accessories</h2>
              <p>signature scent for every mood</p>
               <span>
                {countProducts("accessories") > 0
                ? `${countProducts("accessories")} products`
                : "no items available"}
              </span>
            </div>
          </div>
          <div
            className="category-card"
            onClick={() => onSelect("campusessential")}
          >
            <svg
              className="c-icon-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <path d="M256 144C256 108.7 284.7 80 320 80C355.3 80 384 108.7 384 144L384 192L256 192L256 144zM208 192L144 192C117.5 192 96 213.5 96 240L96 448C96 501 139 544 192 544L448 544C501 544 544 501 544 448L544 240C544 213.5 522.5 192 496 192L432 192L432 144C432 82.1 381.9 32 320 32C258.1 32 208 82.1 208 144L208 192zM232 240C245.3 240 256 250.7 256 264C256 277.3 245.3 288 232 288C218.7 288 208 277.3 208 264C208 250.7 218.7 240 232 240zM384 264C384 250.7 394.7 240 408 240C421.3 240 432 250.7 432 264C432 277.3 421.3 288 408 288C394.7 288 384 277.3 384 264z" />
            </svg>
            <div className="category-info">
              <h2>Campus essentials</h2>
              <p>signature scent for every mood</p>
              <span>
                {countProducts("campusessential") > 0
                ? `${countProducts("campusessential")} products`
                : "no items available"}
              </span>
            </div>
          </div>
        </div>
        <div 
        className="all-category"
        onClick={() => onSelect("all")}
        >
          <h3>View all products</h3>
          <p>Browse our complete collection of 1000+ items</p>
        </div>
      </section>
    </>
  );
}

export default Category;
