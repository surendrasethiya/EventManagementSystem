import { useState } from 'react';
import styles from './searchSection.module.css'
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

// import axios from 'axios';


export default function SearchSection() {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const [formData, setFormData] = useState({
    city: '',
    event: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    const lowercasedValue = ['city', 'event'].includes(name) ? value.toLowerCase() : value;

    setFormData({
      ...formData,
      [name]: lowercasedValue,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(`/venue?city=${formData.city}&event=${formData.event}`);
  };

  return (
    <div className={styles.image_container}>
      <div className={styles.overlay_text}>
        Find & Book the Best Venue For Every Special Event
      </div>
      <form className={styles.searchWrapper} onSubmit={handleSubmit}>
        <div>
          <select id="eventOccasion" name="event" defaultValue="" onChange={handleChange}>
            <option value="" disabled hidden>Search for</option>
            <option value="wedding">Wedding</option>
            <option value="Wedding Reception ">Wedding Reception </option>
            <option value="Wedding Anniversary ">Wedding Anniversary </option>
            <option value="Valentine's Day ">Valentine's Day </option>
            <option value="Ring Ceremony ">Ring Ceremony </option>
            <option value="Pre Wedding Mehendi Party ">Pre Wedding Mehendi Party </option>
            <option value="Baby Shower ">Baby Shower </option>
            <option value="Birthday Party ">Birthday Party </option>
            <option value="First Birthday Party ">First Birthday Party </option>
            <option value="Sangeet Ceremony ">Sangeet Ceremony </option>
            <option value="Bachelor Party ">Bachelor Party </option>
            <option value="Bridal Shower ">Bridal Shower </option>
            <option value="Brand Promotion ">Brand Promotion </option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            id="cityInput"
            name="city"
            placeholder="Enter city"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <button type='submit'>Search</button>
        </div>
      </form>
    </div>
  )

}