import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './AdminHomeCard.module.css'
import axios from 'axios'


export default function AdminHomeCard({ updateVenue, setUpdatevenue, venue, errorMessage, setErrorMessage }) {
    const instance = axios.create({
        withCredentials: true,
        baseURL: 'http://localhost:3001',
    });


    let venueImages = venue.venueImages[0] ? venue.venueImages[0].image.url : '5starvenue.jpg'
    function handleUpdate() {
        setUpdatevenue(true)
    }

    async function handleDelete() {
        const shouldDelete = window.confirm('Are you sure you want to delete this venue?');

        if (shouldDelete) {
            instance.delete(`venue/${venue.id}`)
                .then(response => {
                    setErrorMessage('deleted sucessfully')
                })
                .catch(error => {
                    setErrorMessage(error.response.data.message)
                    console.error('API Request Error:', error);
                });
        }
    }




    return (
        <div className={styles.adminHomeCardWrapper}>
            <img src={venueImages} alt="location" />
            <div className={styles.homeCardVenueDetailsWrapper}>
                <div>
                    <div>&#x1F4CD; {venue.city}</div>
                    <div> ⭐ {venue.ratingsAverage}</div>
                </div>
                <h4>{venue.name}</h4>
                <div>
                    <button onClick={handleDelete} style={{width:'100%'}}>Delete</button>
                    {/* <Link to='/admin/venue/:venueid?'><button onClick={handleUpdate}>Update</button></Link> */}
                </div>
            </div>
        </div>
    )
}
