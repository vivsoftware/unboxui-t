import Link from 'next/link';
import React, { Fragment, useEffect, useState , Container } from 'react';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import { VRSlider } from '../../../Data/SliderSettingsData';
import { CommonPath } from '../../Constant';
import DynamicRating from '../../Element/DynamicRating';
import { fetchAPI } from '../../../Utils/api';
import { getStrapiMedia } from '../../../Utils/media';
import Image from 'next/image';


const VRSliders = ({ FilterVrProduct, removePadding }) => {


  const { symbol, currencyValue } = useSelector((state) => state.CurrencyReducer);


  return (
    <div className='product-wrapper slide-7 product-style-1'>
      <Slider {...VRSlider}>          
        {
          FilterVrProduct.map((item)=>{
            return(
              <div key={item.id}>
              <div className="brand-image">
                <Image src={getStrapiMedia(item.attributes.product_display)} className='img-fluid' width={130} height={140} alt='some'  />
              </div>
            </div>
            )
          })
        }
      </Slider>
    </div>
  )
  
};

export default VRSliders;
