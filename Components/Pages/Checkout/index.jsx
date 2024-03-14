import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Billingaddress } from '../../Constant';
import CheckoutForm from './CheckoutForm';
import SideBarCartBox from './SideBarCartBox';

const SectionCheckout = () => {
  return (
    <section className='section-b-space'>
      <Container>
        <Row className='g-4'>
          <Col lg='8'>
            <CheckoutForm />
          </Col>
          <SideBarCartBox />
        </Row>
      </Container>
    </section>
  );
};

export default SectionCheckout;
