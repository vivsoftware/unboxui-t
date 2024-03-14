import React, {useState} from 'react'
import { Col, TabContent, TabPane } from 'reactstrap'
import Dashboard from './Dashboard'
import FinanceContain from './FinanceContain'
import PurchaseContain from './PurchaseContain'
import RFQContain from './RFQContain'
import TenderContain from './TenderContain'
import Marketplace from './Marketplace';
import Link from 'next/link';
import { useRouter } from 'next/router'
import Home from '../../../pages'

const AllTabContain = ({ activeTab, rfq, userDe, tender }) => {
  const [data, setData] = useState(false);
  const router = useRouter();

  if (activeTab === 5) {
           router.push("/");
     
    }


  return (
    <Col lg='11'>
        <TabContent activeTab={activeTab}>
        <TabPane className={`${activeTab === '0' ? 'active' : ''}`}tabId={0} >
          <Dashboard  activeTab={activeTab} userDe={userDe} rfq={rfq} tender={tender}/>
        </TabPane>
        <TabPane className={`${activeTab === '1' ? 'active' : ''}`}tabId={1} >
          <RFQContain rfq={rfq}  userDe={userDe}  />
        </TabPane>
        <TabPane className={`${activeTab === '2' ? 'active' : ''}`}tabId={2} >
          <TenderContain rfq={rfq} userDe={userDe} tender={tender}/>
        </TabPane>
        <TabPane className={`${activeTab === '3' ? 'active' : ''}`}tabId={3} >
          <PurchaseContain />
        </TabPane>
        <TabPane className={`${activeTab === '4' ? 'active' : ''}`}tabId={4} >
          <FinanceContain />
        </TabPane>
        <TabPane className={`${activeTab === '5' ? 'active' : ''}`}tabId={5} >
          {/* <Marketplace/> */}
        </TabPane>
      </TabContent>
    </Col>
  )
}

export default AllTabContain;
