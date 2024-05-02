import React from 'react'
import AdminMenuHeader from '../components/AdminDashboardC/AdminMenuHeader/AdminMenuHeader'
import AdminCreateVImageU from '../components/AdminDashboardC/AdminCreateVImageU/AdminCreateVImageU'
import styles from '../styles/CreateVenue.module.css'
import CreateVenueForm from '../components/AdminDashboardC/CreateVenueForm/CreateVenueForm'

export default function CreateVenue({updateVenue,setUpdatevenue}) {
  return (
    <>
      <AdminMenuHeader updateVenue={updateVenue} setUpdatevenue={setUpdatevenue}/>
      <div className={styles.createVenueInnerWrapper}>
        <p className={styles.title}>Create Venue</p>
        {/* <AdminCreateVImageU /> */}
        <CreateVenueForm updateVenue={updateVenue}/>
      </div>
    </>

  )
}
