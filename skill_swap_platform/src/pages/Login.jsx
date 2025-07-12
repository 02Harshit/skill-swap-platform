import React, { useState } from 'react';
import styles from './Login.module.css';
import { loginUser } from '../services/AuthServices';
const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setError('');
    setSuccess('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      setSuccess(res.message);

      // Save token to localStorage
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));

      // Redirect (optional)
      window.location.href = '/'; // or use React Router
    } catch (err) {
       setError(typeof err === 'string' ? err : err.message || 'Login failed');
       console.error('Login Error:', err);
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Login to Your Account</h2>

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className={styles.input}
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className={styles.input}
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className={styles.button}>
          Login
        </button>

        <p className={styles.loginText}>
          Don’t have an account? <a href="/registration">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
