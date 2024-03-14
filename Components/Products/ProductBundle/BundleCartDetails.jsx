import Link from 'next/link';
import React from 'react';

const BundleCartDetails = () => {
  return (
    <div className='image-bundle border-product'>
      <h6 className='product-title d-block'>Frequently Bought Together</h6>
      <div className='bundle-img'>
        <div className='image-contain'>
          <a href='#javascript'>
            <img src='/assets/images/fashion/5.jpg' className='img-fluid' alt='fashion' />
          </a>
        </div>
        <span>
          <i className='fas fa-plus'></i>
        </span>
        <div className='image-contain'>
          <a href='#javascript'>
            <img src='/assets/images/fashion/6.jpg' className='img-fluid' alt='fashion' />
          </a>
        </div>
        <span>
          <i className='fas fa-plus'></i>
        </span>
        <div className='image-contain'>
          <a href='#javascript'>
            <img src='/assets/images/fashion/7.jpg' className='img-fluid' alt='fashion' />
          </a>
        </div>
      </div>

      <ul className='checkbox-details'>
        <li className='checkbox-list'>
          <div className='form-check user-checkbox ps-0'>
            <input className='checkbox_animated check-it' type='checkbox' value='' id='flexCheckDefault3' />
            <label className='form-check-label' htmlFor='flexCheckDefault3'>
              This Product: Color Combination Track <span className='fw-bolder'>$64</span>
            </label>
          </div>
        </li>

        <li className='checkbox-list'>
          <div className='form-check user-checkbox ps-0'>
            <input className='checkbox_animated check-it' type='checkbox' value='' id='flexCheckDefault1' />
            <label className='form-check-label' htmlFor='flexCheckDefault1'>
              This Product: Full Ladies Pants <span className='fw-bolder'>$24</span>
            </label>
          </div>
        </li>

        <li className='checkbox-list'>
          <div className='form-check user-checkbox ps-0'>
            <input className='checkbox_animated check-it' type='checkbox' value='' id='flexCheckDefault2' />
            <label className='form-check-label' htmlFor='flexCheckDefault2'>
              This Product: Ladies Full Skirt Dress <span className='fw-bolder'>$85</span>
            </label>
          </div>
        </li>

        <li>
          <Link href={'/shop/shop_left_sidebar'} className='btn default-light-theme default-theme default-theme-2 outline-button'>
            Buy This Bundle
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default BundleCartDetails;
