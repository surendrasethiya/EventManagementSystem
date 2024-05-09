import React, { useEffect, useState } from 'react'
import styles from './InquiryPage.module.css'
import InquiryCard from './InquiryCard/InquiryCard'
import axios from 'axios';


export default function InquiryPage() {
    const [data,setData]=useState([])
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading,setIsLoading]=useState(false)


    const instance = axios.create({
        withCredentials: true,
        baseURL: 'http://localhost:3001',
    });

    useEffect(()=>{
        function getRequests(){
            setIsLoading(true)
            instance.get(`/request`)
                .then(response => {
                    setIsLoading(false)
                    if(response.data.requests.length>0){
                        setData(response.data.requests)
                    }else{
                        setErrorMessage('No pending requests')
                    }
                })
                .catch(error => {
                    setErrorMessage(error.response.data.message)
                    console.error('API Request Error:', error);
                });
        }
        getRequests()
    },[])
    return (
        <div className={styles.inquiryPageWrapper}>
            <div>
                <p>Requests</p>
                {errorMessage && <span className="error" style={{textAlign:'center',marginTop:'10px'}}>{errorMessage} </span>}
                {isLoading && <span className="error" style={{textAlign:'center',marginTop:'10px'}}>Loading...</span>}
                {data.map((request,i)=>{
                    return  <InquiryCard request={request} />
                })}
                {/* <InquiryCard />
                <InquiryCard /> */}
            </div>
        </div>
    )
}
