import React from 'react';

const LoginDetail = ({ item, openProfileModal }) => {
  return (
    <ul className='dash-profile'>
          <li >
            <div className='left'>
              <h6 className='font-light'>Password</h6>
            </div>
            <div className='right'>
              <h6>***********</h6>
            </div>
            <a href='#javascript' onClick={() => openProfileModal()}>{item.btn}</a>
          </li>
    </ul>
  );
};
export default LoginDetail;




