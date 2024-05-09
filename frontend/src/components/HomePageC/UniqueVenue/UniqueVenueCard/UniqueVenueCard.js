import React from 'react'
import styles from './UniquevenueCard.module.css'
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory


export default function UniqueVenueCard({ item }) {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  function handleClick() {
    navigate(`/venue?propertyType=${item.path}`);
  }
  return (
    <button className={styles.uniqueVenueCardWrapper} onClick={handleClick}>
      <div>
        <img src={item.url} alt="location" />
      </div>
      <div className={styles.uniqueVenueCardDetailWrapper}>
        <p>{item.title}</p>
        <p>{item.description}</p>
      </div>
    </button>
  )
}
