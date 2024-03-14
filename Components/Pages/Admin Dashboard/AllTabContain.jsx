import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Col, TabContent, TabPane } from 'reactstrap';
import BSMContain from './BSM Contain';
import Dashboard from './Dashboard';
import RFQContain from './RFQContain';
import TenderContain from './TenderContain';
import UserContain from './UserContain';


const AllTabContain = ({ activeTab, userDe, sellers, buyers }) => {
  const [data, setData] = useState(false);
  const router = useRouter();

  if (activeTab === 5) {
           router.push("/");
    }
    
    return (
      <Col lg='11'>
        <TabContent activeTab={activeTab}>
       
          <TabPane className={`${activeTab === '0' ? 'active' : ''}`} tabId={0} >
            <Dashboard activeTab={activeTab} userDe={userDe} sellers={sellers} buyers={buyers}  />
          </TabPane>
          <TabPane className={`${activeTab === '1' ? 'active' : ''}`} tabId={1} >
            <BSMContain />
          </TabPane>
          <TabPane className={`${activeTab === '2' ? 'active' : ''}`} tabId={2} >
            <UserContain />
          </TabPane>
          <TabPane className={`${activeTab === '3' ? 'active' : ''}`} tabId={3} >
            <RFQContain />
          </TabPane>
          <TabPane className={`${activeTab === '4' ? 'active' : ''}`} tabId={4} >
            <TenderContain />
          </TabPane>
          <TabPane className={`${activeTab === '1' ? 'active' : ''}`} tabId={1} >
              {/* <Marketplace activeTab={activeTab}/> */}
            </TabPane>
         
          
        </TabContent>
      </Col>
    )
  }


  export default AllTabContain;
