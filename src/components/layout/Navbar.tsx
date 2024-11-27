import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DevicesIcon from '@mui/icons-material/Devices';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { RootState } from '../../redux/store';

function Navbar() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false); 
  }, [location]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="navbar flex flex-col sm:flex-row gap-y-8 sm:items-center justify-between border p-8">
      <div className="flex justify-between">
        <Link
          to="/"
          className="text-3xl font-bold hover:text-sky-700 cursor-pointer drop-shadow-lg"
        >
          TechShop <DevicesIcon />
        </Link>
        <button
          className="block sm:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <MenuIcon />
        </button>
      </div>
      <div
        className={`flex items-center gap-x-10 ${menuOpen ? 'flex-col' : 'hidden'} sm:flex sm:flex-row`}
      >
        {!isAuthenticated ? (
          <>
            <Link
              to="/login"
              className="flex flex-col items-center p-2 hover:text-sky-700 cursor-pointer"
            >
              <LoginIcon />
              <p>Login</p>
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/products"
              className="flex flex-col items-center p-2 hover:text-sky-700 cursor-pointer"
            >
              <StoreIcon />
              <p>Products</p>
            </Link>
            <Link
              to="/cart"
              className="flex flex-col items-center p-2 hover:text-sky-700 cursor-pointer"
            >
              <ShoppingCartIcon />
              <p>Cart</p>
            </Link>
            <button
              className="flex flex-col items-center p-2 hover:text-sky-700 cursor-pointer"
              onClick={handleLogout}
            >
              <LogoutIcon />
              <p>Log out</p>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
