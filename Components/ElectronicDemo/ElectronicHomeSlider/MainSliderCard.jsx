import Carousel from 'react-bootstrap/Carousel';
import React from 'react';
import { getStrapiMedia } from '../../../Utils/media';
import Img from '../../Element/Images';
import Image from 'next/image';
const MainSliderCard = (ElectronicSliderFilter) => {
 
  const imgData = getStrapiMedia(ElectronicSliderFilter.ElectronicSliderFilter.mainSlider);

  return (
    <>
        <Carousel className='home-page' indicators={true} prevIcon={null} nextIcon={null}>
          {imgData?.map((url, index) => (
            <Carousel.Item key={index} interval={800}>
              {/* <Img src={url} className="main-sliderImage" /> */}
              <Image src={url} width={1300} height={300} className="main-sliderImage" alt='Unbox-Banner' />
            </Carousel.Item>
          ))}
          {/* <Carousel.Item  interval={800}>
              <Img src="desktopBanner1.svg" className="main-sliderImage" />
            </Carousel.Item>
            <Carousel.Item  interval={800}>
              <Img src="desktopBanner2.svg" className="main-sliderImage" />
            </Carousel.Item>
            <Carousel.Item  interval={800}>
              <Img src="desktopBanner3.svg" className="main-sliderImage" />
            </Carousel.Item> */}
        </Carousel>
    </>
  );
};

export default MainSliderCard;
