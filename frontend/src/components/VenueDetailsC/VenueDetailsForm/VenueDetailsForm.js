import React, { useState } from 'react';
import styles from './VenueDetailsForm.module.css';
import axios from 'axios';


export default function VenueDetailsForm() {
  const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:3001',
  });

  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    eventDate: '',
    expectedGuests: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value.toLowerCase()])
    );

    instance.post('/request',{data})
    .then(response => {
      setMessage('Requested sucessfully')
      setFormData({
        name: '',
        email: '',
        mobileNumber: '',
        eventDate: '',
        expectedGuests: '',
      })
    })
    .catch(error => {
      console.error('API Request Error:', error);
      setMessage(error.response.data.status);
    });


    console.log(data);
  };

  return (
    <div className={styles.venueDetailsFormWrapper}>
      <p>Inquiry</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="name"
          name="name"
          placeholder='Full name'
          required
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          name="email"
          placeholder='Email'
          required
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="tel"
          id="mobileNumber"
          name="mobileNumber"
          required
          placeholder="Mobile number"
          value={formData.mobileNumber}
          onChange={handleChange}
        />
        <input
          type="date"
          id="eventDate"
          name="eventDate"
          required
          value={formData.eventDate}
          onChange={handleChange}
        />
        <input
          type="number"
          id="expectedGuests"
          name="expectedGuests"
          placeholder="Guest"
          required
          value={formData.expectedGuests}
          onChange={handleChange}
        />
        <button type="submit">Send Inquiry</button>
      </form>
      {message && <p className="error" style={{fontSize:'20px'}}>{message}</p>}

    </div>
  );
}
