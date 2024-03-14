
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'reactstrap';
import { getStrapiMedia } from '../../../Utils/media';
import { CommonPath } from '../../Constant';
import DynamicRating from '../../Element/DynamicRating';
import Image from 'next/image';
import { auth } from '../../../Config/firebase';

const RightTab = ({ elem, LeftRightTab }) => {
  const { symbol, currencyValue } = useSelector((state) => state.CurrencyReducer);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const numberWithCommas = (x) => {
    return x.toLocaleString("en-IN");
  };

  const formatPrice = (price) => {
    return `${numberWithCommas(price)}`;
  };

  return (
    <>
      <Col lg='4' md='6'>
        <div className='product-list'>
          {elem?.slice(4, 7)?.map((item, i) => {
            const productPrice = item?.attributes?.product_price ?? 0;

            return (
              <div className={`${LeftRightTab ? LeftRightTab : 'product-box product-box1'}`} key={i} style={{ backgroundColor: 'white', border: '2px solid #FF8400' }}>
                <div className='img-wrapper bg-transparent'>
                  <Link href={`/product/${item.id}-${item.attributes.product_slug}`} className='text-center'>
                    <Image width={200} height={200} src={getStrapiMedia(item.attributes.product_display)} className='img-fluid' alt={item.attributes.product_name} />
                  </Link>
                </div>
                <div className='product-details'>
                {user ? (
        <h3 className='price-detail'>
          {item?.attributes?.product_price
            === "0" ? (
            <h3>For Price Please Enquire</h3>
          ) : (
            <h3>
              {symbol}{formatPrice(item?.attributes?.product_price * currencyValue.toFixed(2))}

            </h3>
          )}
        </h3>
      ) : (
        <Link href="/login">
          <h3 className='price-detail' style={{ color: '#FF8400' }}>Please Login for Price</h3>
        </Link>
      )}

                  <Link href={`/product/${item.id}-${item.attributes.product_slug}`} className='font-default'>
                    <h5>{item.attributes.product_name}</h5>
                  </Link>
                  {/* <DynamicRating data={item.ratingstars} /> */}
                </div>
              </div>
            );
          })}
        </div>
      </Col>
    </>
  );
};

export default RightTab;
