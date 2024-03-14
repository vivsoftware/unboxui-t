import React, { useEffect, useState } from 'react';
import { Container, Row } from 'reactstrap';
import { HurryUp, ProductinSpotlight } from '../../Constant';
import SectionHeader from '../../Element/SectionHeader';
import TabNavBar from './TabNavBar';
import SkeletonLoader from '../../Element/SkeletonLoader';
const ElectronicHurryUp = ({ newtabsection }) => {


  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);


  return (
    <section className='tab-section'>
      <Container className='home-page mt-3'>
        <Row>
          <div className='col mt-3 mb-2'>
            <SectionHeader title={ProductinSpotlight} />
            <div className='tab-wrap'>
              {isLoading ? (
                <SkeletonLoader />
              ) : (


                <TabNavBar newtabs={newtabsection} />


              )}
            </div>
          </div>
        </Row>
      </Container>
    </section>
  );
};
export default ElectronicHurryUp;
