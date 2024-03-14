import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ShoppingBag, ShoppingCart } from 'react-feather';
import { CommonPath } from '../../Constant';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Media } from 'reactstrap';
import { toast } from 'react-toastify';
import TotalPrice from '../../../Layout/Element/TotalPrice';
import { getStrapiMedia } from '../../../Utils/media';
import { getAPIData } from '../../../Utils';
import { Btn } from '../../AbstractElements';

export const Get_Qoute_On_Mail = () => {
  const { product, quantity } = useSelector((state) => state.AddToCartReducer);
  const { symbol, currencyValue } = useSelector((state) => state.CurrencyReducer);
  const dispatch = useDispatch();

  const [cartData, setCartData] = useState([]);
  const [userDe, setuserDe] = useState([]);

  useEffect(() => {
    setCartData(product);
    getAPIData(`${process.env.API_URL}getcart`)
      .then((res) => {
        return;
      })
      .catch((error) => console.log('Error', error));
  }, [product]);

  const getdata = () => {
    fetch(`${spring_boot_url}api/quotation/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userDe)
    }).then((resp) => {
      setuserDe(resp.body)
      if (resp.ok === true) {
        toast(`Please check all filled details`);
      }
    });
  }

  useEffect(() => {
    if (cartData.length > 0) {
      const productdetailscart = cartData.map((item) => {
        return {
            products:[{
                productId: item.attributes.id,
                productName: item.attributes.product_name,
                quantity: quantity[item.id]?.qty ? quantity[item.id]?.qty : 1,
                productPrice: item.attributes.product_price,
               
            }],
            totalAmount: "2584",
            addressId: "27",
            userId: "63"
        
        };
      });
      setuserDe(productdetailscart);
      getdata();
    }
  }, [cartData, quantity]);
console.log("opopopopopopopaa", userDe)
  return null; // or return your JSX here
}
