import Link from 'next/link';
import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'reactstrap';
import { deleteProduct } from '../../../Utils';
import { getStrapiMedia } from '../../../Utils/media';
import { CommonPath } from '../../Constant';
import MobileViewData from './MobileViewData';
import WishlistTableHead from './WishlistTableHead';
import { useState, useEffect } from 'react';
import { auth } from '../../../Config/firebase';
import { ToastContainer, toast } from 'react-toastify';

const WishlistDataList = ({ wishlistData }) => {
  const dispatch = useDispatch();
  const [priceZero, setPriceZero] = useState(null);

  const [user, setUser] = useState(null);
  const { symbol, currencyValue } = useSelector((state) => state.CurrencyReducer);
  const removeProduct = (product) => {
    dispatch({ type: 'REMOVEFROMWISHLIST', payload: product });
  };
  const addToCart = (product) => {
    dispatch({ type: 'ADDTOCART', payload: product });
  }
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    if (wishlistData && wishlistData.attributes) {
      setPriceZero(
        wishlistData.attributes.product_price
          ? wishlistData.attributes.product_price
          : wishlistData.attributes.variation_price
      );
    }
  }, []);
  const numberWithCommas = (x) => {
    return x.toLocaleString("en-IN");
  };
  const formatPrice = (price) => {
    return `${numberWithCommas(price)}`;
  }



  const noprice = () => {
    toast.error('Please contact us for this product', {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };
  return (
    <Table className='cart-table wishlist-table'>
      <WishlistTableHead />
      <tbody>
        {wishlistData &&
          wishlistData.map((item, i) => {
            return (
              <tr key={item.id}>
                <td>
                  <Link href={`/product/${item.id}`}>

                    <img src={`${getStrapiMedia((item.attributes?.product_display ? item.attributes.product_display : item.attributes.variation_display))}`} alt='product' key={i} />

                  </Link>
                </td>
                <MobileViewData item={item} />
                <td>
                  {user ? (
                    <p>
                      {symbol}{formatPrice(item.attributes.product_price * currencyValue.toFixed(2))}
                    </p>
                  ) : (
                    <p className='price-detail' style={{color:'#FF8400'}}>Please Login for Price</p>
                  )}
                </td>
                <td>
                  <a className='icon' href='#javascript' onClick={() => removeProduct(item)}>
                    <i className='fas fa-times'></i>
                  </a>
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
                </td>
              </tr>
            );
          })}
      </tbody >
    </Table >
  );
};

export default WishlistDataList;
