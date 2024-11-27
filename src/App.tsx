import React from 'react';
import Login from './pages/login';
import Layout from './components/layout';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Products from './pages/products';
import Cart from './pages/cart';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import ProtectedRoute from './utils/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Redirect root to products */}
          <Route
            path="/"
            element={<Navigate to="/products" />}
          />

          {/* Redirect authenticated users from login to products */}
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/products" /> : <Login />}
          />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/products"
              element={<Products />}
            />
            <Route
              path="/cart"
              element={<Cart />}
            />
          </Route>

          {/* Catch-all route for 404 */}
          <Route
            path="/*"
            element={<NotFoundPage />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
