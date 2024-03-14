import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Addtocart, freeshipping } from "../../Constant";
import { Btn } from '../../AbstractElements';
import { auth } from "../../../Config/firebase";
import spring_boot_url from "../../../Utils/springApi";
import { ToastContainer, toast } from 'react-toastify';
import AddToCartProduct from "../../Element/AddToCart";
const ProductActions = ({ singleProduct, setPayload, payload }) => {
  const [priceZero, setPriceZero] = useState(null);
  const check = payload ? "pointer" : "not-allowed";

  const [user, setuser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setuser(user)
    })

  }, [])


  const dispatch = useDispatch();

  const AddtoCart = (data) => {
    if (user) {
      dispatch({ type: 'ADDTOCART', payload: singleProduct });
    } else {
      toast.error(` Please Login`, {
        position: toast.POSITION.BOTTOM_CENTER,
      });

    }

  };
  useEffect(() => { }, [dispatch]);
  useEffect(() => {
    setPriceZero(
      singleProduct.attributes.product_price
        ? singleProduct.attributes.product_price
        : singleProduct.attributes.variation_price
    );
  }, []);

  const noprice = () => {
    toast.error('Please contact us for this product', {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };
  const handleModal = () => {
    dispatch({ type: "ENQUIREMODAL" });
  };

  const [userDe, setUserDe] = useState(null);

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
        const response = await fetch(`${spring_boot_url}api/cart/add`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userDetails),
        });
        if (response.ok === true) {
          AddtoCart();
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
      {singleProduct.attributes.product_price === "0" ? (
        <div className="product-buttons">

          <a
            href="#products"
            id="cartEffect"
            className="btn btn-solid hover-solid btn-animation"
            style={{ cursor: check, width: "310px" }}
            onClick={noprice}
          >
            <i className="fa fa-shopping-cart"></i>
            <span>{Addtocart}</span>
          </a>

        </div>
      ) : (
        <div className="product-buttons">

          <a
            href="#products"
            id="cartEffect"
            className="btn btn-solid hover-solid btn-animation"
            style={{ cursor: check, width: "310px" }}
            onClick={handleSubmit}
          >
            <i className="fa fa-shopping-cart"></i>
            <span>{Addtocart}</span>
          </a>
        </div>
      )
      }
      <div className="product-buttons">
        <Btn
          attrBtn={{
            className: "btn btn-solid hover-solid btn-animation product-enquire",
            onClick: () => handleModal(),
            style: { width: "310px", marginTop: '-10px', border: 'none' },
          }}
        >
          <i className="fa fa-envelope"></i>
          Enquire Now
        </Btn>
      </div>
    </>
  );
};

export default ProductActions;
