import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


const TotalPrice = ({ cartData }) => {
  const [total, setTotal] = useState(0);
  const { quantity } = useSelector((state) => state.AddToCartReducer);
  const { symbol, currencyValue } = useSelector((state) => state.CurrencyReducer);
  const [TotalMrp, setTotalMrp] = useState(0);

  const numberWithCommas = (x) => {
    return x.toLocaleString("en-IN");
  };
  const formatPrice = (price) => {
    return `${numberWithCommas(price)}`;
  }
  
  useEffect(() => {
    Object.keys(quantity).forEach((item) => {
      setTotal((prev) => prev + quantity[item]?.qty * quantity[item]?.attributes?.product_price);
    });
  }, []);
  
  const getTotalPrice = () => {
    var addPrice = 0;
    const filterPrice =
      cartData &&
      cartData.map((el) => {
        return el.attributes?.product_price;
      });
    filterPrice?.map((elem) => (addPrice += elem || 0));
    return addPrice;
  };
  useEffect(() => {
    setTotalMrp(() => {
      let total = 0;
      cartData?.map((elem) => {
        total += (elem?.attributes?.product_price ? elem.attributes.product_price : elem.attributes?.variation_price) * (quantity[elem.id]?.qty ? quantity[elem.id]?.qty : 1);
      });
      return total;
    });
  }, [quantity, cartData]);
  return (
    <li className='list-group-item d-flex lh-condensed justify-content-between'>
      <span className='fw-bold'>Total</span>      
      <span>{symbol}{formatPrice(TotalMrp * currencyValue.toFixed(2))}</span>
    </li>
  );
};

export default TotalPrice;
