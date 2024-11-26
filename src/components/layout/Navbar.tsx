import React from 'react';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DevicesIcon from '@mui/icons-material/Devices';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { RootState } from '../../redux/store';

function Navbar() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex flex-row items-center justify-between border p-8">
      <div>
        <Link
          to="/"
          className="text-3xl font-bold hover:text-sky-700 cursor-pointer drop-shadow-lg"
        >
          TechShop <DevicesIcon />
        </Link>
      </div>
      <div className="flex flex-row items-center gap-x-10">
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