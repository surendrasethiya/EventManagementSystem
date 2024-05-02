import React, { useState } from 'react';
import styles from '../styles/UpdatePassword.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function UpdatePassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: '',
    newPassword: '',
    confirmPassword: '',
  });

  const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:3001',
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if new password meets minimum length requirement
    if (formData.newPassword.length < 8) {
      setMessage('New password must be at least 8 characters long');
      return; // Stop further processing
    }

    // Check if new password and confirm password match
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage("New password and confirm password don't match");
      return; // Stop further processing
    }

    // Clear error message if passwords match and meet length requirement
    setMessage(null);
    const { password, newPassword } = formData;

    instance.patch('/user/updatePassword', { password, newPassword })
      .then(response => {
        setMessage('Password updated sucessfully')
        setFormData({
          password: '',
          newPassword: '',
          confirmPassword: '',
        });
        navigate('/login')

      })
      .catch(error => {
        console.error('API Request Error:', error);
        setMessage('An error occurred while updating the password');
      });
  };

  return (
    <div className={styles.updatePasswordWrapper}>
      <div className={styles.updatePasswordInnerWrapper}>
        <p>Update Password</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="password">Current Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="text"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          {message && <p className="error">{message}</p>}
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}
