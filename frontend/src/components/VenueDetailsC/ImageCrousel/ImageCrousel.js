import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import styles from './ImageCrousel.module.css'

export default function ImageCrousel({ venueData }) {
  let venueImages=venueData.data.venueImages
 
  return (
    <Carousel showArrows={false} showThumbs={false} autoPlay interval={4000} infiniteLoop showStatus={false} >
      {/* error:not showing images */}
      {venueImages.map((image,i) => {
        return <div className={styles.imageWrapper}>
          <img src={image.image.url} alt='nice' />
        </div>
      })}


      {/* <div className={styles.imageWrapper}>
        <img src="../delhi.jpg" alt='nice' />
      </div>

      <div className={styles.imageWrapper}>
        <img src="../5starvenue.jpg" alt='nice' />
      </div> */}
    </Carousel>
  )
}
