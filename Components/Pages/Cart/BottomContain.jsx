import Link from 'next/link';
import React, {useState,useEffect} from 'react';
import { Col, Form, Input, Row } from 'reactstrap';
import { ApplyCoupon, CartTotals, ConvenienceFee, CouponDiscount, ProcessCheckout, TotalMRP } from '../../Constant';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../../Config/firebase';

const BottomContain = ({ cartData, totalMrp }) => {

  const [user, setUser] = useState(null)
  useEffect(() => {
  auth.onAuthStateChanged((user) => {
    setUser(user);
  })
}, []);
  const {symbol, currencyValue} = useSelector((state)=> state.CurrencyReducer)
  const getTotalPrice = () => {
    var addPrice = 0;
    const filterPrice =
      cartData &&
      cartData.map((el) => {
        return el.attributes.product_price;
      });
    filterPrice?.map((elem) => (addPrice += elem));
    return addPrice;
  };
  const numberWithCommas = (x) => {
    return x.toLocaleString("en-IN");
  };
  const formatPrice = (price) => {
    return `${numberWithCommas(price)}`;
  }

  return (
    <div className='cart-checkout-section'>
      <Row className='g-4'>
        <Col lg='4' sm='6'>
        </Col>
        <Col lg='4' className='ms-auto'>
          <div className='cart-box'>
            <div className='cart-box-details'>
              <div className='total-details'>
               <div className='top-details'>
                  <h3>{CartTotals}</h3>
                  <h6 className='fw-bold'>
                    TOTAL<span>
                    {user ? (
                          <span className='theme-color'>
                            {symbol}{formatPrice(totalMrp * currencyValue.toFixed(2))}
                          </span>
                        ) : (
                          <Link legacyBehavior href="/login">
                            <span className='td-color'style={{color:'#FF8400'}}>Please Login for Price</span>
                          </Link>
                        )}</span>
                  </h6>
                </div>
                <div className='bottom-details'>
                  {user? (
                  <Link href={'/checkout'}>{ProcessCheckout}</Link>
                  ) : (
                                <Link href={'/login'}> Please login to checkout  </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BottomContain;