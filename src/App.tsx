import React from 'react';
import Login from './pages/login';
import Layout from './components/layout';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Products from './pages/products';
import Cart from './pages/cart';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  // return (
  //   <BrowserRouter>
  //     <Layout>
  //       <Routes>
  //         <Route
  //           path="/"
  //           element={<Navigate to="/products" />}
  //         />
  //         <Route
  //           path="/login"
  //           element={<Login />}
  //         />
  //         <Route
  //           path="/products"
  //           element={<Products />}
  //         />
  //         <Route
  //           path="/cart"
  //           element={<Cart />}
  //         />
  //       </Routes>
  //     </Layout>
  //   </BrowserRouter>
  // );

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/products" />} />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/products" /> : <Login />}
          />
          <Route element={<ProtectedRoute />}>
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
