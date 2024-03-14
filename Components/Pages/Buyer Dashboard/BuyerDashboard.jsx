import React, { useState, useRef } from 'react';
import { BuyerDashboardData } from '../../../Data/BuyerDashboardData';
import AllTabContain from '../Buyer Dashboard/AllTabContain';

const BuyerDashboard = ({ userDe, tender, rfq }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [num, setNum] = useState(1);
  const [sellers, setSellers] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [serviceProviders, setServiceProviders] = useState([]);

  const handleClick = (index) => {
    // setActiveTab(index === activeTab ? null : index);
    setActiveTab(index);
;  };
  const toggle = (id) => {
    setNum(id);
  };


  return (
    <>
      <div className='d-none d-xl-block d-md-block d-sm-none'>
        <div className='container-fluid' style={{ marginLeft: '-10px' }}>
          <div className='row'>
            <div className='col-lg-2 col-md-2'>
              <div className='admin-sidebar'>
                {BuyerDashboardData.map((elem, i) => (
                  <div className={`${activeTab === i ? 'thick-border' : ''}`} onClick={() => handleClick(i)} key={i}>
                    <img className="admin-icon" src={elem.image} />
                    <p
                      className={`mt-2 text-center`}
                    // onClick={() => handleClick(i)}
                    >
                      {elem.type}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className='col-lg-10 col-md-10' >
              <AllTabContain activeTab={activeTab} num={num} rfq={rfq} userDe={userDe} tender={tender} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyerDashboard;
