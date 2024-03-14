import { Container, Row, Col } from 'reactstrap';
import MainFooter from './MainFooter';
import Link from 'next/link';

const Footers = ({ QuestionTab, categories, brands ,industries }) => {
  return (
    <>
      <footer className='footer-sm-space'>
        <div className='main-footer'>
          <MainFooter QuestionTab={QuestionTab} getFooter={categories} brands={brands} industries={industries}/>
        </div>
        <div className='sub-footer'>
          <Container>
            <Row className='gy-3'>
              <Col xl='12' lg='12' md='12' sm='12' >
                <p className='text-center'>© 2023 Unbox Industry. All Rights Reserved | <Link href="/privacy-policy">Privacy Policy</Link> | <Link href="/copyright_">Copyright</Link> | <Link href="/terms-conditions">Terms & Conditions</Link></p>
              </Col>
            </Row>
          </Container>
        </div>
      </footer>
    </>
  );
};
export default Footers;
