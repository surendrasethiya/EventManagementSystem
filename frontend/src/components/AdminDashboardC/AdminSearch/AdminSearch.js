import React, { useEffect, useState } from 'react';
import styles from './AdminSearch.module.css';
import axios from 'axios';
import AdminHomeCard from '../AdminHomeCard/AdminHomeCard';


export default function AdminSearch({ updateVenue, setUpdatevenue }) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [queryParameter,setQueryParameter]=useState([])
    const [errorMessage, setErrorMessage] = useState(null);



    const [formData, setFormData] = useState({
        city: '',
        state: '',
        name: '',
    });

    useEffect(() => {
        function getData(){
            console.log(queryParameter)
            axios.get(`http://localhost:3001/venue`,{params:queryParameter})
            .then(response => {
                setData(response.data.venues);
                setLoading(false)
            })
            .catch(error => {
                console.error('Error fetching data:');
            });
        }
        getData()
    }, [queryParameter])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.city.trim() !== '' || formData.state.trim() !== '' || formData.name.trim() !== '') {
            const lowercaseFormData = Object.fromEntries(
                Object.entries(formData).map(([key, value]) => [key, value.toLowerCase()])
            );

            const nonNullData = Object.fromEntries(
                Object.entries(lowercaseFormData).filter(([key, value]) => value.trim() !== '')
            );

            setQueryParameter(nonNullData)
        }

        setFormData({
            city: '',
            state: '',
            name: '',
        });
    };


    return (
        <>
            <form className={styles.adminSearchWrapper} onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        id="cityInput"
                        name="city"
                        placeholder="Enter city"
                        value={formData.city}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        id="stateInput"
                        name="state"
                        placeholder="Enter state"
                        value={formData.state}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        id="nameInput"
                        name="name"
                        placeholder="Searching by venue name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button type="submit">Search</button>
                </div>
            </form>
            {errorMessage && <p className="error" style={{textAlign:'center',marginTop:'10px'}}>{errorMessage} </p>}
            { loading && <div style={{textAlign:'center',marginTop:'10px'}}>Loading...</div>}
            {!loading && data.length==0 && <p style={{textAlign:'center',marginTop:'10px'}}>No result found</p>}


          { !loading && <div className={styles.adminHomeCardWrapper}>
                {data.map((venue, i) => {
                    return <AdminHomeCard updateVenue={updateVenue} setUpdatevenue={setUpdatevenue} venue={venue} errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>
                })}
            </div>}
        </>
    );
}
