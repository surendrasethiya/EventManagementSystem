import React from 'react'
import AdminMenuHeader from '../components/AdminDashboardC/AdminMenuHeader/AdminMenuHeader'
import styles from '../styles/AdminDashboard.module.css'
// import AdminHomePage from './AdminHomePage'
// import { Navigate, Route, Routes} from 'react-router-dom'
// import AdminHomeCard from '../components/AdminDashboardC/AdminHomeCard/AdminHomeCard'
import AdminSearch from '../components/AdminDashboardC/AdminSearch/AdminSearch'


export default function AdminDashboard({updateVenue,setUpdatevenue}) {
  return (
    <div className={styles.adminDashboardWrapper}>
      <AdminMenuHeader updateVenue={updateVenue} setUpdatevenue={setUpdatevenue}/>
      <AdminSearch updateVenue={updateVenue} setUpdatevenue={setUpdatevenue}/>
    </div>
  )
}
