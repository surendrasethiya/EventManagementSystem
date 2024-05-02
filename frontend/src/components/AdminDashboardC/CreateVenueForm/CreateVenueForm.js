import React, { useState } from 'react';
import styles from './CreateVenueForm.module.css'
import AdminCreateVImageU from '../AdminCreateVImageU/AdminCreateVImageU'
import axios from 'axios';



export default function CreateVenueForm({ updateVenue }) {
    const [selectedImages, setSelectedImages] = useState([]);
    const [uploadError, setUploadError] = useState(null);
    const [message, setMessage] = useState(null);


    const instance = axios.create({
        withCredentials: true,
        baseURL: 'http://localhost:3001',
    });


    const [formData, setFormData] = useState({
        name: '',
        state: '',
        numberOfRooms: 0,
        numberOfHalls: 0,
        city: '',
        maxCapacity: 0,
        numberOfGardens: 0,
        address: '',
        description: '',
        refundPolicy: '',
        propertyType: ''
    });


    const handleUploadOneByOne = async (images, venueId) => {
        try {
          for (let i = 0; i < images.length; i++) {
            // Use axios directly, not instance.post
            const response = await instance.post(`http://localhost:3001/venue/${venueId}/i`,{image:images[i]});
      
            if (response.status !== 200) {
              throw new Error(`Image upload failed. Status: ${response.status}`);
            }
      
            const responseData = response.data;
            // console.log(`Image uploaded successfully. Backend response:`, responseData);
      
            // Add any confirmation logic here
          }
          setMessage('venue and images uploaded successfully')
        } catch (error) {
          console.error('Error uploading images to the backend:', error);
          setUploadError(error.message);
        }
      };
      


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('')
        instance.post('/venue/cv', { formData })
            .then(response => {
                setMessage('venue create successfully uploading photos please wait')
                handleUploadOneByOne(selectedImages,response.data.id)
            }).catch(error => {
                console.error('API Request Error:', error);
                setMessage(error.response.data.status);
            })

        // console.log('Form Data:', formData);
    };

    return (
        <div className={styles.formWrapper}>
            <div className={styles.mainFormWrapper}>
                <h1>Venue Details</h1>
                <form action="" onSubmit={handleSubmit}>
                    <div className={styles.formOtherDetails}>
                        <div>
                            <label htmlFor="name">Venue Name:<span>*</span></label>
                            <input
                                type="text"
                                placeholder="Venue name"
                                required
                                name='name'
                                value={formData.name}
                                onChange={handleInputChange}
                            />

                            <label htmlFor="state">State:<span>*</span></label>
                            <input
                                type="text"
                                id="state"
                                name="state"
                                placeholder="Enter your state"
                                required
                                value={formData.state}
                                onChange={handleInputChange}
                            />

                            <label htmlFor="numberOfRooms">Number of rooms:<span>*</span></label>
                            <input
                                type="number"
                                id="numberOfRooms"
                                name="numberOfRooms"
                                placeholder="Number of rooms"
                                required
                                value={formData.numberOfRooms}
                                onChange={handleInputChange}
                            />

                            <label htmlFor="numberOfHalls">Number of halls:<span>*</span></label>
                            <input
                                type="number"
                                id="numberOfHalls"
                                name="numberOfHalls"
                                placeholder="Number of halls"
                                required
                                value={formData.numberOfHalls}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="city">City:<span>*</span></label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                placeholder="Enter your city"
                                required
                                value={formData.city}
                                onChange={handleInputChange}
                            />

                            <label htmlFor="maxCapacity">Max Capacity:<span>*</span></label>
                            <input
                                type="number"
                                id="maxCapacity"
                                name="maxCapacity"
                                placeholder="Max capacity"
                                required
                                value={formData.maxCapacity}
                                onChange={handleInputChange}
                            />

                            <label htmlFor="numberOfGardens">Number of gardens:<span>*</span></label>
                            <input
                                type="number"
                                id="numberOfGardens"
                                name="numberOfGardens"
                                placeholder="Number of gardens"
                                required
                                value={formData.numberOfGardens}
                                onChange={handleInputChange}
                            />

                            <div className={styles.eventSelector}>
                                <label htmlFor="eventOccasion">Venue type:<span>*</span></label>
                                <select id="eventOccasion" name="propertyType" required defaultValue="" value={formData.propertyType}
                                    onChange={handleInputChange}>
                                    <option value="" disabled hidden>Type of Venue</option>
                                    <option value="garden">garden</option>
                                    <option value="hotel">hotel </option>
                                    <option value="pool">pool </option>
                                    <option value="hall">hall</option>
                                    <option value="confress hall">confress hall </option>
                                    <option value="other">other</option>
                                </select>
                            </div>




                        </div>
                    </div>

                    <div className={styles.addressWrapper}>
                        <label htmlFor='address'>Address</label>
                        <textarea name="address" id="" value={formData.address}
                            onChange={handleInputChange}></textarea>
                        <label htmlFor='description'>Description</label>
                        <textarea name="description" id="" value={formData.description}
                            onChange={handleInputChange}></textarea>
                        <label htmlFor='refundPolicy'>Refund policy</label>
                        <textarea name="refundPolicy" id=""
                            value={formData.refundPolicy}
                            onChange={handleInputChange}></textarea>
                    </div>
                    <AdminCreateVImageU selectedImages={selectedImages} setSelectedImages={setSelectedImages} uploadError={uploadError} />
                    <div className={styles.formButton}>
                        <button type="submit">Create Venue</button>
                    </div>
                    {message && <p className="error">{message}</p>}

                </form>
            </div>
        </div>

    )
}
