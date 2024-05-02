import React from 'react';
import styles from './Option.module.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Options() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
  };

  return (
    <div className={styles.optionsWrapper}>
      <h2>Picture Carousel</h2>
      <Slider {...settings}>
        {/* Repeat this div block for each image */}
        <div>
          <img src='delhi.jpg' alt='Delhi' />
        </div>
        <div>
          <img src='delhi.jpg' alt='Delhi' />
        </div>
        <div>
          <img src='delhi.jpg' alt='Delhi' />
        </div>
        <div>
          <img src='delhi.jpg' alt='Delhi' />
        </div>
        <div>
          <img src='delhi.jpg' alt='Delhi' />
        </div>
        <div>
          <img src='delhi.jpg' alt='Delhi' />
        </div>
        <div>
          <img src='delhi.jpg' alt='Delhi' />
        </div>
        <div>
          <img src='delhi.jpg' alt='Delhi' />
        </div>
        {/* End of repeated div blocks */}
      </Slider>
    </div>
  );
}


