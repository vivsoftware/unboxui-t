import React, { Fragment, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useSelector } from 'react-redux';
import { ElectronicProductSlider } from '../../../Data/SliderSettingsData';
import AddToCartProduct from '../../Element/AddToCart';
import ModelViewProduct from '../../Element/ModelViewProduct';
import CompareProducts from '../../Element/CompareProducts';
import AddToWishList from '../../Element/AddToWishList';
import Link from 'next/link';
import Img from '../../Element/Images';
import SkeletonLoader from '../../Element/SkeletonLoader';
import { getStrapiMedia } from '../../../Utils/media';
import { auth } from '../../../Config/firebase';
import PlaceholderImage from './PlaceholderImage';
import Image from 'next/image';
const ProductCard = ({ ProductFilter }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { initialGrid } = useSelector((state) => state.AllGridReducer);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log("user", user);
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const { symbol, currencyValue } = useSelector((state) => state.CurrencyReducer);
  let i = 0;
  const numberWithCommas = (x) => {
    return x.toLocaleString("en-IN");
  };

  const formatPrice = (price) => {
    return `${numberWithCommas(price)}`;
  }

  return (
    <div className={`product-wrapper slide-6`}>
      <Slider {...ElectronicProductSlider}>
        {ProductFilter?.map((elem, j) => {
          // if (elem.attributes?.dealsoftheday?.data?.attributes?.name === 'Deals' && i < 12) {
            if (elem.attributes.name) {

            i++;
            return (
              <Fragment key={j}>
                <div className='product-box'>
                  <div className='img-wrapper'>
                    <Link href={`/product/${elem.attributes.product_id}-${elem.attributes.products.data[0].attributes.product_slug}`}>
                      <div className={`front`}>
                        {isLoading ? (
                          <SkeletonLoader />
                        ) : (
                          <Image
                            src={getStrapiMedia(elem.attributes.image)}
                            width={200}
                            height={200}
                            className='bg-img'
                            alt={elem.attributes.product_name}
                          />
                        )}
                      </div>
                    </Link>
{/* 
                    <div className='cart-wrap'>
                      <ul>
                        <AddToCartProduct elem={elem} />
                        <ModelViewProduct elem={elem} />
                        <CompareProducts elem={elem} />
                        <AddToWishList elem={elem} />
                      </ul>
                    </div> */}
                  </div>
                  <div className='product-details text-center'>
                    {user ? (
                      <h3 className='theme-color fw-6-1'>
                        {symbol}
                        {formatPrice(elem.attributes.products.data[0].attributes.product_price * currencyValue.toFixed(2))}
                      </h3>
                    ) : (
                      <Link legacyBehavior href='/login'>
                        <h3 className='price-detail' style={{ color: '#FF8400' }}>
                          Please Login for Price
                        </h3>
                      </Link>
                    )}
                    <Link href={`/product/${elem.id}-${elem.attributes.product_slug}`} className='font-default fw-6-1'>
                      <h5>{elem.attributes.products.data[0].attributes.product_name}</h5>
                    </Link>
                  </div>
                </div>
              </Fragment>
            );
          } else {
            return null;
          }
        })}
      </Slider>
    </div>
  );
};

export default ProductCard;



