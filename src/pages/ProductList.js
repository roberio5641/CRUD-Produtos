// src/pages/ProductList.js
import React, { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct } from '../services/Api';
import { Link } from 'react-router-dom';
import './ProductList.css';


const ProductList = () => {
  const [products, setProducts] = useState([]);

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
    getProducts();
  }, []);
  

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div>
      <h1>Product List</h1>
      <Link to="/products/new">Add New Product</Link>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - {product.description} - {product.price} - {product.stock}$
            <Link to={`/products/edit/${product.id}`}>Edit</Link>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
