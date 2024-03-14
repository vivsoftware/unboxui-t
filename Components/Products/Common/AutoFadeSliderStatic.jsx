import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Slider from 'react-slick';
import { AutoFadeSliderNavData, AutoFadeSliderPosterData } from '../../../Data/SliderSettingsData';
import { getStrapiMedia } from '../../../Utils/media';
import { Heart } from "react-feather";
import axios from 'axios';
import { auth } from '../../../Config/firebase';
import springWithAuth from '../../../Utils/spring_auth';
import { toast } from 'react-toastify';
import spring_boot_url from '../../../springApi';

const AutoFadeSliderStatic = ({ VideoPlay, singleProduct, payload }) => {
  const [state, setState] = useState({ nav1: null, nav2: null });
  const [user, setuser] = useState(null);

  const isProductWishlisted = localStorage.getItem(`wishlist_${singleProduct.id}`);
  const [heartColor, setHeartColor] = useState('black');
  const dispatch = useDispatch();
  const slider1 = useRef();
  const slider2 = useRef();
  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
  }, []);
  const imgData = [];
  imgData.push(getStrapiMedia(singleProduct.attributes.product_display))
  imgData.push(...getStrapiMedia(singleProduct.attributes.product_gallery))
  const { nav1, nav2 } = state;

  const addwishlist = () => {


    dispatch({ type: 'ADDTOWISHLIST', payload: singleProduct });
    setHeartColor('red');

  };

  const removewishlist = () => {


    dispatch({ type: 'REMOVEFROMWISHLIST', payload: singleProduct });
    setHeartColor('black');

  };


  const handleWishlistToggle = async () => {
    try {
      if (heartColor === 'red') {
        removewishlist();
      } else {
        addwishlist();
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  };

  const [userDet, setUserDet] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setuser(user)
      if (user.email) {
        axios.get(`${spring_boot_url}api/users/email?email=${user.email}`)
          .then(resp => {
            console.log(resp.data.json);
            localStorage.setItem("data", JSON.stringify(resp.data));
            setUserDet(resp.data);
          });
      } else if (user.phoneNumber) {
        let phoneNumberd = user.phoneNumber
        phoneNumberd = phoneNumberd.replace(/\+/g, "");
        console.log("phonenumbereeeee", phoneNumberd);
        axios.get(`${spring_boot_url}api/users/phone?phoneNumber=${phoneNumberd}`)
          .then(resp => {
            console.log(resp.data.json);
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
            productId: singleProduct.id,
            productName: singleProduct.attributes.product_name,
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
         
          handleWishlistToggle();       
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





  return (
    <>
      <div onClick={handleSubmit}>
        <Heart className={`product-wishlist ${heartColor === 'red' ? 'heart-filled' : ''}`} />
      </div>

      <div className='degree-section'>
        <div className='details-image ratio_asos'>
          <Slider {...AutoFadeSliderPosterData} asNavFor={nav1} ref={(slider) => (slider2.current = slider)}>
            {imgData.map((elem, i) => {
              return (
                <div key={i}>
                  <div className='product-image-tag'>
                    <img src={`${elem}`} className='img-fluid  image_zoom_cls-0' alt={singleProduct.attributes.product_name} />
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
        {VideoPlay !== undefined ? (
          <div className='image-360 videoplay-box' onClick={() => dispatch({ type: 'YOUTUBEMODAL' })}>
            <img src='https://img.icons8.com/ios/50/000000/circled-play.png'alt={singleProduct.attributes.product_name}  />
          </div>
        ) : (
          ''
        )}
        <div className='details-image-option black-slide mt-4 rounded overflow-hidden'>
          <Slider {...AutoFadeSliderNavData} asNavFor={nav2} ref={(slider) => (slider1.current = slider)}>
            {imgData.map((elem, i) => {
              return (
                <div key={i}>
                  <img src={`${elem}`} className='img-fluid' alt={singleProduct.attributes.product_name} />
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default AutoFadeSliderStatic;