import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Heart } from 'react-feather';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import spring_boot_url from '../../Utils/springApi';
import { auth } from '../../Config/firebase';
import { toast } from 'react-toastify';
const AddToWishList = ({ elem, staticActions }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [user, setuser] = useState(null)

  const AddtoWishList = () => {
    if (elem.attributes.product_type === 'simple') {
      dispatch({ type: 'ADDTOWISHLIST', payload: elem });
    } else {
      router.push(`/product/${elem.id}-${elem.attributes.product_slug}`);
    }
    
  };

  useEffect(() => {}, [dispatch]);

  const [userDet, setUserDet] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setuser(user)
      if (user.email) {
        axios.get(`${spring_boot_url}api/users/email?email=${user.email}`)
          .then(resp => {
            localStorage.setItem("data", JSON.stringify(resp.data));
            setUserDet(resp.data);
          });
      } else if (user.phoneNumber) {
        let phoneNumberd = user.phoneNumber
        phoneNumberd = phoneNumberd.replace(/\+/g, "");
        axios.get(`${spring_boot_url}api/users/phone?phoneNumber=${phoneNumberd}`)
          .then(resp => {
            console.log(resp.data.json);
            localStorage.setItem("data", JSON.stringify(resp.data));
            setUserDet(resp.data);
          });

      }

    })

  }, [])

  const handleSubmit = async () => {
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
        const response = await fetch(`${spring_boot_url}api/wishlist/add`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userDetails),
        });

        if (response.ok === true) {
          AddtoWishList();
        } else {
          throw new Error('Failed to add product to cart');
        }
      } catch (error) {
        console.error('Error adding product to cart:', error.message);
      }
    } else {
      toast.error(` Please Login`, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(true);
  };

  const onLeave = () => {
    setHover(false);
  };
  return (
    <li onClick={() => handleSubmit()}>
      <a href='#javascript' className='wishlist'
      onMouseEnter={onHover} 
      onMouseLeave={onLeave}>
      { hover ? "Wishlist" : <Heart/> }
      </a>
    </li>
  );
};

export default AddToWishList;
