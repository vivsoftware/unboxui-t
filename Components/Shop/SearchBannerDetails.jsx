import { width } from '@mui/system';
import React from 'react';



const SearchBannerDetails = () => {
  return (
    <div className='banner-deatils'>
      <div className='banner-image'>
        <img src="/shop2.png" style={{height:410,width:900}}className='img-fluid bg-img' alt='fashion' />
        <div className='banner-content'>
          <div>
            <h3>Showing Results for</h3>
            <p>"Robots"</p>
          </div>
        </div>
      </div>
      <div className='banner-contain mt-3 mb-5'>
        {/* <p className='font-light'>{bannerdescription}</p> */}
      </div>
    </div>
  );
};

export default SearchBannerDetails;
