import React from 'react';
import Slider from 'react-slick';
import { Row } from 'reactstrap';
import { Mostpopularss } from '../../Constant';
import SliderProductData from './SliderProductData';

const ShopLeftSlider = ({products}) => {
  const setting = { dots: false, infinite: true, arrows: true, slidesToShow: 1, slidesToScroll: 1 };
  const firstNumber = Math.floor(Math.random() * 100) +1 ;
  const secondNumber = firstNumber + 3;
  const thirdnumber = Math.floor(Math.random() * 100) +1;
  const fourthnumber = thirdnumber +3;
  
  return (
    <div className='most-popular'>
      <div className='title title-2 text-lg-start'>
        <h3>{Mostpopularss}</h3>
      </div>

      <div className='product-slider round-arrow1'>
        <Slider {...setting}>
          <div>
            <Row className='g-3'>
              <SliderProductData firstNumber={firstNumber} secondNumber={secondNumber} products={products}/>
            </Row>
          </div>
          <div>
            <Row className='g-3'>
              <SliderProductData firstNumber={thirdnumber} secondNumber={fourthnumber} products={products}/>
            </Row>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default ShopLeftSlider;
