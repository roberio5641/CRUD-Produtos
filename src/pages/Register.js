import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/Api';
import './Register.css'

const Register = () => {
    const [taxNumber, setTaxNumber] = useState('');
    const [password, setPassword] = useState('');
    const [mail, setMail] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser({ taxNumber, password, mail, phone, name });
            navigate('/login');
        } catch (error) {
            alert('Registration failed: ' + (error.response ? error.response.data.message : error.message));
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                />
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
                    type="email"
                    id="mail"
                    name="mail"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    placeholder="Mail"
                    required
                />
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone"
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
                <button type="submit">Create Account</button>
            </form>
        </div>
    );
};

export default Register;
