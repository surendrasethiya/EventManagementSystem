import React, { useState } from 'react';
import styles from './review.module.css';
import ReviewCard from './ReviewCard/ReviewCard';
import axios from 'axios';


export default function Review({ venueData }) {
    const [rating, setRating] = useState(null);
    const [review, setReview] = useState('');
    const [message, setMessage] = useState(null);

    const instance = axios.create({
        withCredentials: true,
        baseURL: 'http://localhost:3001',
    });

    const handleRatingClick = (value, e) => {
        setMessage('')
        setRating(value);
    };


    const handleReviewChange = (e) => {
        setReview(e.target.value);
        setMessage('')
    };

    const handleSubmit = () => {
        if (rating !== null && review.trim() !== '') {
            instance.post(`/review/${venueData.data.id}`, { review,rating })
                .then(response => {
                    setMessage('Posted sucessfully')
                    setRating(null);
                    setReview('');

                })
                .catch(error => {
                    setMessage('same user can not review one venue twice');
                });
        } else {
            setMessage('Please select a rating and enter a comment.');
        }
    };

    let reviews = venueData.data.reviews;

    return (
        <div className={styles.reviewWrapper}>
            <div>
                <p>Reviews</p>
            </div>
            <div>
                <form>
                    <div>
                        <span onClick={() => handleRatingClick(1)} className={rating === 1 ? styles.selectedRating : ''}>1 ⭐</span>
                        <span onClick={() => handleRatingClick(2)} className={rating === 2 ? styles.selectedRating : ''}
                        >2 ⭐</span>
                        <span onClick={() => handleRatingClick(3)} className={rating === 3 ? styles.selectedRating : ''}
                        >3 ⭐</span>
                        <span onClick={() => handleRatingClick(4)} className={rating === 4 ? styles.selectedRating : ''}
                        >4 ⭐</span>
                        <span onClick={() => handleRatingClick(5)} className={rating === 5 ? styles.selectedRating : ''}
                        >5 ⭐</span>
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Share your thoughts"
                            value={review}
                            onChange={handleReviewChange}
                        />
                        <button type="button" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </form>
                {message && <p className="error">{message}</p>}


                <div>
                    {reviews.map((review, i) => (
                        <ReviewCard key={i} review={review} />
                    ))}
                </div>
            </div>
        </div>
    );
}
