import React from 'react';
import { Row } from 'reactstrap';
import AddComments from './AddComments';
import CustomerComments from './CustomerComments';


const ReviewDetails = () => {

  

  return (
    <Row>
      <h3 className='mt-4 mb-3' >Review</h3>
      <AddComments />
      {/* <CustomerComments /> */}
    </Row>
  );
};

export default ReviewDetails;
