import { Col, Container, Row } from 'reactstrap';
import { BrandsDesc } from './BrandsDesc';
import { fetchAPI } from '../../../Utils/api';
import Image from 'next/image';
import { getStrapiMedia } from '../../../Utils/media';
  import Img from '../../Element/Images';
const BrandsService = ({ removePadding }) => {


 

  return (
    <section className={`service-section ${!removePadding ? 'service-style-2 section-b-space' : ''}`}>
      <Container>
        <Row className='g-4 g-sm-3'>
          {BrandsDesc.map((elem) => {
            return (
              <Col xl='3' sm='6' key={elem.id}>
                    <Image src='/loginback.svg'  height={200} width={300} />  
                  <div className='service-content'>
                    <h3 className='mb-2'>{elem.title}</h3>
                    <span className='font-light'>{elem.subtitle}</span>
                  </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};
export default BrandsService;