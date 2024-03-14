import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import DetainTabSection from '../Common/DetailTabsection';
import ProductDetailStatic from '../Product4ImageContain/ProductDetailStatic';
import AutoFadeSliderStatic from '../Common/AutoFadeSliderStatic';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react';
import SkeletonLoader from '../../Element/SkeletonLoader';
import { fetchAPI } from '../../../Utils/api';
import { SingleBedRounded } from '@mui/icons-material';

const ProductNoSideBarContain = ({productData}) => {
  const router = useRouter();
  const { id } = router.query;
  const [singleProduct, setSingleProduct] = useState({});
  useEffect(async()=>{
    const data = await fetchAPI(`/products/${id}`,{
      populate: '*',
    })
    // console.log(res);
    setSingleProduct(data);
  },[router])

  return (
    <section>
      <div className='container-fluid'>
        <Row className='gx-4 gy-5'>
          <Col lg='12' xs='12'>
            <div className='details-items'>
              <Row className='g-4'>
                <Col md='6'>
                  <AutoFadeSliderStatic singleProduct={singleProduct} id={id} />
                </Col>

                <Col md='6'>
                  <ProductDetailStatic singleProduct={singleProduct} id={id} />
                </Col>
              </Row>
            </div>
          </Col>
          <DetainTabSection />
        </Row>
      </div>
    </section>
  );
};

export default ProductNoSideBarContain;
