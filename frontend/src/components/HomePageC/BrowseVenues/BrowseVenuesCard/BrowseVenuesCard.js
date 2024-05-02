import React from 'react';
import styles from './BrowseVenuesCard.module.css';

export default function BrowseVenuesCard() {
    return (
        <div className={styles.browerVenuCard}>
            <img src='delhi.jpg' alt='icon' />
            <p>Delhi</p>
        </div>
    );
}
