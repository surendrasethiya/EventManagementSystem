import styles from '../styles/VenueDetails.module.css'
import VenueDetailsForm from '../components/VenueDetailsC/VenueDetailsForm/VenueDetailsForm'
import VenueDetailsDes from '../components/VenueDetailsC/VenueDetailsDes/VenueDetailsDes'
import Review from '../components/VenueDetailsC/Review/Review'
import ImageCrousel from '../components/VenueDetailsC/ImageCrousel/ImageCrousel'
import { useEffect, useState } from 'react'
import {useParams } from 'react-router-dom'
import axios from 'axios'

export default function VenueDetails() {
    const { venueId } = useParams();
    const [venueData, setVenueData] = useState(null);
    const [loading,setLoading]=useState(true)

   
  useEffect(() => {
    // Define a function to fetch venue data
    const fetchVenueData = async () => {
        await axios.get(`http://localhost:3001/venue/${venueId}`)
        .then(response => {
            setVenueData(response.data);  
            setLoading(false)
        })
        .catch(error => {
            console.error('Error fetching data:');
        });
    };

    fetchVenueData();
  }, [venueId]); 

    return (
        <div className={styles.venueDetialsWrapper}>
            {!loading && <div className={styles.venueDetialsInnerWrapper}>
                {/* left */}
                <div>
                    {/* image */}
                    <div>
                        <ImageCrousel venueData={venueData}/>
                    </div>
                    <VenueDetailsDes venueData={venueData}/>
                    <Review venueData={venueData}/>
                </div>
                {/* right */}
                <div>
                    <VenueDetailsForm />
                </div>

            </div>}
            {loading && <div>Loading...</div>}
        </div>
    )
}