import Link from 'next/link';
import { Col } from 'reactstrap';
import { CommonPath, Weaccept } from '../../../../Components/Constant';

const SubFooter = () => {
  return (
    <Col md='0'>
      <ul>
        <li className='font-dark'>{Weaccept}</li>
        <li>
          <Link href='#javascript'>
            <img src={`${CommonPath}/payment-icon/1.jpg`} className='img-fluid' alt='payment icon' />
          </Link>
        </li>
        <li>
          <Link href='#javascript'>
            <img src={`${CommonPath}/payment-icon/2.jpg`} className='img-fluid' alt='payment icon' />
          </Link>
        </li>
        <li>
          <Link href='#javascript'>
            <img src={`${CommonPath}/payment-icon/3.jpg`} className='img-fluid' alt='payment icon' />
          </Link>
        </li>
        <li>
          <Link href='#javascript'>
            <img src={`${CommonPath}/payment-icon/4.jpg`} className='img-fluid' alt='payment icon' />
          </Link>
        </li>
      </ul>
    </Col>
  );
};
export default SubFooter;
