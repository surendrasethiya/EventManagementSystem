import React, {useState } from 'react'
import styles from '../styles/RequestForm.module.css'
import axios from 'axios';

export default function RequestForm() {
  
  const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:3001',
  });

  const [message, setMessage] = useState(null);



  const [formData, setFormData] = useState({
    event: '',
    city: '',
    expectedGuests: '',
    eventDate: '',
    mobileNumber: '',
    state: '',
    perPersonBudget: '',
    name: '',
    email: '',
  });

  const handleChange = (e) => {
    setMessage('')
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toLowerCaseFormData = () => {
    const lowerCaseData = {};
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        lowerCaseData[key] = formData[key].toLowerCase();
      }
    }
    return lowerCaseData;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = toLowerCaseFormData();


    // Use formData in your logic, for example, making an API request with axios
    instance.post('/request',{data})
      .then(response => {
        setMessage('Requested sucessfully')
        setFormData({
          event: '',
          city: '',
          expectedGuests: '',
          eventDate: '',
          mobileNumber: '',
          state: '',
          perPersonBudget: '',
          name: '',
          email: '',
        });
      })
      .catch(error => {
        console.error('API Request Error:', error);
        setMessage(error.response.data.status);
      });

    // Clear form fields or handle other actions after form submission
    
  };

  return (
    <div className={styles.formWrapper}>
      <div className={styles.mainFormWrapper}>
        <h1>Get Quotes</h1>
        <p>Get best suited venues for your event</p>
        <p>Compare proposals and quotes from recommended venues. Select and Book the best.</p>
        <form onSubmit={handleSubmit}>
          <div className={styles.eventSelector}>
            <label htmlFor="event">Event/Occasion:<span>*</span></label>
            <select id="eventOccasion" name="event" required  value={formData.event} onChange={handleChange}>
              <option value="" disabled hidden>What type of event you planning for ?</option>
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
            </select>
          </div>

          <div className={styles.formOtherDetails}>
            <div>
              <label htmlFor="city">City:<span>*</span></label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Enter your city"
                required
                value={formData.city}
                onChange={handleChange}
              />
              <label htmlFor="expectedGuests">Expected Guest:<span>*</span></label>
              <input
                type="number"
                id="expectedGuests"
                name="expectedGuests"
                placeholder="How many guests are you expection?"
                required
                onChange={handleChange}
              />
              <label htmlFor="eventDate">Event Date:<span>*</span></label>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                required
                value={formData.eventDate}
                onChange={handleChange}
              />
              <label htmlFor="mobileNumber">Mobile Number:<span>*</span></label>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                required
                placeholder="Enter your mobile number"
                value={formData.mobileNumber}
                onChange={handleChange}

              />

            </div>
            <div>
              <label htmlFor="state">State:<span>*</span></label>
              <input
                type="text"
                id="state"
                name="state"
                placeholder="Enter your state"
                required
                value={formData.state}
                onChange={handleChange}
              />
              <label htmlFor="perPersonbudget">Per Person Budget:<span>*</span></label>
              <input
                type="number"
                id="perPersonBudget"
                name="perPersonBudget"
                placeholder="Per person budget"
                required
                value={formData.perPersonBudget}
                onChange={handleChange}
              />
              <label htmlFor="name">Your Name:<span>*</span></label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                required
                value={formData.name}
                onChange={handleChange}
              />
              <label htmlFor="email">Email Id:<span>*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.formButton}>
            <button type="submit">Create Inquiry</button>
          </div>
        </form>
        {message && <p className="error">{message}</p>}
      </div>
    </div>
  )
}
