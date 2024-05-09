import React from 'react'
import styles from './VenueDetailsDes.module.css'

export default function VenueDetailsDes({venueData}) {

    return (
        <div className={styles.venueDetailsDesWrapper}>
            <div>
                <p>{venueData.data.name}</p>
                <p><span>&#9733;</span> {venueData.data.ratingsAverage}</p>
            </div>
            <div>
                <p>📍{venueData.data.city}</p>
                <p>🤼{venueData.data.maxCapacity} (max-capacity)</p>
            </div>
            <p>{venueData.data.address}, {venueData.data.city}, {venueData.data.state}</p>
            <div>
                <p>Description</p>
                <p>{venueData.data.description}</p>
            </div>
            <div>
                <p>Refund Policy</p>
                <p>{venueData.data.refundPolicy}</p>
            </div>
        </div>
    )
}
