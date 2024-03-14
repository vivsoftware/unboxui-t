import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { deleteProduct, getAPIData } from '../../../Utils';
import { Btn } from '../../AbstractElements';
import { clearallitems, ContinueShopping } from '../../Constant';
import BottomContain from './BottomContain';
import CartData from './CartData';
import CounterCart from './CounterCart';

const ProductCart = () => {
  const [cartData, setCartData] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const { product } = useSelector((state) => state.AddToCartReducer);
  useEffect(() => {
    setCartData(product);
  }, [product]);
  const removeAll = () => {
      dispatch({ type: 'REMOVEFROMCARTALL' });
  };

  const [totalMrp, setTotalMrp] = useState(0);
  return (
    <>
    <section className='cart-section section-b-space'>
      <Container>
        <Row className='justify-content-center'>
          {cartData.length > 0 ? (
            <>
              <CartData cartData={cartData} setTotalMrp={setTotalMrp} />
              <Col xs='12' className='mt-md-5 mt-4'>
                <Row>
                  <Col sm='7' xs='5' className='order-1'>
                    <div className='left-side-button text-end d-flex d-block justify-content-end'>
                      <a href='#javascript' className='text-decoration-underline theme-color d-block text-capitalize' onClick={() => removeAll()}>
                        {clearallitems}
                      </a>
                    </div>
                  </Col>
                  <Col sm='5' xs='7'>
                    <div className='left-side-button float-start'>
                      <Link href='/shop' className='btn btn-solid-default btn fw-bold mb-0 ms-0'>
                        <i className='fas fa-arrow-left'></i> {ContinueShopping}
                      </Link>
                    </div>
                  </Col>
                </Row>
              </Col>
              <BottomContain cartData={cartData} totalMrp={totalMrp} />
            </>
          ) : (
            <Col xs='12'>
              <div className='empty-box text-center'>
                <img src='/assets/images/cartEmpty.png' className='img-fluid mb-sm-4 mb-3' alt='empty cart' />
                <div className='w-100'>
                  <h5 className='mb-3 font-dark'>Your shopping cart is empty. Let's add something to it</h5>
                  <Btn attrBtn={{ className: 'btn-solid-default', onClick: () => router.push('/shop') }}>{ContinueShopping}</Btn>
                </div>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </section>
    </>
  );
};

export default ProductCart;
