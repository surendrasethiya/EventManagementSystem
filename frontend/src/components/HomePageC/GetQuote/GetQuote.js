import React from 'react'
import styles from './GetQuote.module.css'
import { Link } from 'react-router-dom'

export default function GetQuote() {
    return (
        <div className={styles.getQuoteWrapper}>
            <div >
                <p>We have thousands of verified venues and vendors from all over India</p>
                <Link to='/request'><button>Get Best Recommedations</button></Link>
            </div>
        </div>
    )
}
