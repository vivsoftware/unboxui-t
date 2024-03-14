import React from 'react';
import { Col, Input, Row } from 'reactstrap';

const MobileViewCartData = ({ elem, removeProduct, handleQtyChange, quantity }) => {
  return (
    <td>
      <a>{(elem.attributes.product_name ? elem.attributes.product_name : elem.attributes.variation_name)}</a>
      <h2>{elem.attributes.product_price}</h2>
      <Row className='mobile-cart-content'>
        <Col>
          <div className='qty-box'>
            <div className='input-group'>
              <Input type='number' name='quantity' value={quantity} min={1} className='form-control input-number' onChange={(e) => handleQtyChange(e.target.value)} />
            </div>
          </div>
        </Col>
        <Col>
          <h2>{elem.attributes.product_price}</h2>
        </Col>
        <Col>
          <h2 className='td-color'>
            <a onClick={() => removeProduct(elem)}>
              <i className='fas fa-times'></i>
            </a>
          </h2>
        </Col>
      </Row>
    </td>
  );
};

export default MobileViewCartData;
