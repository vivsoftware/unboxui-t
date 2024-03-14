import { width } from '@mui/system';
import React from 'react';
import { bannerdescription, CommonPath, shopdescription, ShopTheLatestTrends } from '../../Constant';


const ShopBannerDetails = () => {
  return (
    <div className='banner-deatils'>
      <div className='banner-image'>
        <img src="/shop2.png" style={{height:410,width:900}}className='img-fluid bg-img' alt='fashion' />
        <div className='banner-content'>
          <div>
            <h3>{ShopTheLatestTrends}</h3>
            <p>{shopdescription}</p>
          </div>
        </div>
      </div>
      <div className='banner-contain mt-3 mb-5'>
        {/* <p className='font-light'>{bannerdescription}</p> */}
      </div>
    </div>
  );
};

export default ShopBannerDetails;
