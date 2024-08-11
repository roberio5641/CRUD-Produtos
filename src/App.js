// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ProductList from './pages/ProductList';
import ProductForm from './pages/ProductForm';
import Navbar from './components/Navbar';
import Register from './pages/Register';

const App = () => {
  const isAuthenticated = localStorage.getItem('token') !== null;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/products"
          element={
            isAuthenticated ? (
              <>
                <Navbar />
                <ProductList />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/products/new"
          element={
            isAuthenticated ? (
              <>
                <Navbar />
                <ProductForm />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/products/edit/:id"
          element={
            isAuthenticated ? (
              <>
                <Navbar />
                <ProductForm />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
