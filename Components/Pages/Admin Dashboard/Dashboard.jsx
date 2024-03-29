import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Chart } from "react-google-charts";
import spring_boot_url from '../../../Utils/springApi';
const Dashboard = ({ userDe, activeTab, sellers, buyers }) => {
    const [data1, setdata1] = useState(null);
    const [options, setoptions] = useState(null);
    const [user, setUser] = useState(null);
    const [RfqNo, setRfqNo] = useState(null);
    const [TenderNo, setTendero] = useState(null);
    const [BuyerInfo, setBuyerInfo] = useState(null);
    const [SellerInfo, setSellerInfo] = useState(null);
    const [data, setData] = useState(null);

    ///////////////changes for view all////////////////

    const [buyer, setBuyer] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedUserData, setSelectedUserData] = useState(null);
    const [searchdata, setsearchdata] = useState(true);
    const [opentender, setopentender] = useState(null);
    const [openseller, setopenseller] = useState(null);
    const [openrfq, setopenrfq] = useState(null);
    const [openPurchase, setopenPurchase] = useState(null);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [showDetails, setShowDetails] = useState(true);
    const [userData, setUserData] = useState(null);
    const [searchQuery, setSearchQuery] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('All');
    const searchRef = useRef(null);

    const allUsers = () => {
        axios.get(`${spring_boot_url}api/adminuser/allusers`)
            .then(resp => {
                setUserData(resp.data);
            });
    }

    const allbuyer = () => {
        axios.get(`${spring_boot_url}api/adminuser/search?query=buyer`)
            .then(resp => {
                setUserData(resp.data);
            });
    }
    const allseller = () => {
        axios.get(`${spring_boot_url}api/adminuser/search?query=seller`)
            .then(resp => {
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
        setopenrfq(true);
    };

    const handleClosePurchase = () => {
        setopenrfq(false);
    };

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

    const handleSearchChange = (e) => {
        // Clear searchdata if the input is empty
        if (e.target.value.trim() === '') {
            setsearchdata(null);
        } else {
            // const query = e.target.value;
            setSearchQuery(e.target.value);
            searchSi()
        }
    };
    const searchSi = (e) => {
        axios.get(`${spring_boot_url}api/adminuser/search?query=${searchQuery}`)
            .then(resp => {
                setsearchdata(resp.data);
            });
    };

    useEffect(() => {
        const savedOption = localStorage.getItem('selectedOption');
        if (savedOption) {
            setSelectedOption(savedOption);
        }
        // allUsers();
        allbuyer();
    }, []);
    ////////////////////////changes end////////////////////////////
    const handleRFQ = () => {
        return (
            <div className={`${activeTab === '0' ? 'active' : ''}`} tabId={0}></div>
        )
    }
    ///////////////////////////////get all tender and rfq details //////////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        axios.get(`${spring_boot_url}api/userRfq`)
            .then(resp => {
                setRfqNo(resp.data);
            });
    }, []);
    useEffect(() => {
        axios.get(`${spring_boot_url}api/tender`)
            .then(resp => {
                setTendero(resp.data);
            });
    }, []);
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////// pie chart code//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const data11 = [
        ["RFQs", "Tenders"],
        ["RFQs", RfqNo?.length],
        ["Tenders", TenderNo?.length],
    ];
    const rfqtender = {
        title: "RFQS & Tender",
        sliceVisibilityThreshold: 0.6, // 20%
        colors: ['#ff8400', '#5f5f5f'],
    };
    const data12 = [
        ["Sellers", "Buyers"],
        ["Sellers", sellers?.length],
        ["Buyers", buyers?.length],
    ];
    const options1 = {
        title: "Users",
        sliceVisibilityThreshold: 0.2, // 20%
        colors: ['#ff8400', '#5f5f5f'],
    };

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   

    return (
        <>
            <div>
                <h4>Hi.{userDe?.firstName}</h4>
                <p>Welcome to your dashboard</p>
            </div>
            {/* desktop view upper block */}
            <div className='grid-container sm-6' id="upper">
                <div className=' grid-item '>
                    <div >
                        <h5 className='rfq-text'> RFQs</h5>
                        <p className='rfq-text' style={{ fontSize: '50px', marginTop: '38px', color: '#015867' }}>{RfqNo?.length}</p>
                    </div>
                </div>
                <div className=' grid-item'>
                    <h5 className='rfq-text'>Sellers</h5>
                    <p className='rfq-text' style={{ fontSize: '50px', marginTop: '38px', color: '#015867' }}>{sellers?.length}</p>
                </div>
                <div className=' grid-item'>
                    <h5 className='rfq-text'>Buyers</h5>
                    <p className='rfq-text' style={{ fontSize: '50px', marginTop: '38px', color: '#015867' }}>{buyers?.length}</p>
                </div>
                <div className=' grid-item'>
                    <h5 className='rfq-text'>Tenders</h5>
                    <p className='rfq-text' style={{ fontSize: '50px', marginTop: '38px', color: '#015867' }}>{TenderNo?.length}</p>
                </div>
                <div className=' grid-item'>
                    <h5 className='rfq-text'>Purchase</h5>
                    <p className='rfq-text' style={{ fontSize: '50px', marginTop: '38px', color: '#015867' }}>0</p>
                </div>
            </div >
            {/* mobile view view upper block */}
            <div className='upperblock' id="grid1_mobile">
                <div className=' grid-itemmobile ' style={{ borderSpacing: "1px" }}>
                    <div >
                        <h5 className='rfq-textmobile'> RFQs</h5>
                        <p className='rfq-textmobile' style={{ fontSize: '30px', marginTop: '14px', color: '#015867' }}>{RfqNo?.length}</p>
                    </div>
                </div>
                <div className=' grid-itemmobile'>
                    <h5 className='rfq-textmobile'>Sellers</h5>
                    <p className='rfq-textmobile' style={{ fontSize: '30px', marginTop: '14px', color: '#015867' }}>{sellers?.length}</p>
                </div>
                <div className=' grid-itemmobile'>
                    <h5 className='rfq-textmobile'>Buyers</h5>
                    <p className='rfq-textmobile' style={{ fontSize: '3    0px', marginTop: '14px', color: '#015867' }}>{buyers?.length}</p>
                </div>
                <div className=' grid-itemmobile'>
                    <h5 className='rfq-textmobile'>Tenders</h5>
                    <p className='rfq-textmobile' style={{ fontSize: '30px', marginTop: '14px', color: '#015867' }}>{TenderNo?.length}</p>
                </div>
                <div className=' grid-itemmobile'>
                    <h5 className='rfq-textmobile'>Purchase</h5>
                    <p className='rfq-textmobile' style={{ fontSize: '30px', marginTop: '14px', color: '#015867' }}>0</p>
                </div>
            </div >
            {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/* desktop view 2nd block */}

            <div className='gridrfq-container' id="grid1">
                <div className='details' id='grid'>
                    <h3 className='text-center mb-1'>Buyer Details</h3>
                    <div className='row ms-1'>
                        <table>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Phone</th>
                            </tr>
                            <tbody>
                                {buyers?.slice(0, 5).map((buyer, index) => (
                                    <tr key={index + 1}>
                                        <td>{index + 1}</td>
                                        <td>{buyer.id}</td>
                                        <td>{buyer?.firstName}</td>
                                        <td>{buyer?.phoneNumber}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>




                        {/* //////////////////////////////////////////////buyer-view pop modal////////////// */}
                        <div>
                            <Modal
                                keepMounted
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="keep-mounted-modal-title"
                                aria-describedby="keep-mounted-modal-description"
                            >
                                <Box sx={style}>
                                    <h3 className='mb-2' style={{ marginLeft: '350px', marginTop: '-10px' }}>Buyer List</h3>
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
                                                        {buyers?.map((buyer, index) => (
                                                            <tr key={index + 1}>
                                                                {/* <td>{index + 1}</td> */}
                                                                <td>{buyer.id}</td>
                                                                <td>{buyer?.firstName}</td>
                                                                <td>{buyer?.phoneNumber}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                )}
                                            </table>
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <button onClick={handleClose}>Close</button>
                                        </div>
                                    </div>
                                </Box>
                            </Modal>

                        </div>

                    </div>
                    <div className='row'>
                        <div className='col-12 text-end'>
                            <button className='btn' onClick={() => handleOpen()} style={{ backgroundColor: 'white', color: "#FF8400", height: '20px', padding: '0' }} >View All</button>
                        </div>
                    </div>
                </div>


                <div className='details' id='grid'>
                    <h3 className='text-center mb-1'>Seller Details</h3>
                    <div className='row ms-1'>
                        <table>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Phone</th>
                            </tr>
                            <tbody>
                                {sellers?.slice(0, 5).map((seller, index) => (
                                    <tr key={index + 1}>
                                        <td>{index + 1}</td>
                                        <td>{seller.id}</td>
                                        <td>{seller?.firstName}</td>
                                        <td>{seller?.phoneNumber}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>



                        {/* //////////////////////////////////////////////seller-view pop modal////////////// */}
                        <div>
                            <Modal
                                keepMounted
                                open={openseller}
                                onClose={handleCloseseller}
                                aria-labelledby="keep-mounted-modal-title"
                                aria-describedby="keep-mounted-modal-description"
                            >
                                <Box sx={style}>
                                    <h3 className='mb-2' style={{ marginLeft: '350px', marginTop: '-10px' }}>Seller List</h3>
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
                                            <button onClick={handleCloseseller}>Close</button>
                                        </div>
                                    </div>
                                </Box>
                            </Modal>

                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 text-end'>
                            <button className='btn' onClick={() => handleOpenseller()} style={{ backgroundColor: 'white', color: "#FF8400", height: '20px', padding: '0' }} >View All</button>
                        </div>
                    </div>
                </div>
                <div className='gridrfq-container'>
                    <div className='details' id='grid'>
                        <h3 className='text-center'>RFQ Details</h3>
                        <div className='row ms-1'>
                            <table>
                                <tr>
                                    <th>Sr.no</th>
                                    <th>RFQ Id</th>
                                    <th>Project Name</th>
                                </tr>
                                <tbody>
                                    {RfqNo?.slice(0, 5).map((rfq, index) => (
                                        <tr key={index + 1}>
                                            <td>{index + 1}</td>
                                            <td>{rfq.id}</td>
                                            <td>{rfq?.projectName}</td>
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
                                    <h3 className='mb-2' style={{ marginLeft: '350px', marginTop: '-10px' }}>Rfq List</h3>
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
                    </div>
                    <div className='details' id='grid'>
                        <h3 className='text-center mb-1'>Tender Details</h3>
                        <div className='row ms-1'>
                            <table>
                                <tr>
                                    <th>Date</th>
                                    <th>TId</th>
                                    <th>Project Name</th>
                                </tr>
                                <tbody>
                                    {TenderNo?.slice(0, 5).map((tender, index) => (
                                        <tr key={index + 1}>
                                            <td>{index + 1}</td>
                                            <td>{tender.id}</td>
                                            <td>{tender?.purpose}</td>
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

                </div >

                {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

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
                {/* /////////////////////view modal ends///////////////// */}

                {/* mobile view 2nd block */}
                <div className='secondblock' id="grid2_mobile">
                    <div className='detailsmobile' id="grid2_mobile">
                        <h3 className='text-center mb-1'>Buyer Details</h3>
                        <div className='row ms-1'>
                            <table>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                </tr>
                                <tbody>
                                    {buyers?.slice(0, 5).map((buyer, index) => (
                                        <tr key={index + 1}>
                                            <td>{index + 1}</td>
                                            <td>{buyer.id}</td>
                                            <td>{buyer?.firstName}</td>
                                            <td>{buyer?.phoneNumber}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* //////////////////////mobile buyer view modal //////////////// */}
                            <div>
                            <Modal
                                keepMounted
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="keep-mounted-modal-title"
                                aria-describedby="keep-mounted-modal-description"
                            >
                                <Box sx={style}>
                                    <h3 className='mb-2' style={{ marginLeft: '350px', marginTop: '-10px' }}>Buyer List</h3>
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
                                                        {buyers?.map((buyer, index) => (
                                                            <tr key={index + 1}>
                                                                {/* <td>{index + 1}</td> */}
                                                                <td>{buyer.id}</td>
                                                                <td>{buyer?.firstName}</td>
                                                                <td>{buyer?.phoneNumber}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                )}
                                            </table>
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <button onClick={handleClose}>Close</button>
                                        </div>
                                    </div>
                                </Box>
                            </Modal>
                        </div>
                        {/* //////////////////ends////////////////////////////// */}


                        </div>
                        <div className='row'>
                            <div className='col-12 text-end'>
                                <button className='btn' onClick={() => handleOpen()} style={{ backgroundColor: 'white', color: "#FF8400", height: '20px', padding: '0' }} >View All</button>
                            </div>
                        </div>
                    </div>

                    <div className='detailsmobile' id="grid2_mobile">
                        <h3 className='text-center mb-1'>Seller Details</h3>
                        <div className='row ms-1'>
                            <table>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                </tr>
                                <tbody>
                                    {sellers?.slice(0, 5).map((seller, index) => (
                                        <tr key={index + 1}>
                                            <td>{index + 1}</td>
                                            <td>{seller.id}</td>
                                            <td>{seller?.firstName}</td>
                                            <td>{seller?.phoneNumber}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='row'>
                            <div className='col-12 text-end'>
                                <button className='btn' style={{ backgroundColor: 'white', color: "#FF8400", height: '20px', padding: '0' }} >View All</button>
                            </div>
                        </div>
                    </div>
                    <div className='detailsmobile' id="grid2_mobile">
                        <h3 className='text-center mb-1'>RFQ Details</h3>
                        <div className='row ms-1'>
                            <table>
                                <tr>
                                    <th>Sr.no</th>
                                    <th>RFQ Id</th>
                                    <th>Project Name</th>
                                </tr>
                                <tbody>
                                    {RfqNo?.slice(0, 5).map((RfqNo, index) => (
                                        <tr key={index + 1}>
                                            <td>{index + 1}</td>
                                            <td>{RfqNo.id}</td>
                                            <td>{RfqNo?.firstName}</td>
                                            <td>{RfqNo?.phoneNumber}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='row'>
                            <div className='col-12 text-end'>
                                <button className='btn' style={{ backgroundColor: 'white', color: "#FF8400", height: '20px', padding: '0' }} >View All</button>
                            </div>
                        </div>
                    </div><div className='detailsmobile' id="grid2_mobile" >
                        <h3 className='text-center mb-1'>Tender Details</h3>
                        <div className='row ms-1'>
                            <table>
                                <tr>
                                    <th>Date</th>
                                    <th>TId</th>
                                    <th>Project Name</th>
                                </tr>
                                {/* <tbody>
                                    {sellers?.slice(0, 5).map((seller, index) => (
                                        <tr key={index + 1}>
                                            <td>{index + 1}</td>
                                            <td>{seller.id}</td>
                                            <td>{seller?.firstName}</td>
                                            <td>{seller?.phoneNumber}</td>
                                        </tr>
                                    ))}
                                </tbody> */}
                                <tbody>
                                {TenderNo?.slice(0, 5).map((tender, index) => (
                                <tr key={index + 1}>
                                    <td>{index + 1}</td>
                                    <td>{tender.id}</td>
                                    <td>{tender?.projectName}</td>
                                </tr>
                            ))}
                        </tbody>
                            </table>
                        </div>
                        <div className='row'>
                            <div className='col-12 text-end'>
                                <button className='btn' style={{ backgroundColor: 'white', color: "#FF8400", height: '20px', padding: '0' }} >View All</button>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
            {/* desktop view of 3rd block */}
            <div className='detailsP' id='last'>
                <h3 className='text-center mb-1'>Purchase Details</h3>
                <div className='row ms-1'>
                    <table>
                        <tr>
                            <th>Date</th>
                            <th>PId</th>
                            <th>Project Name</th>
                        </tr>
                         <tbody>
                            {TenderNo?.slice(0, 5).map((tender, index) => (
                                <tr key={index + 1}>
                                    <td>{index + 1}</td>
                                    <td>{tender.id}</td>
                                    <td>{tender?.projectName}</td>
                                </tr>
                            ))}
                        </tbody> 
                    </table>
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
                </div>
                <div className='row'>
                <div className='col-12 text-end'>
                                <button className='btn' onClick={() => handleOpenPurchase()} style={{ backgroundColor: 'white', color: "#FF8400", height: '20px', padding: '0' }} >View All</button>
                            </div>
                </div>
                <div className='details1' id='last'>
                    <div className='details12' id='last' >
                        <div>
                            <Chart
                                chartType="PieChart"
                                data={data11}
                                options={rfqtender}
                                width={"0%"}
                                height={"0%"}
                            />
                        </div>
                    </div>
                </div>
                <div className='details2' id='last'>
                    <div className='details13' id='last'>
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
                            <tbody>
                                {RfqNo?.slice(0, 5).map((rfq, index) => (
                                    <tr key={index + 1}>
                                        {/* <td>{index + 1}</td> */}
                                        <td>{rfq.id}</td>
                                        <td>{rfq?.projectName}</td>
                                    </tr>
                                ))}
                            </tbody>
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
                            options={rfqtender}
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




