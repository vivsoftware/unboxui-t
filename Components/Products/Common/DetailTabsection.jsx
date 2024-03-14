import React, { useCallback, useState } from 'react';
import { Col, TabContent, TabPane } from 'reactstrap';
import DescriptionDetails from './DescriptionDetails';
import ReviewDetails from './ReviewDetails';
import SizeGuideDetails from './SizeGuideDetails';
import SpecificationDetail from './SpecificationDetail';
import ProductVideos from './ProductVideos';
const DetainTabSection = ({singleProduct,video}) => {

  const [active, setActive] = useState(1);
  const handleClick = useCallback((value) => {
    setActive(value);
  }, []);
  
  return (
    <Col xs='12'>
      <div className='cloth-review'>
      <DescriptionDetails singleProduct={singleProduct} />
      <SpecificationDetail singleProduct={singleProduct} />
      <ProductVideos singleProduct={singleProduct} video={video} />
      <SizeGuideDetails singleProduct={singleProduct}/>
      <ReviewDetails />
      </div>
    </Col>
  );
};

export default DetainTabSection;
