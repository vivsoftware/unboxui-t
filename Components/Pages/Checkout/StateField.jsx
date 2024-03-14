import React from 'react';
import { Col, Label } from 'reactstrap';
import { Choose, State, StateArr } from '../../Constant';

const StateField = () => {
  return (
    <Col md='4'>
      <Label htmlFor='validationCustom04' className='form-label'>
        {State}
      </Label>
      <select className='form-select custome-form-select' id='validationCustom05'>
        <option disabled>{Choose}</option>
        {StateArr.map((elem, i) => {
          return <option key={i}>{elem}</option>;
        })}
      </select>
    </Col>
  );
};

export default StateField;
