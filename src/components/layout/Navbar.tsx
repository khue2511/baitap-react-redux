import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="flex flex-row justify-between border p-8">
      <div>
        <Link
          to="/"
          className="text-3xl font-bold cursor-pointer drop-shadow-lg"
        >
          TechShop
        </Link>
      </div>
      <div className="flex flex-row gap-x-12">
        <Link
          to="/products"
          className="hover:underline cursor-pointer"
        >
          Products
        </Link>
        <Link
          to="/login"
          className="hover:underline cursor-pointer"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
