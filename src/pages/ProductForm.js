import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, updateProduct, fetchProducts } from '../services/Api';
import './ProductForm.css'
    

const ProductForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      if (id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId)) {
          setError('ID inválido.');
          return;
        }
        
        try {
          const response = await fetchProducts();
          const products = response.data.products;
          const product = products.find(prod => prod.id === parsedId);

          if (product) {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setStock(product.stock);
          } else {
            setError('Produto não encontrado.');
          }
        } catch (err) {
          setError('Erro ao buscar produto.');
        }
      }
    };

    getProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) {
      console.error('Não é possível salvar o produto:', error);
      return;
    }

    try {
      const productData = {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock, 10)
      };
      
      if (id) {
        await updateProduct(id, productData);
      } else {
        await createProduct(productData);
      }
      navigate('/products');
    } catch (error) {
      if (error.response) {
        console.error('Erro do servidor:', error.response.data);
      } else {
        console.error('Erro ao salvar o produto', error);
      }
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2 className="form-title">{id ? 'Editar Produto' : 'Novo Produto'}</h2>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome do Produto"
        required
        className="form-input"
      />
      <input
        type="text"
        id="description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição do Produto"
        required
        className="form-input"
      />
      <input
        type="number"
        id="price"
        name="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Preço do Produto"
        required
        className="form-input"
      />
      <input
        type="number"
        id="stock"
        name="stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        placeholder="Estoque do Produto"
        required
        className="form-input"
      />
      <button type="submit" className="form-button">
        {id ? 'Atualizar' : 'Criar'}
      </button>
    </form>
  );
  
};

export default ProductForm;
