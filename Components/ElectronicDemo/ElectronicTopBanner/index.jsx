import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { getStrapiMedia } from '../../../Utils/media';
import ProductSlider from './LeftBanner';

const ElectronicTopBanner = ({ bannerData, elemclass }) => {
  const bannerurls = getStrapiMedia(bannerData);
  return (
    <section className={`ratio2_1 ${elemclass} mt-5`}>
      <Container>
        <Row className='gy-3'>
          <ProductSlider bannerData={bannerurls} />
        </Row>
      </Container>
    </section>
  );
};
export default ElectronicTopBanner;
