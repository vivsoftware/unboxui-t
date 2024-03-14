import React from 'react';
import { useRouter } from 'next/router';
import { Col } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { CommonPath, OFF, ShopNow } from '../../Constant';
import CountDown from '../../Element/CountDown';
import Img from '../../Element/Images';
import { getStrapiMedia } from '../../../Utils/media';

const LeftCard = ({ elem }) => {
  const router = useRouter();
  return (
    <Col xl='9' lg='8'>
      <div className='timer-banner text-center bg-size'>
        <Img src={getStrapiMedia(elem.dealsLcard)} className='bg-img' alt='timer-banner' />
        <div className='coupon-code theme-color'>{elem.couponcode}</div>
        <div className='discount-offer'>
          {/* <h5>
            {elem.lefttext}
            <span className='theme-color'>
               {elem.discount}% {OFF}{' '}
              <a className='wishlist-icon mt-2'>
                <i className='fas fa-heart'></i>
              </a>
            </span>
          </h5> */}
        </div>
        <div>
          <div className='timer'>
            <CountDown dateCount={elem.dealsDate}/>
          </div>
        </div>
        <div className='banner-btn-grup'>
          <Btn
            attrBtn={{
              className: 'btn',
              onClick: () => router.push(`/product/product_left_sidebar/${elem.dealsLid}`),
            }}>
            {ShopNow}
          </Btn>
        </div>
        {/* <div className='social-media'>
          {elem?.socialmedia.map((item, i) => {
            return (
              <div className='social-icon' key={i}>
                <img src={`${CommonPath}/${item.image}`} className='img-fluid' alt='timer-banner' />
                <h6>{item.title}</h6>
              </div>
            );
          } )}
        </div>*/}
      </div>
    </Col>
  );
};

export default LeftCard;
