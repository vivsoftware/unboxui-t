import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { getAPIData } from '../../../Utils';
import { fetchAPI } from '../../../Utils/api';
import AutoFadeSlider from '../Common/AutoFadeSlider';
import ProductDetails from '../ProductBundle/ProductDetails';
import ProductFilterButton from './ProductFilterButton';


const RightsideContain = () => {
  const router = useRouter();
  const { id } = router.query;
  const [singleProduct, setSingleProduct] = useState({});
  useEffect(() => {
        return id && id ? fetchAPI(`/products/${id}`,{
          populate: '*',
        }).then((res)=>{
          setSingleProduct(res.data);
        }) : console.log(`id Undefined`);
  }, [router]);

  
  return (
    <Col lg='9' xs='12'>
      <ProductFilterButton />
      <div className='details-items'>
        {Object.keys(singleProduct).length > 0 && (
        <Row className='g-4'>
          <Col md='6'>
            <AutoFadeSlider singleProduct={singleProduct} id={id} />
          </Col>
          <Col md='6'>
            <ProductDetails singleProduct={singleProduct} id={id} />
          </Col>
        </Row>
        )}
      </div>
    </Col>
  )
};

export default RightsideContain;
