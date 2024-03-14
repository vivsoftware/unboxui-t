import React, {useState, useEffect} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ReactPlayer from 'react-player';
import { getStrapiMedia } from '../../Utils/media';
import SkeletonLoader from '../Element/SkeletonLoader';

const NewProducts = ({newVideo}) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);


    const settings = {
        // dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          }
        ]
      };


      
      
  return (
    <div className='container'>
    <h2 className='text-center mt-5 mb-5'>Products Videos</h2>
    <Slider {...settings} >
      {newVideo.map((url) => (
        <div key={url}>
          {isLoading? (
            <SkeletonLoader/>
          ):(
            <ReactPlayer url={url} width="100%" height="100%" />

          )}
        </div>
      ))}
    </Slider>
  </div>
  );
};


export default NewProducts;