import React from 'react';
import styles from './BrowseVenues.module.css';
import BrowseVenuesCard from './BrowseVenuesCard/BrowseVenuesCard';

export default function BrowseVenues() {
    return (
        <div className={styles.browerVenuWrapper}>
            <p>Browse Venue</p>
            <div className={styles.browerVenuCardWrapper}>
                <BrowseVenuesCard />
                <BrowseVenuesCard />
                <BrowseVenuesCard />
                <BrowseVenuesCard />
                <BrowseVenuesCard />
                <BrowseVenuesCard />
                <BrowseVenuesCard />
                <BrowseVenuesCard />
                <BrowseVenuesCard />
            </div>
        </div>
    );
}
