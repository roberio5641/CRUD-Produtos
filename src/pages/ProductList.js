// src/pages/ProductList.js
import React, { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct, registerUser , login} from '../services/Api';
import { Link } from 'react-router-dom';
import './ProductList.css';
import './Register.js'


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetchProducts();
        console.log("Data received:", response);
        setProducts(response.data.products || []); 
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]); 
      }
    };

    const getUserName = async () => {
      try {
        const response = await registerUser();
        console.log("Data received:", response);
        setName(response.name || ''); 
      } catch (error) {
        console.error("Failed to fetch name: ", error);
        setName('Guest');
      }
    };


    getUserName();
    getProducts();
  }, []);
  

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div className="product-list-container">
      <h1 className="title">Product List</h1>
      <h3 className="welcome-message">Bem vindo aos seus produtos !</h3> 
      <ul className="product-list">
        {products.map(product => (
          <li key={product.id} className="product-item">
            <div className="product-info">
              <span className="product-name">{product.name}</span>  
              <br/>
              <span className="product-description">{product.description}</span> 
              <br/>
              <span className="product-price">R$: {product.price}</span> 
              <br/>
              <span className="product-stock">{product.stock} in stock</span>
            </div>
            <div className="button-group">
              <Link to={`/products/edit/${product.id}`} className="edit-button">Edit</Link>
              <button className="delete-button" onClick={() => handleDelete(product.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <Link to="/products/new" className="add-product-button">Add New Product</Link>
    </div>
  );
  
  
};

export default ProductList;
