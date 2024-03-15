import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Col, TabContent, TabPane } from 'reactstrap';
import BSMContain from './BSM Contain';
import Dashboard from './Dashboard';
import RFQContain from './RFQContain';
import TenderContain from './TenderContain';
import UserContain from './UserContain';
import Marketplace from './Marketplace';


const AllTabContain = ({ activeTab, userDe, sellers, buyers }) => {
  const [data, setData] = useState(false);


  // const [open, setOpen] = React.useState(false);

  // const router = useRouter();
  // const handleClose = () => {
  //   setOpen(false);
  // }
  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const style = {
  //   position: 'absolute',
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  //   width: 400,
  //   bgcolor: 'background.paper',
  //   border: '4px solid #ff8400',
  //   boxShadow: 24,
  //   p: 4,
  // };


  // if (activeTab === 5) {
  //   setOpen(true);

  //   // handleOpen()
  //   //  router.push("/");
  // }

  return (


    <Col>

      <TabContent activeTab={activeTab}>

        <TabPane className={`${activeTab === '0' ? 'active' : ''}`} tabId={0} >
          <Dashboard activeTab={activeTab} userDe={userDe} sellers={sellers} buyers={buyers} />
        </TabPane>
        <TabPane className={`${activeTab === '1' ? 'active' : ''}`} tabId={1} >
          <UserContain />
        </TabPane>
        <TabPane className={`${activeTab === '2' ? 'active' : ''}`} tabId={2} >
          <RFQContain />
        </TabPane>
        <TabPane className={`${activeTab === '3' ? 'active' : ''}`} tabId={3} >
          <TenderContain />
        </TabPane>
        <TabPane className={`${activeTab === '4' ? 'active' : ''}`} tabId={4} >
          <BSMContain />
        </TabPane>
        <TabPane className={`${activeTab === '5' ? 'active' : ''}`} tabId={5} >
         <Marketplace activeTab={activeTab} />
          {/* <MarketplacePop/> */}
        </TabPane>
      </TabContent>
    </Col>










  )
}


export default AllTabContain;
