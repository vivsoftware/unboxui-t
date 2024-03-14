import React from 'react';
import { Col, Container, Row } from 'reactstrap';

const MapSection = () => {
  return (
    <section className='contact-section'>
      <Container fluid={true}>
        <Row className='gy-4'>
          <Col xs='12' className='p-0'>
            <div className='location-map'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14025.262249857798!2d77.0831955!3d28.5001521!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19a3278b722b%3A0x6e7019383767f625!2sUnbox%20Industry!5e0!3m2!1sen!2sin!4v1680153068441!5m2!1sen!2sin" width="600" height="450" style={{border:'0'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MapSection;
