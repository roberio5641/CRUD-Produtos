import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/Api';
import './Login.css'

const Login = () => {
    const [taxNumber, setTaxNumber] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ taxNumber, password });
            console.log('Login response:', response);

            // Acessando o token corretamente
            const token = response.data?.token;

            if (token) {
                localStorage.setItem('token', token);
                console.log('Token stored, navigating to products...');
                navigate('/products');
            } else {
                console.error('Login successful but no token received');
                alert('Login successful but no token received.');
            }
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            alert('Login failed: ' + (error.response ? error.response.data.message : error.message));
        }
    };

    return (
        <div className="login-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input
              type="text"
              id="taxNumber"
              name="taxNumber"
              value={taxNumber}
              onChange={(e) => setTaxNumber(e.target.value)}
              placeholder="Tax Number"
              required
            />
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit">Login</button>
            <p>Don't have an account? <Link to="/register">Create one</Link></p>
          </form>
        </div>
      );
      
};

export default Login;
