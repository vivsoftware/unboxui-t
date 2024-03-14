import Link from 'next/link';
import React from 'react';
import { CommonPath } from '../../Components/Constant';

const HeadingLogo = () => {
  return (
    <div className='brand-logo'>
      <Link href={'/'}>
        <svg className='svg-icon'>
          <use className='fill-color' xlinkHref='/assets/svg/icons.svg#logo'></use>
        </svg>
        <img src={`${CommonPath}/logo.png`} className='img-fluid' alt='logo' />
      </Link>
    </div>
  );
};
export default HeadingLogo;
