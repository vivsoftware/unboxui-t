import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { NewArrivals } from '../../Constant';
import SectionHeader from '../../Element/SectionHeader';
import ElectronicInstaCard from './ElectronicInstaCard';
import SkeletonLoader from '../../Element/SkeletonLoader';
const ElectronicInstagramShop = () => {


  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);


  return (
    <section className='ratio_square'>
      <Container fluid={true} className="home-page mt-4">
        <Row>
          <Col>
            <SectionHeader title={NewArrivals} />
            {isLoading ? (
              <SkeletonLoader />

            ) : (


              <ElectronicInstaCard />
            )
            }
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default ElectronicInstagramShop;
