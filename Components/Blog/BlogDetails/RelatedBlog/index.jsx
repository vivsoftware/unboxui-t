import React from 'react';
import { Card, CardBody, Container } from 'reactstrap';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import { CommonPath } from '../../../Constant';
import { BlogSlider } from '../../../../Data/SliderSettingsData';

const RelatedBlog = () => {
  const { blogdata } = useSelector((state) => state.BlogReducer);
  const DetailFilter = blogdata.filter((el) => el.type === 'blogDetails');
  return (
    <section className='section-b-space block-shadow-space ratio3_2'>
      <Container>
        <div className='slide-4 product-wrapper slick-lg-space'>
          <Slider {...BlogSlider}>
            {DetailFilter.map((el) => {
              return el.carouselItems.map((elem) => {
                return (
                  <div key={elem.id}>
                    <Card className='blog-categority'>
                      <a className='blog-img'>
                        <img src={`${CommonPath}/${elem.image}`} alt='blogs' className='card-img-top bg-img' />
                      </a>
                      <CardBody>
                        <a>
                          <h2 className='card-title'>{elem.heading}</h2>
                        </a>
                        <div className='blog-profile'>
                          <div className='image-name'>
                            <h3>{elem.author}</h3>
                            <h6>{elem.date}</h6>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                );
              });
            })}
          </Slider>
        </div>
      </Container>
    </section>
  );
};

export default RelatedBlog;
