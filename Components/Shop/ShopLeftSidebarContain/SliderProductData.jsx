import Link from "next/link";
import React from "react";
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { auth } from "../../../Config/firebase";
import { Col, Row } from "reactstrap";
import { ShopFilterSliderData } from "../../../Data/ShopFilterSliderData";
import { getStrapiMedia } from "../../../Utils/media";
import { CommonPath } from "../../Constant";

const SliderProductData = ({firstNumber, secondNumber, products}) => {
 
  const [user, setUser] = useState(null);
  const { symbol, currencyValue } = useSelector((state) => state.CurrencyReducer);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {

    auth.onAuthStateChanged((user) => {
      setUser(user);
    });


    setTimeout(() => {
      setIsLoading(false);

    }, 2000);

  }, []);
  
  const numberWithCommas = (x) => {
    return x.toLocaleString("en-IN");
  };
  const formatPrice = (price) => {
    return `${numberWithCommas(price)}`;
  }
  return (
    <>
      {products?.slice(firstNumber, secondNumber).map((elem) => (
        <Col xs="12" key={elem.id}>
          <div className="product-image">
            <Link href={`/product/${elem.id}-${elem.attributes.product_slug}`}>
              <img src={`${getStrapiMedia(elem.attributes.product_display)}`} alt="shop" />
            </Link>
            <div className="product-details">
              <h6 className="font-light">{elem.attributes?.category?.data?.attributes?.category_name}</h6>
              <Link href={`/product/${elem.id}-${elem.attributes.product_slug}`}>
                <h3>{elem.attributes.product_name}</h3>
              </Link>
              {user? (
              <h4 className="font-light mt-1">
                
                <span className="theme-color">
                  
                    {symbol}{formatPrice(elem.attributes.product_price * currencyValue.toFixed(2))}</span>
                    </h4> ):
                  (
                    <h4 className="font-light mt-1">
                  <span style={{color:'#FF8400'}}>Please Login for Price</span>
                  </h4>
                  )
               }
            </div>
          </div>
        </Col>
      ))}
    </>
  );
};

export default SliderProductData;
