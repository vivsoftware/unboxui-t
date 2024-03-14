import React, { useState } from 'react';
import { useEffect } from 'react';
import ProductActions from './ProductActions';
import ProductPrice from './ProductPrice';
import ProductSizeChart from './ProductSizeChart';
import ShareSocial from './ShareSocial';

const ProductDetailStatic = ({ bundles, singleProduct, variations }) => {
  const [payload, setPayload ] = useState(null);
  useEffect(()=>{
    if (singleProduct.attributes.product_type === 'simple'){
      setPayload(singleProduct);
    } 
  },[singleProduct])
  const { title, url } = singleProduct;
  return (
    
    <div className='cloth-details-size'>
      <ProductPrice singleProduct={singleProduct} variations={variations}/>
      <ProductSizeChart variations={variations} singleProduct={singleProduct} setPayload={setPayload} payload={payload}/>
      <ProductActions setPayload={setPayload} payload={payload} singleProduct={singleProduct}/>
      <ShareSocial url={url} title={title}/>
    </div>
  );
};


export default ProductDetailStatic;
