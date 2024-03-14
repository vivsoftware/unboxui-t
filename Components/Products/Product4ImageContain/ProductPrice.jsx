import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { auth } from '../../../Config/firebase';
import Link from 'next/link';

const ProductPrice = ({ singleProduct, variation2s }) => {
  const [user, setUser] = useState(null);
  const { symbol, currencyValue } = useSelector((state) => state.CurrencyReducer);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log("user", user);
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
  const [priceZero, setPriceZero] = useState(null);

  useEffect(() => {
    setPriceZero(
      singleProduct.attributes.product_price
        ? singleProduct.attributes.product_price
        : singleProduct.attributes.variation_price
    );
  }, []);
  return (
    <>
      <div className='details-image-concept'>
        <h1 style={{fontSize:'30px'}}>{singleProduct.attributes.product_name}</h1>
      </div>
      {user ? (
        <h3 className='price-detail'>
          {singleProduct?.attributes?.product_price
            === "0" ? (
            <h3>For Price Please Enquire</h3>
          ) : (
            <h3>
              {symbol}{formatPrice(singleProduct?.attributes?.product_price * currencyValue.toFixed(2))}

            </h3>
          )}
        </h3>
      ) : (
        <Link href="/login">
          <h3 className='price-detail' style={{ color: '#FF8400' }}>Please Login for Price</h3>
        </Link>
      )}
      <div className='row'>
        {singleProduct.attributes.meta[0] &&
          Object.keys(singleProduct.attributes.meta[0])
            .slice(2, 4)
            .map((key) => {
              const value = singleProduct.attributes.meta[0][key];
              if (!value) return null;
              return (
                <div className='col-6'>
                  <h4 className='fw-bold'>
                    {key.replace(/_/g, ' ')}:{' '}
                    <span style={{ color: '#FF8400', fontWeight: 'normal' }}>
                      {value}
                    </span>
                  </h4>
                </div>
              );
            })}
      </div>
      <div className='row mt-1'>
        {singleProduct.attributes.meta[0] &&
          Object.keys(singleProduct.attributes.meta[0])
            .slice(4, 6)
            .map((key) => {
              const value = singleProduct.attributes.meta[0][key];
              if (!value) return null;
              return (
                <div className='col-6'>
                  <h4 className='fw-bold'>
                    {key.replace(/_/g, ' ')}:{' '}
                    <span style={{ color: '#FF8400', fontWeight: 'normal' }}>
                      {value}
                    </span>
                  </h4>
                </div>
              );
            })}
      </div>
    </>
  );
};
export default ProductPrice;




