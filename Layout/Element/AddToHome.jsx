import React from 'react';
import { ADDTOHOMESCREEN, CommonPath, EnjoyExperience, EnjoyExperienceDescription } from '../../Components/Constant';

const AddToHome = ({ open }) => {
  return (
    <li className='mobile-poster d-flex d-xl-none' style={{ right: open ? '0px' : '-410px' }}>
      <img src={`${CommonPath}/pwa.png`} className='img-fluid' alt='pwa' />
      <div className='mobile-contain'>
        <h5>{EnjoyExperience}</h5>
        <p className='font-light'>{EnjoyExperienceDescription}</p>
        <a id='installApp' className='btn btn-solid-default btn-spacing w-100'>
          {ADDTOHOMESCREEN}
        </a>
      </div>
    </li>
  );
};

export default AddToHome;
