import React from "react";
import "./Navbar.css";

const Navbar = ({ searchTerm, setSearchTerm}) => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1>Product Store</h1>
        <input
          className="h-[3rem] w-[20rem] bg-gray-200 px-4 rounded-xl text-black"
          type="text"
          placeholder="Search products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </nav>
  );
};

export default Navbar;
