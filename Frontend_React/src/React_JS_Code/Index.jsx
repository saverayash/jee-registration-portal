import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Index() {
    const [isLogin, setIsLogin] = useState(true); 
    const [form, setForm] = useState({
        id: '',
        password: '',
        first_name: '',
        mid_name: '',
        last_name: '',
        dob: '',
        gender: '',
        category: '',
        hsc_board_name: '',
        hsc_seat_no: '',
        adhar_card_no: '',
        email: '',
        address: '',
        pincode: ''
    });

    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login', {
                id: form.id,
                password: form.password
            });
    
            const { role, token } = response.data;
            localStorage.setItem('id',form.id);
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
          
            if (role === 'Student') {
                navigate('/student');
            } else if (role === 'Admin') {
                navigate('/admin');
            } else if (role === 'Paper_Setter') {
                navigate('/paper_setter');
            } else if (role === 'Centre') {
                navigate('/centre');
            } else {
                setError('Unknown role');
            }
    
        } catch (err) {
            setError('Invalid ID or password');
            console.error(err);
        }
    };
    

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/signup', form);
            if (res.status === 201) {
                alert('Signup successful');
                setIsLogin(true); 
            }
        } catch (err) {
            setError('Error occurred during signup');
            console.error(err);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#f4f6f8',
            padding: '20px'
        }}>
            <div style={{
                background: '#fff',
                padding: '30px',
                borderRadius: '12px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                width: '100%',
                maxWidth: '500px'
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
                    {isLogin ? 'Login' : 'Sign Up'}
                </h2>
                <form onSubmit={isLogin ? handleLogin : handleSignup}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <label>ID:</label>
                        <input type="text" name="id" value={form.id} onChange={handleChange} required />
    
                        <label>Password:</label>
                        <input type="password" name="password" value={form.password} onChange={handleChange} required />
    
                        {!isLogin && (
                            <>
                                <label>First Name:</label>
                                <input type="text" name="first_name" value={form.first_name} onChange={handleChange} required />
    
                                <label>Middle Name:</label>
                                <input type="text" name="mid_name" value={form.mid_name} onChange={handleChange} />
    
                                <label>Last Name:</label>
                                <input type="text" name="last_name" value={form.last_name} onChange={handleChange} />
    
                                <label>DOB:</label>
                                <input type="date" name="dob" value={form.dob} onChange={handleChange} required />
    
                                <label>Gender:</label>
                                <input type="text" name="gender" value={form.gender} onChange={handleChange} required />
    
                                <label>Category:</label>
                                <input type="text" name="category" value={form.category} onChange={handleChange} />
    
                                <label>HSC Board Name:</label>
                                <input type="text" name="hsc_board_name" value={form.hsc_board_name} onChange={handleChange} />
    
                                <label>HSC Seat No:</label>
                                <input type="number" name="hsc_seat_no" value={form.hsc_seat_no} onChange={handleChange} />
    
                                <label>Aadhar Card No:</label>
                                <input type="text" name="adhar_card_no" value={form.adhar_card_no} onChange={handleChange} required />
    
                                <label>Email:</label>
                                <input type="email" name="email" value={form.email} onChange={handleChange} required />
    
                                <label>Address:</label>
                                <input type="text" name="address" value={form.address} onChange={handleChange} required />
    
                                <label>Pincode:</label>
                                <input type="text" name="pincode" value={form.pincode} onChange={handleChange} required />
                            </>
                        )}
                    </div>
    
                    <button type="submit" style={{
                        width: '100%',
                        marginTop: '20px',
                        padding: '10px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}>
                        {isLogin ? 'Login' : 'Signup'}
                    </button>
    
                    {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
                </form>
    
                <hr style={{ margin: '20px 0' }} />
    
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                    }}
                >
                    {isLogin ? 'Create a new account' : 'Already have an account? Login'}
                </button>
            </div>
        </div>
    );
    
}

export default Index;
