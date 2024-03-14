import React, { useEffect, useState } from 'react';
import { Col, Table } from 'reactstrap';
import Link from 'next/link';
import { action, CommonPath, image, Prices, productname, quentityname, Total } from '../../Constant';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from 'reactstrap';
import { getStrapiMedia } from '../../../Utils/media';
import { auth } from '../../../Config/firebase';

const CartData = ({ singleProduct, cartData, setTotalMrp }) => {
  const { quantity } = useSelector((state) => state.AddToCartReducer);
  const { symbol, currencyValue } = useSelector((state) => state.CurrencyReducer)
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const handleQtyChange = (qty, id, price) => {
    dispatch({ type: 'QUANTITY', payload: { qty, id, price } });
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
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);
  const removeProduct = (product) => {
    dispatch({ type: 'REMOVEFROMCART', payload: product });
  };
  const numberWithCommas = (x) => {
    return x.toLocaleString("en-IN");
  };
  const formatPrice = (price) => {
    return `${numberWithCommas(price)}`;
  }

  return (
    <div>
      <div className='d-none d-xl-block'>
        <Col sm='12' className='table-responsive mt-4'>
          <Table className='cart-table'>
            <thead>
              <tr className='table-head'>
                <th scope='col'>{image}</th>
                <th scope='col'>{productname}</th>
                <th scope='col'>{Prices}</th>
                <th scope='col'>{quentityname}</th>
                <th scope='col'>{action}</th>
                <th scope='col'>{Total}</th>
              </tr>
            </thead>
            <tbody>
              {cartData &&
                cartData.map((elem, i) => {
                  return (
                    <tr key={elem.id}>
                      <td>
                        <a>
                          <img src={`${getStrapiMedia((elem.attributes?.product_display ? elem.attributes.product_display : elem.product.attributes.product_display))}`} className='img-fluid' alt='custom' key={elem.id} />
                        </a>
                      </td>
                      <td>
                        <h4>{elem.attributes.product_name}</h4>
                      </td>
                      <td>
                        {user ? (
                          <h2>
                            {symbol}{formatPrice((elem.attributes.product_price ? elem.attributes.product_price : elem.attributes.variation_price) * currencyValue.toFixed(2))}
                          </h2>
                        ) : (
                          <h3 style={{color:'#FF8400'}}>Please Login for Price
                          </h3>
                        )
                        }
                      </td>
                      <td>
                        <div className='qty-box'>
                          <div className='input-group'>
                            <Input
                              type='number'
                              name='quantity'
                              value={quantity[elem.id]?.qty ? quantity[elem.id]?.qty : 1}
                              min={1}
                              className='form-control input-number'
                              onChange={(e) => handleQtyChange(e.target.value, elem.id, elem.price)}
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <a href='#javascript' onClick={() => removeProduct(elem)}>
                          <i className='fas fa-times'></i>
                        </a>
                      </td>
                      <td>
                        {user ? (
                          <h3 className='theme-color'>
                            {symbol}{formatPrice(quantity[elem.id]?.qty ? formatPrice(elem.attributes.product_price ? elem.attributes.product_price : elem.attributes.variation_price) * currencyValue.toFixed(2).toLocaleString() * quantity[elem.id]?.qty : (elem.attributes.product_price ? elem.attributes.product_price : elem.attributes.variation_price))}
                          </h3>
                        ) : (
                          <Link legacyBehavior href="/login">
                            <h2 className='td-color'style={{color:'#FF8400'}}>Please Login for Price</h2>
                          </Link>
                        )}

                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Col>
      </div>
      <div className='d-sm-block d-xl-none'>
        {cartData &&
          cartData.map((elem, i) => {
            return (
              <div className='container'>
                <div className='row mt-2'>
                  <div className='col-5'>
                    <a>
                      <img src={`${getStrapiMedia((elem.attributes?.product_display ? elem.attributes.product_display : elem.product.attributes.product_display))}`} className='img-fluid' alt='custom' key={elem.id} />
                    </a>
                  </div>
                  <div className='col-7'>
                    <a><h5 className='fw-bold mb-1'>{(elem.attributes.product_name ? elem.attributes.product_name : elem.attributes.variation_name)}</h5></a>
                    <h5>{user ? (
                          <span>
                            {symbol}{formatPrice((elem.attributes.product_price ? elem.attributes.product_price : elem.attributes.variation_price) * currencyValue.toFixed(2))}
                          </span>
                        ) : (
                          <span>Please Login for Price
                          </span>
                        )
                        }</h5>
                  </div>
                </div>
                <div className='row mt-2'>
                  <div className='col-4'>
                    <div className='qty-box'>
                      <div className='input-group'>
                        <Input
                          type='number'
                          name='quantity'
                          value={quantity[elem.id]?.qty ? quantity[elem.id]?.qty : 1}
                          min={1}
                          className='form-control input-number'
                          onChange={(e) => handleQtyChange(e.target.value, elem.id, elem.price)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-5'></div>
                  <div className='col-3'>
                    <a href='#javascript' onClick={() => removeProduct(elem)}>
                      <i className='fas fa-times'> Remove</i>
                    </a>
                  </div>
                </div>
                <hr />
              </div>
            )
          })}
      </div>

    </div>
  );
};

export default CartData;
