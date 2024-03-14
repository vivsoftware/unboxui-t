import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ShoppingBag } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../Config/firebase';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import spring_boot_url from '../../Utils/springApi';
const AddToCartProduct = ({ elem, staticActions }) => {
  const { addToCartModal } = useSelector((state) => state.ModalReducer);
  const dispatch = useDispatch();
  const router = useRouter();
  const [priceZero, setPriceZero] = useState(null);
  const [userDe, setUserDe] = useState(null);
  const [user, setuser] = useState(null)
  const AddtoCart = () => {
    if (elem.attributes.product_type === 'simple') {
      dispatch({ type: 'ADDTOCART', payload: elem });
    } else if (elem.attributes.product_type === 'variable') {
      router.push(`/product/${elem.id}`);
    }
  };
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(true);
  };
  const onLeave = () => {
    setHover(false);
  };
  useEffect(() => {
    setPriceZero(
      elem.attributes.product_price
        ? elem.attributes.product_price
        : elem.attributes.variation_price
    );
  }, []);

  const noprice = () => {
    toast.error('Please contact us for this product', {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };
  ///////// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [userDet, setUserDet] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setuser(user)
      if (user.email) {
        axios.get(`${spring_boot_url}api/users/email?email=${user.email}`)
          .then(resp => {
            // console.log(resp.data.json);
            localStorage.setItem("data", JSON.stringify(resp.data));
            setUserDet(resp.data);
          });
      } else if (user.phoneNumber) {
        let phoneNumberd = user.phoneNumber
        phoneNumberd = phoneNumberd.replace(/\+/g, "");
        console.log("phonenumbereeeee", phoneNumberd);
        axios.get(`${spring_boot_url}api/users/phone?phoneNumber=${phoneNumberd}`)
          .then(resp => {
            // console.log(resp.data.json);
            localStorage.setItem("data", JSON.stringify(resp.data));
            setUserDet(resp.data);
          });
      }
    })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (user) {
      const userDetails = {
        products: [
          {
  
            productId: elem.id,
            productName: elem.attributes.product_name,
          },
        ],
        userId: userDet.id,
      };
      try {
        const response = await fetch(`${spring_boot_url}api/cart/add`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userDetails),
        });

        if (response.ok === true) {
          // If the response is successful (status code 2xx), proceed
          AddtoCart();
          // router.push("/user_dashboard");
        } else {
          // If the response is not successful, handle the error
          throw new Error('Failed to add product to cart');
        }
      } catch (error) {
        console.error('Error adding product to cart:', error.message);
        // Handle the error, show a message to the user, or take appropriate actions
      }
    } else {
      toast.error(` Please Login`, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };


  return (
    <>
      {elem.attributes.product_price === "0" ? (
        <li onClick={noprice}>
          <a href='#product'
            className='addtocart-btn'
            onMouseEnter={onHover}
            onMouseLeave={onLeave}>
            {hover ? "Add to Cart" : <ShoppingBag />}
          </a>
        </li>
      ) : (
        <li onClick={handleSubmit}>
          <a href='#product'
            className='addtocart-btn'
            onMouseEnter={onHover}
            onMouseLeave={onLeave}>
            {hover ? "Add to Cart" : <ShoppingBag />}
          </a>
        </li>
      )
      }
    </>
  );
};

export default AddToCartProduct;
