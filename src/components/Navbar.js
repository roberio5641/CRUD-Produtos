// src/components/Navbar.js
import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/products" className="navbar-link">Products</Link>
      <button className="navbar-button" onClick={handleLogout}>Logout</button>
    </nav>
  );
  
};

export default Navbar;
