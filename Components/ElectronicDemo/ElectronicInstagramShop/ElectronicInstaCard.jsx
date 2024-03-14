import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import Slider from 'react-slick';
import { InstaSlider } from '../../../Data/SliderSettingsData';
import { Btn } from '../../AbstractElements';
import { CommonPath, Share, ShopNow } from '../../Constant';
import Img from '../../Element/Images';
import Link from 'next/link';
import { getStrapiMedia } from '../../../Utils/media';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { fetchAPI } from '../../../Utils/api';
const ElectronicInstaCard = () => {

  const [newarrivals, setnewarrivals] = useState(true);

  useEffect(() => {
    fetchAPI(`/new-arrivals`, {
      populate: '*',
      pagination: {
        limit: -1,
      },
    }).then((res) => {
      setnewarrivals(res);
    });

  }, []);


  const router = useRouter();
  const dispatch = useDispatch();
  const addToWish = (product) => {
    dispatch({ type: 'ADDTOWISHLIST', payload: product });

  }
  let i = 0;
  return (
    <div className='product-style-1 instagram-2'>
      <div className='insta-slider product-wrapper instagram-wrap'>
        <Slider {...InstaSlider}>
          {newarrivals.data?.map((elem, j) => {
            //   return Date.parse(new Date().toISOString()) - Date.parse(item.attributes.createdAt) <= 100 * 24 * 60 * 60 * 1000;
            // }).slice(0,5).map((el,i) => {
            // if (elem.attributes?.new_arrival?.data?.attributes?.name === 'NewArrivals' && i < 8) {
            if (elem.attributes.name) {

              // i++;
              return (
                <div key={j}>
                  <div className='product-box'>
                    <div className='img-wrapper'>
                      <div className='top-wishlist product-color'>
                        {/* <a href="#javascript" onClick={() => addToWish(elem)} className='heart-wishlist heart-color'>
                          <i className='far fa-heart'></i>
                        </a> */}
                      </div>
                      <a className='text-center bg-size'>
                        <Img src={getStrapiMedia(elem.attributes.image)} className='bg-img' alt={elem.attributes.product_name} />


                      </a>
                    </div>
                    <div className='insta-hover text-center'>
                      <div>
                        <h5>{ }</h5>
                        <h3 className='text-hide'>{elem.attributes.products.data[0].attributes.product_name}</h3>
                        <Btn
                          attrBtn={{
                            className: 'btn-light-white',
                            onClick: () => router.push(`/product/${elem.attributes.product_id}-${elem.attributes.products.data[0].attributes.product_slug}`),
                          }}>



                          {/* <Link href={`/product/${elem.attributes.product_id}-${elem.attributes.products.data[0].product_slug}`}> */}



                          {ShopNow}
                          <i className='fas fa-chevron-right ms-2'></i>
                        </Btn>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
            else {
              return null;
            }
          })}
        </Slider>
      </div>
    </div>
  );
};

export default ElectronicInstaCard;
