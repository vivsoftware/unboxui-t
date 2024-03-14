import { Col } from 'reactstrap';
import { CopyRight } from '../../../../Components/Constant';

const RightFooter = () => {
  return (
    <Col md='0'>
      <p className='mb-0 font-dark'>{CopyRight}</p>
    </Col>
  );
};
export default RightFooter;
