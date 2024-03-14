import { Col, Container, Row } from 'reactstrap';
import { CustomerService } from '../../../Data/CustomerService';
import { GiTakeMyMoney } from "react-icons/gi";
import { BsPersonCheckFill, BsPersonSquare } from "react-icons/bs";
import { CgFileDocument } from "react-icons/cg";
import Link from 'next/link';
import RFQLoader from '../../Element/rfqLoader';
import SILoader from '../../Element/SILoader';
import ConsultantLoader from '../../Element/ConsultantLoader';
import CreditLoader from '../../Element/CreditLoader';


const FashionService = ({ removePadding }) => {
  return (
    <>
      <div className='d-none d-xl-block d-md-block d-sm-none'>
        <section className={`service-section ${!removePadding ? 'service-style-2 section-b-space' : ''}`}>
          <Container className='home-page'>
            {/* <Row className='g-4 g-sm-3 ms-3'>
          {CustomerService.map((elem) => {
            return (
              <Col xl='3' md='4' sm='6' xs='6' key={elem.id}>
                <div className='service-wrap'>
                  <div className='card service-card'>
                    <div className=' service-icon '>{elem.icon}</div>
                  <div className='service-content'>
                    <h3 className='mb-2'>{elem.title}</h3>
                    <span className='font-light '>{elem.subtitle}</span>
                  </div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row> */}
            <Row className='g-4 g-sm-3 ms-3 mt-2 service-buttons'>
              <Col xl='3' md='6' sm='6' xs='12'>
                <Link href="/rfq">
                  <div className='rfq-card'>
                    <RFQLoader/>
                    <h4 className='text-center mt-4 mb-2' style={{ color: 'black' }}>Request for Quote</h4>
                  </div>
                </Link>
              </Col>
              <Col xl='3' md='6' sm='6' xs='12'>
                <Link href='/systemIntegrator'>
                  <div className='rfq-card'>
                    <SILoader/>
                    <h4 className='text-center mt-4 mb-2' style={{ color: 'black' }}>Find System Integrator</h4>
                  </div>
                </Link>
              </Col>
              <Col xl='3' md='6' sm='6' xs='12'>
                <Link href="/credit">
                  <div className='rfq-card'>
                    <CreditLoader/>
                    <h4 className='text-center mt-4 mb-2' style={{ color: 'black' }}>Easy Finance</h4>
                  </div>
                </Link>
              </Col>
              <Col xl='3' md='6' sm='6' xs='12'>
                <Link href="consultant">
                  <div className='rfq-card'>
                    <ConsultantLoader/>
                    <h4 className='text-center mt-4 mb-2' style={{ color: 'black' }}>Find Consultant</h4>
                  </div>
                </Link>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
      <div className='d-block d-xl-none d-md-none d-sm-block '>
        <div className='container mt-5'>
          <div className='row '>
            <div className='col-6 '>
              <Link href="/rfq">
              <RFQLoader/>
                <h4 className=' mt-2 mb-2' style={{ color: 'black' }}>Request for Quote</h4>
              </Link>
            </div>
            <div className='col-6 '>
              <Link href="/systemIntegrator">
               <SILoader/>
                <h4 className=' mt-2 mb-2' style={{ color: 'black' }}>Find System Integrator</h4>
              </Link>
            </div>
          </div>
          <div className='row mt-2 '>
            <div className='col-6'>
              <Link href="/credit">
                <CreditLoader/>
                <h4 className=' mt-2 mb-2' style={{ color: 'black' }}>Easy Finance</h4>
              </Link>
            </div>

            <div className='col-6'>
              <Link href="/consultant">
                <ConsultantLoader/>
                <h4 className=' mt-2 mb-2' style={{ color: 'black' }}>Find Consultant</h4>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FashionService;
