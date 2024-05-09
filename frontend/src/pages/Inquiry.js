import React from 'react'
import AdminMenuHeader from '../components/AdminDashboardC/AdminMenuHeader/AdminMenuHeader'
// import styles from '../styles/Inquiry.module.css'
import InquiryPage from '../components/AdminDashboardC/InquiryPage/InquiryPage'

export default function Inquiry({updateVenue,setUpdatevenue}) {
  return (
   <>
   <AdminMenuHeader updateVenue={updateVenue} setUpdatevenue={setUpdatevenue}/>
   <InquiryPage/>
   </>
  )
}
