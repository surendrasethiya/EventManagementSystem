import React, {useState } from 'react'
import {Routes,Route,Navigate} from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import VenueDetails from '../pages/VenueDetails'
import Venues from '../pages/Venues'
import RequestForm from '../pages/RequestForm'
import ProfilePage from '../pages/ProfilePage'
import UpdatePassword from '../pages/UpdatePassword'
import AdminDashboard from '../pages/AdminDashboard'
import CreateVenue from '../pages/CreateVenue'
import Inquires from '../pages/Inquiry'
import NotFound from '../pages/NotFound'

export default function Router({handleLogin,handleLogout,isLoggedIn,handleUserType,userType}){
    const [updateVenue,setUpdatevenue]=useState(false)
    return (
       <Routes>
        <Route path='/' element={<Navigate to='/home'/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/login' element={<Login handleLogin={handleLogin} handleUserType={handleUserType}/>}/>
        <Route path='/signup' element={<Signup handleLogin={handleLogin}/>}/>
        <Route path='/venue' element={<Venues/>}/>
        <Route path='/venue/:venueId' element={<VenueDetails/>}/>
        <Route path='/request' element={<RequestForm/>}/>   
        <Route path='/profile' element={<ProfilePage isLoggedIn={isLoggedIn} handleLogout={handleLogout}  userType={userType}/>}/>   
        <Route path='/updatePassword' element={<UpdatePassword/>}/>   
        <Route path='/admin' element={<AdminDashboard updateVenue={updateVenue} setUpdatevenue={setUpdatevenue}/>}/>   
        <Route path='admin/venue/:venueId?' element={<CreateVenue updateVenue={updateVenue} setUpdatevenue={setUpdatevenue}/>}/>   
        <Route path='admin/inqueries' element={<Inquires updateVenue={updateVenue} setUpdatevenue={setUpdatevenue}/>}/>   
        <Route path='*' element={<NotFound/>}/>
       </Routes>
    )
}