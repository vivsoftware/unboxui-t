import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row } from 'reactstrap';
import { auth } from '../../../Config/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MobileViewData = ({ item }) => {
  const dispatch = useDispatch();
  const [priceZero, setPriceZero] = useState(null);
  const [user, setUser] = useState(null);
  const { symbol, currencyValue } = useSelector((state) => state.CurrencyReducer);

  const removeProduct = (product) => {
    dispatch({ type: 'REMOVEFROMWISHLIST', payload: product });
  };

  const addToCart = (product) => {
    dispatch({ type: 'ADDTOCART', payload: product });
  };

  const numberWithCommas = (x) => {
    return x.toLocaleString('en-IN');
  };

  const formatPrice = (price) => {
    return `${numberWithCommas(price)}`;
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    setPriceZero(
      item.attributes.product_price
        ? item.attributes.product_price
        : item.attributes.variation_price
    );
  }, []);

  const noprice = () => {
    toast.error('Please contact us for this product', {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  return (
    <td className=''>
      <Link href={`/product/${item.id}${item.attributes.product_name}`} className='font-light'>
        {item.attributes.product_name ? item.attributes.product_name : item.attributes.variation_name}
      </Link>
      <Row className='mobile-cart-content'>
        <div className='col'>
          {user ? (
            <p className='text-center'>{`${symbol}${formatPrice((item.attributes?.product_display ? item.attributes.product_price : item.attributes.variation_price) * currencyValue.toFixed(2))}`}</p>
          ) : (
            <p>Please Login for Price</p>
          )}
        </div>
        <div className='col'>
          <h2 className='td-color'>
            <a className='icon' href='#javascript' onClick={() => removeProduct(item)}>
              <i className='fas fa-times'></i>
            </a>
          </h2>
          <h3 className='td-color'>
            {item.attributes.product_price === "0" ? (
              <a href='#product' className='icon' onClick={noprice}>
                <i className='fas fa-shopping-cart'></i>
              </a>


            ) : (

              <a href='#product' className='icon' onClick={() => addToCart(item)}>
                <i className='fas fa-shopping-cart'></i>
              </a>
            )
            }
          </h3>
        </div>
      </Row>
      <ToastContainer /> {/* Add the ToastContainer component */}
    </td>
  );
};

export default MobileViewData;
