import React from 'react';
import { Col, TabContent, TabPane } from 'reactstrap';
import DashBoardContain from './DashBoardContain';
import MobileViewBtn from './MobileViewBtn';
import ProfileContain from './ProfileContain';
import SaveAddress from './SaveAddress';
import SecurityContain from './SecurityContain';
import WishListContain from './WishListContain';

const AllTabContain = ({ activeTab , user } ) => {
  
  return (
    <Col lg='9'>
      <MobileViewBtn />
      <TabContent activeTab={activeTab}>
        <TabPane className={`${activeTab === 1 ? 'show active ' : ''}`} tabId={1}>
          <DashBoardContain />
        </TabPane>
        <TabPane className={`${activeTab === 3 ? 'show active ' : ''}table-dashboard dashboard wish-list-section`} tabId={3}>
          <WishListContain />
        </TabPane>
        <TabPane className={`${activeTab === 4 ? 'show active ' : ''}dashboard`} tabId={4}>
          <SaveAddress />
        </TabPane>
        <TabPane className={`${activeTab === 6 ? 'show active ' : ''}dashboard-profile dashboard`} tabId={6}>
          <ProfileContain />
        </TabPane>
        <TabPane className={`${activeTab === 7 ? 'show active ' : ''}dashboard-security dashboard`} tabId={7}>
          <SecurityContain user={user} />
        </TabPane>
      </TabContent>
    </Col>
  );
};

export default AllTabContain;
