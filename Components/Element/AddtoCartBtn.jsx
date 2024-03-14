import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Btn } from "../AbstractElements";
import { Addtocart } from "../Constant";
import { ToastContainer, toast } from 'react-toastify';

const AddtoCartBtn = ({ elem, customeclass, data, check }) => {
  const dispatch = useDispatch();
  const dispatchCart = (data) => {
    data && dispatch({ type: "ADDTOCART", payload: data });
    
  };
  const noprice = () => {
    toast.error('Please contact us for this product', {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  return (
    <>
      {data?.attributes?.product_price === "0" ? (
        <a
          className={customeclass}
          onClick={noprice}
          style={{ cursor: check }}
        >
          {Addtocart}
        </a>
      ) : (
        <a
          className={customeclass}
          onClick={() => dispatchCart(data)}
          style={{ cursor: check }}
        >
          {Addtocart}
        </a>
      )
      }
    </>
  );
};

export default AddtoCartBtn;
