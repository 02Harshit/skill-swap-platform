// src/pages/Register.jsx
import React, { useState } from 'react';
import styles from './RegistrationPage.module.css';
import { registerUser } from '../services/AuthServices';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setError('');
    setSuccess('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await registerUser(formData);
      setSuccess(res.message);
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Create Your Account</h2>

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}

        <input
          type="text"
          name="username"
          placeholder="User Name"
          className={styles.input}
          value={formData.username}
          onChange={handleChange}
          required
        />
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className={styles.input}
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit" className={styles.button}>
          Register
        </button>

        <p className={styles.loginText}>
          Already have an account? <a href="/login">Log in</a>
        </p>
      </form>
    </div>
  );
};

export default RegistrationPage;
