import Link from 'next/link';
import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import BoxAnimationSection from './BoxAnimationSection';

const BreadCrumb = (props) => {
  const { parent = '', title = '' } = props;
  return (
    <section className='breadcrumb-section section-b-space'>
      <BoxAnimationSection />
      <Container>
        <Row>
          <Col xs='12'>
            <h3 style={{fontSize:'25px'}}>{title}</h3>
            <nav>
            </nav>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BreadCrumb;
