import React from 'react'
import styles from './ReveiwCard.module.css'

export default function ReviewCard({review}) {
  

  return (
    <>
    <div className={styles.reviewCardWrapper}>
        <div>
            <p>👤</p>
        </div>
        <div>
            <p>{review.user.userName}</p>
            <p>{review.createdAt.slice(0, 10)}</p>
            <p>{review.review}</p>
        </div>
        <p>⭐ {review.rating}</p>
    </div>
    <hr style={{marginTop:"20px",marginBottom:"10px"}}/>
    </>
  )
}
