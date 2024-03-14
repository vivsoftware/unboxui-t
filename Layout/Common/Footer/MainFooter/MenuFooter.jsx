import Link from 'next/link';
import { useState } from 'react';
import { Col } from 'reactstrap';

const MenuFooter = ({ getFooter, brands, industries }) => {
  const [isActive, setIsActive] = useState(null);
  const onHandleChange = (id) => {
    console.log('Clicked id:', id);
    setIsActive(id);
  };
  
  return (
    <>
          <Col xl='2' lg='2' md='2' sm='6' key='1'>
          <div className='footer-links'>
              <div className='footer-title' onClick={() => onHandleChange('1')}>
                <h3>Categories</h3>
              </div>
              <div className={`footer-content d-sm-block ${isActive === '1' ? 'd-block' : ' d-none'}`}>

                <ul>
                  {getFooter?.slice(5,12).map((category, i)=>{
                    return(
                      <li key={i}>
                        <Link href={`/category/${category.id}-${category.attributes.category_slug}`} className='font-dark'>
                          {category.attributes.category_name}
                        </Link>
                      </li>
                    )
                  })}
                  <li><Link href="/shop">See More</Link></li>
                </ul>
              </div>
            </div>
          </Col>
          <Col xl='2' lg='2' md='2' sm='6' key='2'>
            <div className='footer-links'>
              <div className='footer-title' onClick={() => onHandleChange('2')}>
                <h3>Brands</h3>
              </div>
              <div className={`footer-content d-sm-block ${isActive == '2' ? 'd-block' : ' d-none'}`}>
                <ul>
                  {brands?.slice(5,12).map((category, i)=>{
                    return(
                      <li key={category.id}>
                        <Link href={`/brand/${category.id}-${category.attributes.brand_slug}`} className='font-dark'>
                          {category.attributes.brand_name}
                        </Link>
                      </li>
                    )
                  })}
                  <li><Link href="/brands">See More</Link></li>
                </ul>
              </div>
            </div>
          </Col>
          <Col xl='2' lg='2' md='2' sm='6' key='3'>
            
          <div className='footer-links'>
              <div className='footer-title' onClick={() => onHandleChange('3')}>
                <h3>About us</h3>
              </div>
              <div className={`footer-content d-sm-block ${isActive == '3' ? 'd-block' : ' d-none'}`}>
                <ul>
                      <li key='3a'>
                        <Link href='/contact-us' className='font-dark'>
                          Contact Us
                        </Link>
                      </li>
                      <li key='3b'>
                        <Link href='/about-us' className='font-dark'>
                          About Us
                        </Link>
                      </li>
                      <li key='3c'>
                        <Link href='/blogs' className='font-dark'>
                          Blogs
                        </Link>
                      </li>
                </ul>
              </div>
            </div> 
          </Col>
          <Col xl='2' lg='2' md='2' sm='6' key='4'>
          <div className='footer-links'>
              <div className='footer-title' onClick={() => onHandleChange('4')}>
                <h3>Resources</h3>
              </div>
              <div className={`footer-content d-sm-block ${isActive == '4' ? 'd-block' : ' d-none'}`}>
                <ul>
                      <li key='4a'>
                        <Link href='#' className='font-dark'>
                          Unbox Videos
                        </Link>
                      </li>
                      <li key='4b'>
                        <Link href='#' className='font-dark'>
                          Case Studies
                        </Link>
                      </li>
                      <li key='4c'>
                        <Link href='/faq' className='font-dark'>
                          FAQs
                        </Link>
                      </li>
                </ul>
              </div>
            </div>    
          </Col>
          <Col xl='2' lg='2' md='2' sm='6' key='5'>
            
          <div className='footer-links'>
              <div className='footer-title' onClick={() => onHandleChange('5')}>
                <h3>Industries</h3>
              </div>
              <div className={`footer-content d-sm-block ${isActive == '5' ? 'd-block' : ' d-none'}`}>
                <ul>
                  {industries?.slice(0,7).map((category, i)=>{
                    return(
                      <li key={category.id}>
                        <Link href={`/industries/${category.id}${category.attributes.CardTitle}`} className='font-dark'>
                          {category.attributes.CardTitle}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          
          </Col>
    </>
  );
};
export default MenuFooter;
