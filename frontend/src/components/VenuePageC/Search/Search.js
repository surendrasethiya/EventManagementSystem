import React, { useEffect, useState } from 'react'
import styles from './Search.module.css'
import VenueCard from '../VenueCard/VenueCard'
import { useSearchParams} from 'react-router-dom'
import axios from 'axios';



export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [name, setName] = useState('');
    const [data, setData] = useState([])
    


    useEffect(() => {
        if (searchParams.size >= 0) {
            console.log(searchParams)
            
            axios.get(`http://localhost:3001/venue`,{ params: searchParams })
                .then(response => {
                    setData(response.data.venues);  
                })
                .catch(error => {
                    console.error('Error fetching data:');
                });
        } 

    }, [searchParams]);


    const handleSearch = () => {
        const lowercaseCity = city.toLowerCase();
        const lowercaseState = state.toLowerCase();
        const lowercaseVenue = name.toLowerCase();
        const queryParams = {};

        if (city !== '') {
            queryParams.city = lowercaseCity;
        }
        if (state !== '') {
            queryParams.state = lowercaseState;
        }
        if (name !== '') {
            queryParams.name = lowercaseVenue;
        }
        setCity('')
        setState('')
        setName('')
        setSearchParams(queryParams);
    };



    return (
        <>
            <div className={styles.image_container}>
                <div className={styles.overlay_text}>
                    Top Party & Event Venues
                </div>
                <p>Browse, shortlist and get best prices and packages from venues available to host your event. Take your pick from banquet halls, resorts, hotels, farmhouses and party lawns as per your preferences. Once your venue is booked, let us also help you select vendors like event planner, decorator, caterer, photographer, band, DJ and more.</p>
            </div>

            <div className={styles.searchWrapper}>
                <div>
                    <input
                        type="text"
                        id="cityInput"
                        name="city"
                        placeholder="Enter city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <input
                        type="text"
                        id="stateInput"
                        name="state"
                        placeholder="Enter state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                    <input
                        type="text"
                        id="venueInput"
                        name="name"
                        placeholder="Seacrching by venue name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <button onClick={handleSearch}>Search</button>
                </div>
            </div>

            <div className={styles.venueCardWrapper}>
                {data.length>0?data.map((venue,id)=><VenueCard venue={venue}/>):'No result found'}

            </div>
        </>
    )
}
