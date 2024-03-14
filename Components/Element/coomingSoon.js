import React from 'react';
import { Card } from 'reactstrap';
import ProductNoSideBarContain from '../Products/ProductNoSidebarContain';
const Commingsoonloader = () => {
  return (
    <Card className='is-loading'>
      <div className='image'></div>
      <div className='content'>
        <h2>Comming Soon.......</h2>
        <h2></h2>
      </div>
    </Card>
  );
};
export default Commingsoonloader;
