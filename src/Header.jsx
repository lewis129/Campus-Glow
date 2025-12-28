import React from "react";

const Header = () => {
  return (
    <nav className="header">
      <div className="logo">
        <img src="/campus-glow-high-resolution-logo.png" alt="campusglow Logo" />
        <div className="logo-details">
          <h1>Campus Glow</h1>
          <p>Glow Up Your Campus Life</p>
        </div>
      </div>
      <input
        type="text"
        id="search-input"
        placeholder="search for perfumes, skincare, moisturize..."
        className="search-bar"
      />
    </nav>
  );
};

export default Header;
