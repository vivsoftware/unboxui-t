
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Col } from 'reactstrap';
import { useSelector } from 'react-redux';
import { getStrapiMedia } from '../../../Utils/media';
import { CommonPath } from '../../Constant';
import DynamicRating from '../../Element/DynamicRating';
import { auth } from '../../../Config/firebase';
import Image from 'next/image';
const LeftTab = ({ elem, LeftRightTab }) => {
  const { symbol, currencyValue } = useSelector((state) => state.CurrencyReducer);
  const [user, setUser] = useState(null);

  const numberWithCommas = (x) => {
    return x.toLocaleString("en-IN");
  };

  const formatPrice = (price) => {
    return `${numberWithCommas(price)}`;
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => {
      unsubscribe(); // Unsubscribe from the auth state change listener
    };
  }, []);

  return (
    <>
      <Col lg='4' md='6'>
        <div className='product-list'>
          {elem?.slice(0, 3).map((result, i) => {
            // Check if elem and attributes are defined before accessing properties
            if (!result || !result.attributes) {
              return null; // Skip rendering this item if the required properties are missing
            }

            return (
              <div className={`${LeftRightTab ? LeftRightTab : 'product-box product-box1'}`} key={i} style={{ backgroundColor: 'white', border: '2px solid #FF8400' }}>
                <div className='img-wrapper bg-transparent'>
                  <Link href={`/product/${result.id}-${result.attributes.product_slug}`} className='text-center'>
                    <Image width={200} height={200} src={getStrapiMedia(result.attributes.product_display)} className='img-fluid' alt={result.attributes.product_name} />
                  </Link>
                  <div className='circle-shape'></div>
                </div>
                <div className='product-details'>
                {user ? (
        <h3 className='price-detail'>
          {result?.attributes?.product_price
            === "0" ? (
            <h3>For Price Please Enquire</h3>
          ) : (
            <h3>
              {symbol}{formatPrice(result?.attributes?.product_price * currencyValue.toFixed(2))}

            </h3>
          )}
        </h3>
      ) : (
        <Link href="/login">
          <h3 className='price-detail' style={{ color: '#FF8400' }}>Please Login for Price</h3>
        </Link>
      )}
                  <Link href={`/product/${result.id}-${result.attributes.product_slug}`} className='font-default'>
                    <h5>{result.attributes.product_name}</h5>
                  </Link>
                  {/* <DynamicRating data={result.ratingstars} /> */}
                </div>
              </div>
            );
          })}
        </div>
      </Col>
    </>
  );
};

export default LeftTab;
