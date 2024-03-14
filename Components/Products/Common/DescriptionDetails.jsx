import React, { useEffect, useState } from 'react';

const DescriptionDetails = ({singleProduct}) => {

  return (
    <div className='shipping-chart'>
      <h3 className='mb-3' >Description</h3>
        <div className='font-light' style={{textAlign:'justify'}} dangerouslySetInnerHTML={{__html: `${singleProduct.attributes.products_description}`}}></div>
    </div>
  );
};


export default DescriptionDetails;
