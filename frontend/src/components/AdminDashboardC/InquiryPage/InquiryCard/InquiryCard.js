import React from 'react'
import styles from './InquiryCard.module.css'
import axios from 'axios';


export default function InquiryCard({request}) {
  
  const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:3001',
});
  function handleDelete(){
    instance.delete(`/request/${request._id}`).then(response=>{
      console.log('deleted sucessfully')
    }).catch(error=>{
      console.error(error.response.data.message)
    })


  }
  return (
    <div className={styles.inquiryCardWrapper}>
      <div>
        <p>👤</p>
      </div>
      <div>
        <div>
          <p>{request.name}</p>
          <p>{request.email}</p>
        </div>
        <div>
          <p>{request.mobileNumber}</p>
          <p>{request.event}</p>
        </div>
        <div>
          <p>{request.eventDate}</p>
          <p>{request.expectedGuests} Guests</p>
        </div>

        <p>{request.perPersonBudget} Rs</p>
      </div>
      <div>
        <button onClick={handleDelete}>🗑️</button>
      </div>
    </div>
  )
}
