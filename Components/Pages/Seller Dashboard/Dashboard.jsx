// import React from 'react'
import React, { useEffect, useRef, useState } from 'react';
import { Chart } from "react-google-charts";
import axios from 'axios';
import spring_boot_url from '../../../Utils/springApi';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const Dashboard = ({ tender, rfq, userDe,sellers }) => {

    const [user, setUser] = useState(null);
    const [RfqNo, setRfqNo] = useState(null);
    const [TenderNo, setTenderNo] = useState(null);
    const [opentender, setopentender] = useState(null);
    const [openrfq, setopenrfq] = useState(null);
    const [openPurchase, setopenPurchase] = useState(null);
    const [openBids, setopenBids] = useState(null);
    const [openUser, setopenUser] = useState(null);
    const [openseller, setopenseller] = useState(null);
    const [userData, setUserData] = useState(null);
   



    //////////////////changes//////////////////

    const allUsers = () => {
        axios.get(`${spring_boot_url}api/adminuser/allusers`)
            .then(resp => {
                console.log(resp.data.json);
                console.log("Dash");
                localStorage.setItem("data", JSON.stringify(resp.data));
                setUserData(resp.data);
            });
    }

    const allbuyer = () => {
        axios.get(`${spring_boot_url}api/adminuser/search?query=buyer`)
            .then(resp => {
                console.log(resp.data.json);
                setUserData(resp.data);
            });
    }
    const allseller = () => {
        axios.get(`${spring_boot_url}api/adminuser/search?query=seller`)
            .then(resp => {
                console.log(resp.data.json);
                setUserData(resp.data);
            });
    }

    const openModal = (userData) => {
        setSelectedUserData(userData);
        setModalOpen(true);
    };
    // Function to close modal
    const closeModal = () => {
        setModalOpen(false);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    }
    const handleOpen = () => {
        setOpen(true);
    };
    const handleOpenseller = () => {
        setopenseller(true);
    };

    const handleCloseseller = () => {
        setopenseller(false);
    }

    const handleOpenTender = () => {
        setopentender(true);
    };

    const handleCloseTender = () => {
        setopentender(false);
    };

    const handleOpenrfq = () => {
        setopenrfq(true);
    };

    const handleCloserfq = () => {
        setopenrfq(false);
    };

    const handleOpenPurchase = () => {
        setopenPurchase(true);
    };

    const handleClosePurchase = () => {
        setopenPurchase(false);
    };

    const handleOpenBids = () => {
        setopenBids(true);
    }
    const handleCloseBids = () => {
        setopenBids(false);
    }

    const handleOpenUser = () => {
        setopenUser(true);
    }
    const handleCloseUser = () => {
        setopenUser(false);
    }
    const handleViewDetailsClick = (userData) => {
        openModal(userData);
        setIsOpen(false);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 900,
        height: 700,
        bgcolor: 'background.paper',
        border: '4px solid #ff8400',
        boxShadow: 24,
        p: 4,
    };


    useEffect(() => {
        allUsers();
        allseller();
        setRfqNo(rfq);
        setTenderNo(tender);
        setopenseller(sellers);
        setUserData(userDe);


    }, [])
    //////////////////////changes end///////////////////////

    const data11 = [
        ["RFQs", "Tenders"],
        ["RFQs", rfq?.length],
        ["Tenders", tender?.length],

    ];

    const options = {

        title: "RFQS & Tender",
        sliceVisibilityThreshold: 0.6, // 20%
        colors: ['#ff8400', '#5f5f5f'],

    };

    const data12 = [
        ["", ""],
        ["", 33],
        ["", 26],
    ];

    const options1 = {
        title: "Company Performance",
        sliceVisibilityThreshold: 0.2, // 20%
        // colors: ['#ff7f50', '#b8860b'],
        // height: ['10px'],
        // width: ['10px'],
        radius: ['50%'],

    };



    return (

        <>
            <div>
                <h4>Hi.{userDe?.firstName}</h4>
                <p>Welcome to your dashboard</p>

            </div>
            {/* <CustomBarChart data1={data1} /> */}
            {/* <StackBars/> */}
            {/* desktop view upper block */}
            <div className='grid-container sm-6' id="upper">
                <div className=' grid-item '>
                    <div >
                        <h5 className='rfq-text'> RFQs</h5>
                        <p className='rfq-text' style={{ fontSize: '50px', marginTop: '38px', color: '#015867' }}>{rfq?.length}</p>
                    </div>
                </div>
                <div className=' grid-item'>
                    <h5 className='rfq-text'>Tenders</h5>
                    <p className='rfq-text' style={{ fontSize: '50px', marginTop: '38px', color: '#015867' }}>{tender?.length}</p>
                </div>
                <div className=' grid-item'>
                    <h5 className='rfq-text'>Bids</h5>
                    <p className='rfq-text' style={{ fontSize: '50px', marginTop: '38px', color: '#015867' }}>{0}</p>
                </div>
                <div className=' grid-item'>
                    <h5 className='rfq-text'>Users</h5>
                    <p className='rfq-text' style={{ fontSize: '50px', marginTop: '38px', color: '#015867' }}>47</p>
                </div>
                <div className=' grid-item'>
                    <h5 className='rfq-text'>Purchases</h5>
                    <p className='rfq-text' style={{ fontSize: '50px', marginTop: '38px', color: '#015867' }}>0</p>
                </div>
                {/* <RecipeReviewCard /> */}
                {/* <card className='grid-item2'>
              <img height={120} width={200} src="https://www.unboxindustry.com/_next/image?url=https%3A%2F%2Fstrapi.unboxindustry.com%2Fuploads%2F1684237488053_4bb22bf76e.jpeg&w=384&q=75" />
          </card> */}
            </div >


            {/* mobile view view upper block */}
            <div className='upperblock' id="grid1_mobile">
                <div className=' grid-itemmobile ' style={{ borderSpacing: "1px" }}>
                    <div >
                        <h5 className='rfq-textmobile'> RFQs</h5>
                        <p className='rfq-textmobile' style={{ fontSize: '30px', marginTop: '14px', color: '#015867' }}>{rfq?.length}</p>
                    </div>
                </div>
                <div className=' grid-itemmobile'>
                    <h5 className='rfq-textmobile'>Tenders</h5>
                    <p className='rfq-textmobile' style={{ fontSize: '30px', marginTop: '14px', color: '#015867' }}>{tender?.length}</p>
                </div>
                <div className=' grid-itemmobile'>
                    <h5 className='rfq-textmobile'>Bids</h5>
                    <p className='rfq-textmobile' style={{ fontSize: '3    0px', marginTop: '14px', color: '#015867' }}>{0}</p>
                </div>
                <div className=' grid-itemmobile'>
                    <h5 className='rfq-textmobile'>Users</h5>
                    <p className='rfq-textmobile' style={{ fontSize: '30px', marginTop: '14px', color: '#015867' }}>47</p>
                </div>
                <div className=' grid-itemmobile'>
                    <h5 className='rfq-textmobile'>Purchases</h5>
                    <p className='rfq-textmobile' style={{ fontSize: '30px', marginTop: '14px', color: '#015867' }}>0</p>
                </div>
            </div >
            {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/* desktop view 2nd block */}

            <div className='gridrfq-container' id="grid1">
                <div className='details' id='grid'>
                    <h3 className='text-center mb-1'>RFQ Details</h3>
                    <div className='row ms-1'>
                        <table>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Project</th>
                                <th>PhoneNumber</th>

                            </tr>
                            <tbody>
                                {rfq?.slice(0, 5).map((rfq, index) => (
                                    <tr key={index + 1}>
                                        <td>{index + 1}</td>
                                        <td>{rfq.id}</td >
                                        <td>{rfq?.projectName}</td>
                                        <td>{rfq?.phoneNumber}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='row'>
                        <div className='col-12 text-end'>
                            <button className='btn' onClick={() => handleOpenrfq()} style={{ backgroundColor: 'white', color: "#FF8400", height: '20px', padding: '0' }} >View All</button>
                        </div>
                    </div>
                </div>
                <div className='details' id='grid'>
                    <h3 className='text-center mb-1'>Tender Details</h3>
                    <div className='row ms-1'>
                        <table>
                            <tr>
                                <th>TId</th>
                                <th>Name</th>
                                <th>Project</th>
                                <th>Phone Number</th>
                            </tr>
                            <tbody>
                                {tender?.slice(0, 5).map((tender, index) => (
                                    <tr key={index + 1}>
                                        <td>{index + 1}</td>
                                        <td>{tender.id}</td>
                                        <td>{tender?.projectName}</td>
                                        <td>{tender?.phoneNumber}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='row'>
                        <div className='col-12 text-end'>
                            <button className='btn' onClick={() => handleOpenTender()} style={{ backgroundColor: 'white', color: "#FF8400", height: '20px', padding: '0' }} >View All</button>
                        </div>
                    </div>
                </div>
                <div className='gridrfq-container'>
                    <div className='details' id='grid'>
                        <h3 className='text-center'>Bids Details</h3>
                        <div className='row ms-1'>
                            <table>
                                <tr>
                                    <th>Sr.no</th>
                                    <th>Id</th>
                                    <th>Project Name</th>
                                </tr>
                                <tbody>
                                    {RfqNo?.slice(0, 5).map((rfq, index) => (
                                        <tr key={index + 1}>
                                            <td>{index + 1}</td>
                                            <td>{rfq.id}</td>
                                            <td>{rfq?.purposeOfRfq}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='row'>
                            <div className='col-12 text-end'>
                                <button className='btn' onClick={() => handleOpenBids()} style={{ backgroundColor: 'white', color: "#FF8400", height: '20px', padding: '0' }} >View All</button>
                            </div>
                        </div>
                    </div>
                    <div className='details' id='grid'>
                        <h3 className='text-center mb-1'>User Details</h3>
                        <div className='row ms-1'>
                            <table>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                </tr>
                                <tbody>
                                    {TenderNo?.slice(0, 5).map((tender, index) => (
                                        <tr key={index + 1}>
                                            <td>{index + 1}</td>
                                            <td>{tender.id}</td>
                                            <td>{tender?.purposeOfRfq}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='row'>
                        <div className='col-12 text-end'>
                            <button className='btn' onClick={() => handleOpenUser()} style={{ backgroundColor: 'white', color: "#FF8400", height: '20px', padding: '0' }} >View All</button>
                        </div>
                        </div>
                    </div>


                    {/* /////////////////////view modal////////////////// */}


                    {/* ////////////////////////////rfq view pop modal//////////////////////////////// */}
                    <div>
                        <Modal
                            keepMounted
                            open={openrfq}
                            onClose={handleCloserfq}
                            aria-labelledby="keep-mounted-modal-title"
                            aria-describedby="keep-mounted-modal-description"
                        >
                            <Box sx={style}>
                                <h3 className='mb-2' style={{ marginLeft: '350px', marginTop: '-10px' }}>RFQ List</h3>
                                <div className="my-modal-content1" style={{ display: "flex-relative" }}>


                                    <div className='row mt-5 SI-table' style={{ height: '960px', width: '760px', marginLeft: '0px' }}>
                                        <table className="table">
                                            <thead className='table-header'>
                                                <tr>
                                                    <th>Sr.No</th>
                                                    <th>Name</th>
                                                    <th>User Id</th>
                                                    <th>Email Id</th>
                                                    <th>Phone No.</th>
                                                    <th>Company Name</th>
                                                    <th>Type</th>

                                                </tr>
                                            </thead>
                                            {(
                                                <tbody>
                                                    {Array.isArray(RfqNo) && RfqNo.map((elem, index) => (
                                                        <tr key={index + 1} className='table-row'>
                                                            <td>{index + 1}</td>
                                                            <td>{elem.firstName}</td>
                                                            <td>{elem.id}</td>
                                                            <td>{elem.email}</td>
                                                            <td>{elem.phoneNumber}</td>
                                                            <td>{elem.company}</td>
                                                            <td>{elem.userTypes}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            )}
                                        </table>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <button onClick={handleCloserfq}>Close</button>
                                    </div>
                                </div>
                            </Box>
                        </Modal>
                    </div>
                    {/* ////////////////////////////tender view pop modal//////////////////////////////// */}
                    <div>
                        <Modal
                            keepMounted
                            open={opentender}
                            onClose={handleCloseTender}
                            aria-labelledby="keep-mounted-modal-title"
                            aria-describedby="keep-mounted-modal-description"
                        >
                            <Box sx={style}>
                                <h3 className='mb-2' style={{ marginLeft: '350px', marginTop: '-10px' }}>Tender List</h3>
                                <div className="my-modal-content1" style={{ display: "flex-relative" }}>


                                    <div className='row mt-5 SI-table' style={{ height: '960px', width: '760px', marginLeft: '0px' }}>
                                        <table className="table">
                                            <thead className='table-header'>
                                                <tr>
                                                    <th>T.Id</th>
                                                    <th>Name</th>
                                                    <th>Email Id</th>
                                                    <th>Phone No.</th>
                                                    {/* <th>Company Name</th>
                                                <th>Type</th> */}

                                                </tr>
                                            </thead>
                                            {(
                                                <tbody>
                                                    {Array.isArray(TenderNo) && TenderNo.map((elem, index) => (
                                                        <tr key={index + 1} className='table-row'>
                                                            {/* <td>{index + 1}</td> */}
                                                            <td>{elem.id}</td>

                                                            <td>{elem.purpose}</td>
                                                            <td>{elem.email}</td>
                                                            <td>{elem.phoneNumber}</td>
                                                            {/* <td>{elem.company}</td>
                                                        <td>{elem.userTypes}</td> */}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            )}
                                        </table>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <button onClick={handleCloseTender}>Close</button>
                                    </div>
                                </div>
                            </Box>
                        </Modal>
                    </div>

                    {/* ////////////////////////////Bids view pop modal//////////////////////////////// */}
                    <div>
                        <Modal
                            keepMounted
                            open={openBids}
                            onClose={handleCloseBids}
                            aria-labelledby="keep-mounted-modal-title"
                            aria-describedby="keep-mounted-modal-description"
                        >
                            <Box sx={style}>
                                <h3 className='mb-2' style={{ marginLeft: '350px', marginTop: '-10px' }}>Bids List</h3>
                                <div className="my-modal-content1" style={{ display: "flex-relative" }}>


                                    <div className='row mt-5 SI-table' style={{ height: '960px', width: '760px', marginLeft: '0px' }}>
                                        <table className="table">
                                            <thead className='table-header'>
                                                <tr>
                                                    <th>Sr.No</th>
                                                    <th>Name</th>
                                                    <th>User Id</th>
                                                    <th>Email Id</th>
                                                    <th>Phone No.</th>
                                                    <th>Company Name</th>
                                                    <th>Type</th>

                                                </tr>
                                            </thead>
                                            {(
                                                <tbody>
                                                    {Array.isArray(RfqNo) && RfqNo.map((elem, index) => (
                                                        <tr key={index + 1} className='table-row'>
                                                            <td>{index + 1}</td>
                                                            <td>{elem.firstName}</td>
                                                            <td>{elem.id}</td>
                                                            <td>{elem.email}</td>
                                                            <td>{elem.phoneNumber}</td>
                                                            <td>{elem.company}</td>
                                                            <td>{elem.userTypes}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            )}
                                        </table>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <button onClick={handleCloseBids}>Close</button>
                                    </div>
                                </div>
                            </Box>
                        </Modal>
                    </div>

                    {/* ////////////////////////////User view pop modal//////////////////////////////// */}
                    <div>
                        <Modal
                            keepMounted
                            open={openUser}
                            onClose={handleCloseUser}
                            aria-labelledby="keep-mounted-modal-title"
                            aria-describedby="keep-mounted-modal-description"
                        >
                            <Box sx={style}>
                                <h3 className='mb-2' style={{ marginLeft: '350px', marginTop: '-10px' }}>User List</h3>
                                <div className="my-modal-content1" style={{ display: "flex-relative" }}>


                                    <div className='row mt-5 SI-table' style={{ height: '960px', width: '760px', marginLeft: '0px' }}>
                                        <table className="table">
                                            <thead className='table-header'>
                                                <tr>
                                                    <th>Sr.No</th>
                                                    <th>Name</th>
                                                    <th>User Id</th>
                                                    <th>Email Id</th>
                                                    <th>Phone No.</th>
                                                    <th>Company Name</th>
                                                    <th>Type</th>

                                                </tr>
                                            </thead>
                                            {(
                                                <tbody>
                                                    {Array.isArray(userData) && userData.map((elem, index) => (
                                                        <tr key={index + 1} className='table-row'>
                                                            <td>{index + 1}</td>
                                                            <td>{elem.firstName}</td>
                                                            <td>{elem.id}</td>
                                                            <td>{elem.email}</td>
                                                            <td>{elem.phoneNumber}</td>
                                                            <td>{elem.company}</td>
                                                            <td>{elem.userTypes}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            )}
                                        </table>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <button onClick={handleCloseUser}>Close</button>
                                    </div>
                                </div>
                            </Box>
                        </Modal>
                    </div>

                    {/* /////////////////////view modal ends///////////// */}


                    {/* <card className='mx-10'>
              <img height={200} src='https://www.unboxindustry.com/_next/image?url=https%3A%2F%2Fstrapi.unboxindustry.com%2Fuploads%2FBlack_and_Orange_Modern_Food_Promotion_Instagram_Post_a2555d9fa0_1_1_1_943108e1fb.jpg&w=384&q=75' />
          </card> */}
                </div >
                {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}



                {/* mobile view 2nd block */}

                <div className='secondblock' id="grid2_mobile">
                    <div className='detailsmobile' id="grid2_mobile">
                        <h3 className='text-center mb-1'>RFQ Details</h3>
                        <div className='row ms-1'>
                            <table>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Project Name</th>
                                </tr>
                                {/* <tbody>
                              {BuyerInfo?.slice(0, 5).map((buyer, index) => (
                                  <tr key={index + 1}>
                                      <td>{index + 1}</td>
                                      <td>{buyer.id}</td>
                                      <td>{buyer?.firstName}</td>
                                      <td>{buyer?.phoneNumber}</td>
                                  </tr>
                              ))}
                          </tbody> */}
                            </table>
                        </div>
                        <div className='row'>
                            <div className='col-12 text-end'>
                                <button className='btn' style={{ backgroundColor: 'white', color: "#FF8400", height: '20px', padding: '0' }} >View All</button>
                            </div>
                        </div>
                    </div>
                    <div className='detailsmobile' id="grid2_mobile">
                        <h3 className='text-center mb-1'>Tender Details</h3>
                        <div className='row ms-1'>
                            <table>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Project Name</th>
                                </tr>
                                {/* <tbody>
                              {SellerInfo?.slice(0, 5).map((seller, index) => (
                                  <tr key={index + 1}>
                                      <td>{index + 1}</td>
                                      <td>{seller.id}</td>
                                      <td>{seller?.firstName}</td>
                                      <td>{seller?.phoneNumber}</td>
                                  </tr>
                              ))}
                          </tbody> */}
                            </table>
                        </div>
                        <div className='row'>
                            <div className='col-12 text-end'>
                                <button className='btn' style={{ backgroundColor: 'white', color: "#FF8400", height: '20px', padding: '0' }} >View All</button>
                            </div>
                        </div>
                    </div>
                    {/* <card className='mx-10'>
              <img height={200} src='https://www.unboxindustry.com/_next/image?url=https%3A%2F%2Fstrapi.unboxindustry.com%2Fuploads%2FBlack_and_Orange_Modern_Food_Promotion_Instagram_Post_a2555d9fa0_1_1_1_943108e1fb.jpg&w=384&q=75' />
          </card> */}

                    <div className='detailsmobile' id="grid2_mobile">
                        <h3 className='text-center mb-1'>Bids Details</h3>
                        <div className='row ms-1'>
                            <table>
                                <tr>
                                    <th>Sr.no</th>
                                    <th>RFQ Id</th>
                                    <th>Project Name</th>
                                </tr>
                                {/* <tbody>
                              {SellerInfo?.slice(0, 5).map((seller, index) => (
                                  <tr key={index + 1}>
                                      <td>{index + 1}</td>
                                      <td>{seller.id}</td>
                                      <td>{seller?.firstName}</td>
                                      <td>{seller?.phoneNumber}</td>
                                  </tr>
                              ))}
                          </tbody> */}
                            </table>
                        </div>
                        <div className='row'>
                            <div className='col-12 text-end'>
                                <button className='btn' style={{ backgroundColor: 'white', color: "#FF8400", height: '20px', padding: '0' }} >View All</button>
                            </div>
                        </div>
                    </div><div className='detailsmobile' id="grid2_mobile" >
                        <h3 className='text-center mb-1'>User Details</h3>
                        <div className='row ms-1'>
                            <table>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                </tr>
                                {/* <tbody>
                              {SellerInfo?.slice(0, 5).map((seller, index) => (
                                  <tr key={index + 1}>
                                      <td>{index + 1}</td>
                                      <td>{seller.id}</td>
                                      <td>{seller?.firstName}</td>
                                      <td>{seller?.phoneNumber}</td>
                                  </tr>
                              ))}
                          </tbody> */}
                            </table>
                        </div>
                        <div className='row'>
                            <div className='col-12 text-end'>
                                <button className='btn' style={{ backgroundColor: 'white', color: "#FF8400", height: '20px', padding: '0' }} >View All</button>
                            </div>
                        </div>
                    </div>
                    {/* <card className='mx-10'>
              <img height={200} src='https://www.unboxindustry.com/_next/image?url=https%3A%2F%2Fstrapi.unboxindustry.com%2Fuploads%2FBlack_and_Orange_Modern_Food_Promotion_Instagram_Post_a2555d9fa0_1_1_1_943108e1fb.jpg&w=384&q=75' />
          </card> */}
                </div >
            </div >

            {/* <card className='mx-10'>
              <img height={200} src='https://www.unboxindustry.com/_next/image?url=https%3A%2F%2Fstrapi.unboxindustry.com%2Fuploads%2FBlack_and_Orange_Modern_Food_Promotion_Instagram_Post_a2555d9fa0_1_1_1_943108e1fb.jpg&w=384&q=75' />
          </card> */}

            {/* desktop view of 3rd block */}

            <div className='detailsS' id='last'>
                <h3 className='text-center mb-1'>Purchase Details</h3>
                <div className='row ms-1'>
                    <table>
                        <tr>
                            <th>Date</th>
                            <th>PId</th>
                            <th>Project Name</th>
                        </tr>
                        {/* <tbody>
                      {TenderNo?.slice(0, 5).map((tender, index) => (
                          <tr key={index + 1}>
                              <td>{index + 1}</td>
                              <td>{tender.id}</td>
                              <td>{tender?.purposeOfRfq}</td>
                          </tr>
                      ))}
                  </tbody> */}
                    </table>

                    {/* ///////////////purchase view modal/////////////// */}
                    <div>
                        <Modal
                            keepMounted
                            open={openPurchase}
                            onClose={handleClosePurchase}
                            aria-labelledby="keep-mounted-modal-title"
                            aria-describedby="keep-mounted-modal-description"
                        >
                            <Box sx={style}>
                                <h3 className='mb-2' style={{ marginLeft: '350px', marginTop: '-10px' }}>Purchase List</h3>
                                <div className="my-modal-content1" style={{ display: "flex-relative" }}>


                                    <div className='row mt-5 SI-table' style={{ height: '960px', width: '760px', marginLeft: '0px' }}>
                                        <table className="table">
                                            <thead className='table-header'>
                                                <tr>
                                                    <th>Sr.No</th>
                                                    <th>Name</th>
                                                    <th>User Id</th>
                                                    <th>Email Id</th>
                                                    <th>Phone No.</th>
                                                    <th>Company Name</th>
                                                    <th>Type</th>

                                                </tr>
                                            </thead>
                                            {(
                                                <tbody>
                                                    {Array.isArray(sellers) && sellers.map((elem, index) => (
                                                        <tr key={index + 1} className='table-row'>
                                                            <td>{index + 1}</td>
                                                            <td>{elem.firstName}</td>
                                                            <td>{elem.id}</td>
                                                            <td>{elem.email}</td>
                                                            <td>{elem.phoneNumber}</td>
                                                            <td>{elem.company}</td>
                                                            <td>{elem.userTypes}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            )}
                                        </table>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <button onClick={handleClosePurchase}>Close</button>
                                    </div>
                                </div>
                            </Box>
                        </Modal>
                    </div>

                    {/* /////////////////modal ends////////////////////// */}
                </div>

                <div className='row'>
                    <div className='col-12 text-end'>
                        <button className='btn' onClick={() => handleOpenPurchase()} style={{ backgroundColor: 'white', color: "#FF8400", height: '20px', padding: '0' }} >View All</button>
                    </div>

                </div>
                <div className='details10' id='last'>
                    <div className='details122' id='last' >
                        <div>
                            <Chart
                                chartType="PieChart"
                                data={data11}
                                options={options}
                                width={"0%"}
                                height={"0%"}
                            />
                        </div>
                    </div>
                </div>
                <div className='details20' id='last'>
                    <div className='details133' id='last'>
                        <Chart
                            chartType="PieChart"
                            data={data12}
                            options={options1}
                            width={"0%"}
                            height={"0%"}
                        />
                    </div>
                </div>
            </div>






            {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            {/* mobile view of 3rd block */}
            <div className='secondblock' id='grid2_mobile'>
                <div className='detailsmobile' id='grid2_mobile'>
                    <h3 className='text-center mb-1'>Purchase Details</h3>
                    <div className='row ms-1'>
                        <table>
                            <tr>
                                <th>Date</th>
                                <th>PId</th>
                                <th>Project Name</th>
                            </tr>
                            {/* <tbody>
                          {RfqNo?.slice(0, 5).map((rfq, index) => (
                              <tr key={index + 1}>
                                  <td>{rfq.id}</td>
                                  <td>{rfq?.purposeOfRfq}</td>
                              </tr>
                          ))}
                      </tbody> */}
                        </table>
                        {/* </div> */}
                        <div className='row'>
                            <div className='col-12 text-end'>
                                <button className='btn' style={{ backgroundColor: 'white', color: "#FF8400", height: '15px', padding: '0' }} >View All</button>
                            </div>
                        </div>
                    </div>

                </div >

                {/* <div className='details1' id='grid4_mobile'> */}
                <div className='details12' id='grid4_mobile'>
                    <div>
                        <Chart
                            chartType="PieChart"
                            data={data11}
                            options={options}
                            width={"0%"}
                            height={"0%"}
                        />
                    </div>

                </div>
                {/* </div> */}
                {/* <div className='details2' id='grid4_mobile'> */}
                <div className='details13' id='grid4_mobile' >
                    <Chart
                        chartType="PieChart"
                        data={data12}
                        options={options1}
                        width={"0%"}
                        height={"0%"}
                    />
                </div>
            </div>




        </>
    )
}





export default Dashboard
