import React from 'react';
import { Container } from 'reactstrap';
import MainSliderCard from './MainSliderCard';

const ElectronicHomeSlider = (mainSlider) => {

  return (
    <section className='home-section home-section-1'>
      <Container fluid={true}>
        <div className='slick-1 classic-arrow'>
          <MainSliderCard ElectronicSliderFilter={mainSlider && mainSlider} />
        </div>
      </Container>

    </section>
  );

};
export default ElectronicHomeSlider;
