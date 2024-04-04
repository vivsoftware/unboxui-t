import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import { SellerDashboardData } from '../../../Data/SellerDashboardData'
import AllTabContain from './AllTabContain'

const SellerDashboard = ({rfq, registeredUser,tender, userDe}) => {
    const [activeTab, setActiveTab] = useState(0);
    const [num, setNum] = useState(1);
    const [showMenu, setShowMenu] = useState();
    const router = useRouter();
    const handleClick = (index) => {
        // setActiveTab(index === activeTab ? null : index);  //double click error bcz of this
        setActiveTab(index);
    };
    const toggle = (id) => {
        setNum(id);
    };
    const handleShowMenu = () => {
        setShowMenu(!showMenu);
    }
   console.log("Menu", showMenu)
    return (
        <>
        <div className='d-none d-xl-block d-md-block d-sm-none'>
            <Container fluid style={{ marginLeft: '-10px' }}>
                <Row>
                    <Col lg='2' md='2' >
                        {/* <div className='admin-sidebar'> */}
                        <div className='seller-sidebar'>
                        {SellerDashboardData.map((elem, i) => (
                                <div className={`${activeTab === i ? 'thick-border' : ''}`} onClick={() => handleClick(i)} key={i}>
                                    <img className="admin-icon" src={elem.image} />
                                    <p
                                        className={`mt-2 text-center`}
                                    >
                                        {elem.type}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </Col>
                    <Col lg='10' md='10' >
                        <AllTabContain activeTab={activeTab} num={num}  rfq={rfq} tender={tender} registeredUser={registeredUser} userDe={userDe} />
                    </Col>
                </Row>
            </Container>
            {/* <BidContain/> */}
            </div>
        </>
    )
}
export default SellerDashboard
