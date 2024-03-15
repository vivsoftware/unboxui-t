import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Col, TabContent, TabPane } from 'reactstrap';
import spring_boot_url from '../../../Utils/springApi';
import BSMContain from './BSM Contain';
import Dashboard from './Dashboard';
import RFQContain from './RFQContain';
import TenderContain from './TenderContain';
import UserContain from './UserContain';
const AllTabContain = ({ activeTab, userDe, sellers, buyers }) => {
  const [data, setData] = useState(false);
  const router = useRouter();
  const [options, setoptions] = useState(null);
  const [user, setUser] = useState(null);
  const [Rfq, setRfq] = useState(null);
  const [Tender, setTender] = useState(null);

///////////////////////////////get all tender and rfq details //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

useEffect(() => {
      axios.get(`${spring_boot_url}api/userRfq`)
          .then(resp => {
              setRfq(resp.data);
          });
  }, []);


  useEffect(() => {
      axios.get(`${spring_boot_url}api/tender`)
          .then(resp => {
              console.log(resp.data.json);
              localStorage.setItem("data", JSON.stringify(resp.data));
              setTender(resp.data);
          });
  }, []);


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
            <BSMContain  userDe={userDe} Tender={Tender} Rfq={Rfq}/>
          </TabPane>
          <TabPane className={`${activeTab === '2' ? 'active' : ''}`} tabId={2} >
            <UserContain />
          </TabPane>
          <TabPane className={`${activeTab === '3' ? 'active' : ''}`} tabId={3} >
            <RFQContain />
          </TabPane>
          <TabPane className={`${activeTab === '4' ? 'active' : ''}`} tabId={4} >
            <TenderContain Tender={Tender}/>
          </TabPane>
          <TabPane className={`${activeTab === '1' ? 'active' : ''}`} tabId={1} >
              {/* <Marketplace activeTab={activeTab}/> */}
            </TabPane>
        </TabContent>
      </Col>
    )
  }


  export default AllTabContain;
