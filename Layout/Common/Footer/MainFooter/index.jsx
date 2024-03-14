import { useEffect, useState } from 'react';
import { Container, Row } from 'reactstrap';
import { getAPIData } from '../../../../Utils';
import ContactFooter from './ContactFooter';
import MenuFooter from './MenuFooter';
import GetTouch from './GetTouch';
import QuestionTabs from './QuestionTab';

const MainFooter = ({ QuestionTab ,getFooter, brands, industries}) => {

  return (
    <div className='container-fluid '>
      <Row className='gy-4'>
        <ContactFooter getFooter={getFooter} />
        <MenuFooter getFooter={getFooter} brands={brands} industries={industries}/>
        {/* {QuestionTab ? <QuestionTabs /> : <GetTouch />} */}
      </Row>
    </div>
  );
};
export default MainFooter;
