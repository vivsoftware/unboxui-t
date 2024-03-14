import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getStrapiMedia } from '../../../Utils/media';
import AddToCartProduct from '../../Element/AddToCart';
import AddToWishList from '../../Element/AddToWishList';
import CompareProducts from '../../Element/CompareProducts';
import Img from '../../Element/Images';
import ModelViewProduct from '../../Element/ModelViewProduct';
import SkeletonLoader from '../../Element/SkeletonLoader';
import { auth } from '../../../Config/firebase';
import { width } from '@mui/system';
import Image from 'next/image';
const AllProducts = ({ currentData }) => {

  const [user, setUser] = useState(null);
  const { symbol, currencyValue } = useSelector((state) => state.CurrencyReducer);
  const { initialGrid } = useSelector((state) => state.AllGridReducer);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {

    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const numberWithCommas = (x) => {
    return x.toLocaleString("en-IN");
  };
  const formatPrice = (price) => {
    return `${numberWithCommas(price)}`;
  }

  return (
    <>
    
    <div className={`row g-sm-3 g-3 gx-sm-3 gx-3 mt-1 row-cols-2 custom-gy-5 product-style-2 ratio_asos product-list-section ${initialGrid}`}>
      
      {currentData?.map((elem, i) => {
        return (
          <div className='product-card' key={elem.id}>
            <Fragment >
              {isLoading ? (
                <SkeletonLoader />
              ) : (
                <>
                  {elem.category !== 'vr' && (
                    <div>
                      <div className='product-box'>
                        <div className='img-wrapper'><Link href={`/product/${elem.id}-${elem.attributes?.product_slug}`}>
                          <div className={`front`} key={i}  >
                            <Image width={200} height={200} src={getStrapiMedia(elem.attributes.product_display)} className='bg-img' alt={elem.attributes.product_name} />
                          </div>
                        </Link>
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
                          <div className='rating-details'>
                            <span className='font-light grid-content'>{elem?.category !== 'none' ? elem?.category : elem?.type}</span>
                          </div>
                          <div className='main-price'>
                            <h5 className='ms-0'>{elem.attributes.product_name}</h5>
                          </div>
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
                  )}
                </>
              )}
            </Fragment>

          </div>
        );
      })}
    </div>
    </>
  );
};

export default AllProducts;
