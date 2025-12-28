import React from "react";

const Help = () => {
  return (
    <>
      <section className="section-header">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
          <path d="M73.4 297.4C60.9 309.9 60.9 330.2 73.4 342.7L233.4 502.7C245.9 515.2 266.2 515.2 278.7 502.7C291.2 490.2 291.2 469.9 278.7 457.4L173.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L173.3 288L278.7 182.6C291.2 170.1 291.2 149.8 278.7 137.3C266.2 124.8 245.9 124.8 233.4 137.3L73.4 297.3z" />
        </svg>
        <h4>Help & Information</h4>
      </section>
      <section className="help-section">
        <div className="how-to-order">
          <div className="order-steps">
            <div className="step">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <path d="M434.8 54.1C446.7 62.7 451.1 78.3 445.7 91.9L367.3 288L512 288C525.5 288 537.5 296.4 542.1 309.1C546.7 321.8 542.8 336 532.5 344.6L244.5 584.6C233.2 594 217.1 594.5 205.2 585.9C193.3 577.3 188.9 561.7 194.3 548.1L272.7 352L128 352C114.5 352 102.5 343.6 97.9 330.9C93.3 318.2 97.2 304 107.5 295.4L395.5 55.4C406.8 46 422.9 45.5 434.8 54.1z" />
              </svg>
              <h2> How to Order</h2>
            </div>
            <div className="step">
              <span>1</span>
              <div className="step-details">
                <h2>Browse Product</h2>
                <p>
                  Explore our catalog of perfumes , skincare, beauty product,
                  and campus essential
                </p>
              </div>
            </div>
            <div className="step">
              <span>2</span>
              <div className="step-details">
                <h2>select a product</h2>
                <p>
                  Click on any product to view details and tap "order on
                  whatsapp"
                </p>
              </div>
            </div>
            <div className="step">
              <span>3</span>
              <div className="step-details">
                <h2>choose delivery details</h2>
                <p>
                  Select your delivery area and preferred piickup point for
                  convience
                </p>
              </div>
            </div>
            <div className="step">
              <span>4</span>
              <div className="step-details">
                <h2>complete on whats app</h2>
                <p>
                  Your order details will be sent to whatsaap. confirm and we'll
                  deliver!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="delivery">
        <div className="delivery-header">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z" />
          </svg>
          <div className="delivery-header-info">
            <h1>Delivery Information</h1>
            <p>
              We offer delivery services to various areas in Thika. Please
              review our delivery areas and policies below.
            </p>
          </div>
        </div>
        <div className="delivery-areas-list">
          <p className="delivery-areas">Thika town</p>
          <p className="delivery-areas">gretsa university</p>
          <p className="delivery-areas">Mount kenya university</p>
          <p className="delivery-areas">JKUAT</p>
          <p className="delivery-areas">Juja</p>
          <p className="delivery-areas">High point</p>
          <p className="delivery-areas">Weteithie</p>
          <p className="delivery-areas">Jomoko</p>
          <p className="delivery-areas">Bluepost</p>
          <p className="delivery-areas">KMTC-Thika campus</p>
        </div>
      </section>
      <section className="payment">
        <div className="delivery-header">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path d="M128 96C92.7 96 64 124.7 64 160L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 256C576 220.7 547.3 192 512 192L136 192C122.7 192 112 181.3 112 168C112 154.7 122.7 144 136 144L520 144C533.3 144 544 133.3 544 120C544 106.7 533.3 96 520 96L128 96zM480 320C497.7 320 512 334.3 512 352C512 369.7 497.7 384 480 384C462.3 384 448 369.7 448 352C448 334.3 462.3 320 480 320z" />
          </svg>
          <div className="delivery-header-info">
            <h1>Payment Options</h1>
          </div>
        </div>
        <div className="payment-options">
          <div className="payment-cards">
            <span>1</span>
            <div className="payment-card-info">
              <h2>M-Pesa Accepted</h2>
              <p>
                We accept payments via M-Pesa and Airtel Money for your
                convenience.
              </p>
            </div>
          </div>
          <div className="payment-cards">
            <span>2</span>
            <div className="payment-card-info">
              <h2>Cash on Delivery</h2>
              <p>
                Pay with cash when your order is delivered to your specified
                location.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="time">
        <div className="delivery-header">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path d="M528 320C528 434.9 434.9 528 320 528C205.1 528 112 434.9 112 320C112 205.1 205.1 112 320 112C434.9 112 528 205.1 528 320zM64 320C64 461.4 178.6 576 320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320zM296 184L296 320C296 328 300 335.5 306.7 340L402.7 404C413.7 411.4 428.6 408.4 436 397.3C443.4 386.2 440.4 371.4 429.3 364L344 307.2L344 184C344 170.7 333.3 160 320 160C306.7 160 296 170.7 296 184z" />
          </svg>
          <div className="delivery-header-info">
            <h1>Delivery Time</h1>
          </div>
        </div>
        <div className="time-list">
          <p className="time-areas">Orders are processed Monday to Saturday.</p>
          <p className="time-areas">
            No deliveries on Sundays and public holidays.
          </p>
          <p className="time-areas">
            All orders are delivered within 48hrs of order
          </p>
        </div>
        <div className="time-info">
          <p>
            ❗Orders are typically processed and delivered within 24 to 48
            hours, depending on your location and order volume.
          </p>
        </div>
      </section>
      <section className="need-help">
        <div className="delivery-header">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path d="M115.9 448.9C83.3 408.6 64 358.4 64 304C64 171.5 178.6 64 320 64C461.4 64 576 171.5 576 304C576 436.5 461.4 544 320 544C283.5 544 248.8 536.8 217.4 524L101 573.9C97.3 575.5 93.5 576 89.5 576C75.4 576 64 564.6 64 550.5C64 546.2 65.1 542 67.1 538.3L115.9 448.9zM153.2 418.7C165.4 433.8 167.3 454.8 158 471.9L140 505L198.5 479.9C210.3 474.8 223.7 474.7 235.6 479.6C261.3 490.1 289.8 496 319.9 496C437.7 496 527.9 407.2 527.9 304C527.9 200.8 437.8 112 320 112C202.2 112 112 200.8 112 304C112 346.8 127.1 386.4 153.2 418.7z" />
          </svg>
          <div className="delivery-header-info">
            <h1>Need Help?</h1>
          </div>
        </div>
        <div className="help-info">
          <p className="help-info">
            If you have any questions or need assistance, please don't hesitate
            to contact our customer support team via WhatsApp or email. We're
            here to help!
          </p>
          <div className="help-contact">
            <p>Chat with us on whatsApp</p>
          </div>
        </div>
      </section>
      <section className="why">
        <div className="delivery-header">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path d="M320 64C324.6 64 329.2 65 333.4 66.9L521.8 146.8C543.8 156.1 560.2 177.8 560.1 204C559.6 303.2 518.8 484.7 346.5 567.2C329.8 575.2 310.4 575.2 293.7 567.2C121.3 484.7 80.6 303.2 80.1 204C80 177.8 96.4 156.1 118.4 146.8L306.7 66.9C310.9 65 315.4 64 320 64z" />
          </svg>
          <div className="delivery-header-info">
            <h1>Why Choose Campus Glow?</h1>
          </div>
        </div>
        <div className="why-info">
          <div className="why-list">
            <div className="why-card">
              <h1>✨</h1>
              <div className="why-info">
                <h2>Authentic Products</h2>
                <p>100% genuine beauty and campus essentials</p>
              </div>
            </div>
            <div className="why-card">
              <h1>🚚</h1>
              <div className="why-info">
                <h2>Fast Delivery</h2>
                <p>Quick and reliable delivery to your doorstep</p>
              </div>
            </div>
            <div className="why-card">
              <h1>💳</h1>
              <div className="why-info">
                <h2>Secure Payment</h2>
                <p>Multiple safe payment options available</p>
              </div>
            </div>
            <div className="why-card">
              <h1>😊</h1>
              <div className="why-info">
                <h2>Excellent Support</h2>
                <p>We're here to help you every step of the way</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Help;
