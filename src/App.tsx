import React from 'react';
import './App.css';
import Login from './pages/login';
import Layout from './components/layout';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Products from './pages/products';
import Cart from './pages/cart';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/products" />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/products"
            element={<Products />}
          />
          <Route
            path="/cart"
            element={<Cart />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
