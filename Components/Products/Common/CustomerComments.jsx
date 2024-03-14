import React from 'react';
import { Col } from 'reactstrap';
import { CustomerCommentsData } from '../../../Data/CustomerCommentsData';
import { CommonPath, Customerreviews } from '../../Constant';
import CommonRating from './CommonRating';

const   CustomerComments = () => {
  return (
    <Col  xs='12' className='mt-4'>
      <div className='customer-review-box'>
        <h4 style={{color:'#FF8400'}}>{Customerreviews}</h4>

        {CustomerCommentsData.map((elem) => {
          return (
            <div className='customer-section mt-3' key={elem.id}>
              <div className='row customer-profile'>
              <div className='col-md-2'>
                <img src={`${CommonPath}${elem.img}`} className='img-fluid me-2' alt='customer-profile' />
                <h5 className='mt-2'>{elem.name}</h5>
                </div>
              </div>
              <div className='customer-details'>
              <p className='date-custo font-light'>
                  {elem.date} <span></span>
                </p>              
                <p className='font-light'>{elem.comment}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Col>
  );
};

export default CustomerComments;
