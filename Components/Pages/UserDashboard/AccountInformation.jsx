import React from 'react';
import { Col, Row } from 'reactstrap';

const AccountInformation = ({ userDe }) => {
  return (
    <div className='box-account box-info'>
      <div className='box-head'>
      </div>
      <Row>
        <Col sm='6'>
          <div className='box'>
            <div className='box-title'>
              <h4>User Details</h4>
            </div>
            <div className='box-content'>
              <h6 className='font-light'>Name: {userDe.firstName} {userDe.lastName}</h6>
              <h6 className='font-light'>Email: {userDe.email}</h6>
              <h6 className='font-light'>Phone: +{userDe.phoneNumber}</h6>
            </div>
          </div>
        </Col>
        <Col sm='6'>
          <div className='box'>
            <div className='box-title'>
            </div>
            <div className='box-content'>
            </div>
          </div>
        </Col>
      </Row>
      <div>
        <div className='box address-box'>
          <div className='box-title'>
          </div>
          <div className='box-content'>
            <Row className='row g-4'>
              <Col sm='6'>
              </Col>
              <Col sm='6'>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInformation;
