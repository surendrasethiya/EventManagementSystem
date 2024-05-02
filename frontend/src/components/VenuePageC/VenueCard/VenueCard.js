import React from 'react'
import styles from './VenueCard.module.css'
import { Link } from 'react-router-dom'

export default function VenueCard({ venue }) {
  return (
    <Link to={`/venue/${venue.id}`} className={styles.uniqueVenueCardWrapper}>
      <img
        src={venue.venueImages.length > 0 ? venue.venueImages[0].image.url : 'delhi.jpg'}
        alt="location"
      />
      <div className={styles.venueDetailsWrapper}>
        <div>
          <div>&#x1F4CD; {venue.city}</div>
          <div> ⭐ {venue.ratingsAverage}</div>
        </div>
        <div>
          <h4>{venue.name}</h4>
        </div>
        <Link to='/request'><button>Request a quote</button></Link>
      </div>
    </Link>
  )
}
