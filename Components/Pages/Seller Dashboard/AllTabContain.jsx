import React from 'react';
import { Col, TabContent, TabPane } from 'reactstrap';
import BidContain from './BidContain';
import Dashboard from './Dashboard';
import Marketplace from './Marketplace';
import RFQContain from './RFQContain';
import SalesContain from './SalesContain';
import TenderContain from './TenderContain';
import UserContain from './UserContain';

const AllTabContain = ({activeTab, num ,rfq,tender,userDe }) => {
  return (
    <>
      <Col lg='11'>
        <TabContent activeTab={activeTab}>
        <TabPane className={`${activeTab === '0' ? 'active' : ''}`}tabId={0} >
          <Dashboard  activeTab={activeTab}  rfq={rfq} tender={tender} userDe={userDe} />
        </TabPane>
        <TabPane className={`${activeTab === '1' ? 'active' : ''}`}tabId={1} >
          <RFQContain   rfq={rfq} tender={tender} userDe={userDe}/>
        </TabPane>
        <TabPane className={`${activeTab === '2' ? 'active' : ''}`}tabId={2} >
          <TenderContain  rfq={rfq} tender={tender} userDe={userDe} />
        </TabPane>
        <TabPane className={`${activeTab === '3' ? 'active' : ''}`}tabId={3} >
          <BidContain  rfq={rfq} tender={tender} userDe={userDe} />
        </TabPane>
        <TabPane className={`${activeTab === '4' ? 'active' : ''}`}tabId={4} >
          <SalesContain />
        </TabPane>
        <TabPane className={`${activeTab === '5' ? 'active' : ''}`}tabId={5} >
          <UserContain userDe={userDe} />
        </TabPane>
        <TabPane className={`${activeTab === '6' ? 'active' : ''}`}tabId={6} >
          {/* <Marketplace/> */}
          <Marketplace activeTab={activeTab}/>
        </TabPane>
      </TabContent>
    </Col>
    </>
  )
}

export default AllTabContain
