import React, { Fragment, useEffect, useState } from 'react';
import Slider from 'react-slick';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { NewArrivalSlider } from '../../../Data/SliderSettingsData';
import AddToCartProduct from '../../Element/AddToCart';
import ModelViewProduct from '../../Element/ModelViewProduct';
import CompareProducts from '../../Element/CompareProducts';
import AddToWishList from '../../Element/AddToWishList';
import Img from '../../Element/Images';
import SkeletonLoader from '../../Element/SkeletonLoader';
import { getStrapiMedia } from '../../../Utils/media';
import { auth } from '../../../Config/firebase';

const ArrivalCards = ({ productData }) => {
  const { symbol, currencyValue } = useSelector((state) => state.CurrencyReducer);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);


  useEffect(()=> {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);
  
  const numberWithCommas = (x) => {
    return x.toLocaleString("en-IN");
  };

  const formatPrice = (price) => {
    return `${numberWithCommas(price)}`;
  };

  return (
    <div className='product-wrapper product-style-2 slide-8 p-0 light-arrow bottom-space'>
      <Slider {...NewArrivalSlider}>
        {productData?.slice(0, 50).map((elem, i) => {
          return (
            <Fragment key={i}>
              {isLoading ? (
                <SkeletonLoader />
              ) : (
                <div>
                  <div className='product-box'>
                    <div className='img-wrapper'>
                      <div className={`front`} key={i}>
                        <Link href={`/product/${elem.id}-${elem.attributes.product_slug}`}>
                          <Img src={`${getStrapiMedia(elem.attributes.product_display)}`} className='bg-img' alt='img-wrapper' />
                        </Link>
                      </div>
                      <div className='cart-wrap'>
                        <ul>
                          <AddToCartProduct elem={elem} />
                          <ModelViewProduct elem={elem} />
                          <CompareProducts elem={elem} />
                          <AddToWishList elem={elem} />
                        </ul>
                      </div>
                    </div>
                    <div className='product-details'>
                      <div className='main-price'>
                        <Link href={`/product/${elem.id}-${elem.attributes.product_slug}`} className='font-default'>
                          <h5>{elem.attributes.product_name}</h5>
                        </Link>
                        {user ? (
        <h3 className='price-detail'>
          {elem?.attributes?.product_price
            === "0" ? (
            <h3>For Price Please Enquire</h3>
          ) : (
            <h3>
              {symbol}{formatPrice(elem?.attributes?.product_price * currencyValue.toFixed(2))}

            </h3>
          )}
        </h3>
      ) : (
        <Link href="/login">
          <h3 className='price-detail' style={{ color: '#FF8400' }}>Please Login for Price</h3>
        </Link>
      )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Fragment>
          );
        })}
      </Slider>
    </div>
  );
};

export default ArrivalCards;
