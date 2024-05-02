import React from 'react'
import styles from './UniqueVenue.module.css'
import UniqueVenueCard from './UniqueVenueCard/UniqueVenueCard'

export default function UniqueVenue() {
  const uniqueVenue=[{
    url:'browseVenueWedding.jpg',
    title:'Luxury Venues',
    description:'Celebrate your life-long commitment at the luxury wedding venues where special attention is given.',
    path:'hall'
  },
  {
    url:'adeventure.jpg',
    title:'Adventure Venues',
    description:'Usual is Boring! Check out these Adventure Theme places to host activity-based events.',
    path:'pool'
  },
{
  url:'openAir.jpg',
  title:'Open Air Venues',
  description:'Open air venues are the best when the weather is good. For fresh breeze and running around..',
  path:'garden'

},
{
  url:'5starvenue.jpg',
  title:'5 Star Venues',
  description:'5 Star venues beautifully designed to host perfect weddings and events with luxurious features and accommodation.',
  path:'hotel'
}]
  return (
    <div className={styles.uniqueVenueWrapper} >
      <h1>Browse Unique Venues</h1>
      <p>Special venues for your special day</p>
      <div className={styles.uniqueVenueCardWrapper}>
       {uniqueVenue.map((item,index)=>(
        <UniqueVenueCard item={item}/>
       ))}
      </div>
     
    </div>
  )
}
