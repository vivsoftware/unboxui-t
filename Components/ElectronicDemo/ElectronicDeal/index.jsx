import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import LeftCard from './LeftCard';
import RightCard from './RightCard';
const ElectronicDeal = ({ bannerData }) => {
  return (
    <section className='ratio2_1'>
      <Container>
        <Row className='gy-3 home-page'>
              <Fragment key={1}>
                <LeftCard elem={bannerData} />
                <RightCard elem={bannerData} />
              </Fragment>
        </Row>
      </Container>
    </section>
  );
};
export default ElectronicDeal;
