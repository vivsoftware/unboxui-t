import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import spring_boot_url from '../../../Utils/springApi';
import BidView from './bidView';


////////////changes/////////




const TenderContain = ({ rfq, userDe }) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [RFQDe, setRFQDe] = useState(true);
    const [searchdata, setsearchdata] = useState(true);
    const [searchRFQdata, setsearchRFQdata] = useState(true);
    const [searchQuery, setSearchQuery] = useState(true);
    const [searchRFQQuery, setSearchRFQQuery] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('All');
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedUserData, setSelectedUserData] = useState(null);
    const [showRFQ, setShowRFQ] = useState(true);
    const [showUsers, setShowUsers] = useState(true);
    const [showSearchCard, setShowSearchCard] = useState(false);
    const [showBid, setShowBid] = useState(false);
    const [nextButton, setNextButton] = useState(false);
    const searchRef = useRef(null);
    const [tender, settender] = useState(null);
    const filteredrfq = userDe?.id

    useEffect(() => {
        const filteredrf = userDe?.id
        setShowDetails(false);

        axios.get(`${spring_boot_url}api/tender`)
            .then(resp => {
                // Filter out items where userId is 1
                const filteredTender = resp.data.filter(item => item.userId !== filteredrf );
                settender(filteredTender);
            })
            .catch(error => {
                console.error('Error fetching user RFQ data:', error);
            });
    }, []); // Ensure useEffect runs only once on mount

    // const BidContain = () => {
    const [showMessage, setShowMessage] = useState(true);
    const [showMobile, setShowMobile] = useState(true);
    const [isBid, setCreateBid] = useState(false);
    const [allBids, setAllBids] = useState(false)
    const [BidTender, setBidTender] = useState(false)

    const handleLead = () => {
        setShowMessage(false);
    }
    const handleMobileLead = () => {
        setShowMobile(false);
    }
    const handleBack = () => {
        setShowMessage(true);
    }
    const handleBidProcess = () => {
        setCreateBid(true);
        setAllBids(false);
    }
    const handleBidList = () => {
        setAllBids(true);
        setCreateBid(false)
    }

    ////////////changes/////////


    const handleOpen = (elem) => {
        setShowDetails(true);
        // setOpen(true);
        setBidTender(elem);
    }
    ///////////////////////

    const handleClickOutside = (e) => {
        if (searchRef.current && !searchRef.current.contains(e.target)) {
            // Clicked outside the search card, close it
            setShowSearchCard(false);
        }
    };

    useEffect(() => {
        setShowDetails(false)
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const savedOption = localStorage.getItem('selectedOption');
        if (savedOption) {
            setSelectedOption(savedOption);
        }
    }, []);

    const openModal = (userData) => {
        setSelectedUserData(userData);
        setModalOpen(true);
    };

    const toggleFilterDropdown = () => {
        setIsOpen(!isOpen);
    };


    const handleFilterOptionClick = (option) => {
        setSelectedOption(option);
        localStorage.setItem('selectedOption', option);

        switch (option) {
            case 'Seller':
                seller();
                break;
            case 'Buyer':
                buyer();
                break;
            case 'Service Provider':
                serviceProvider();
                break;
            default:
                allUsers();
                break;
        }
        setIsOpen(false);
    };



    const handleCreateTender = () => {
        setShowDetails(false);
    }
    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const handleOptionClick = (option) => {
        console.log(`Option clicked: ${option}`);
        setDropdownVisible(false);
    };

    const handleBackToDetails = () => {
        setShowDetails(true);
    };
    const openRFQDropdown = () => {
        setShowRFQ(!showRFQ);
    }
    const openUsersDropdown = () => {
        setShowUsers(!showUsers);
    }


    const handleSearchChange = (e) => {
        // Clear searchdata if the input is empty
        if (e.target.value.trim() === '') {
            setsearchdata(null);
        } else {
            // const query = e.target.value;
            setSearchQuery(e.target.value);
            searchSi();
        }
    };
    const handleSearchRFQChange = (e) => {
        // Clear searchdata if the input is empty
        if (e.target.value.trim() === '') {
            setsearchRFQdata(null);
        } else {
            // const query = e.target.value;
            setSearchRFQQuery(e.target.value);
            searchRFQ();
        }
    };
    const searchRFQ = (e) => {
        axios.get(`${spring_boot_url}api/userRfq/search?query=${searchQuery}`)
            .then(resp => {
                console.log(resp.data.json);
                setsearchRFQdata(resp.data);
            });
    };


    const searchSi = (e) => {
        axios.get(`${spring_boot_url}api/adminuser/search?query=${searchQuery}`)
            .then(resp => {
                console.log(resp.data.json);
                setsearchdata(resp.data);
            });

    };
    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleViewDetailsClick = (elem) => {
        openModal(elem);
        setsearchdata(null);
    };
    const handleViewRFQDetailsClick = (userData) => {
        openModal(userData);
        setsearchRFQdata(null);
    };



    const formatDate = (dateString) => {
        const originalDate = new Date(dateString);
        const day = originalDate.getDate();
        const month = originalDate.getMonth() + 1; // Months are zero-indexed, so add 1
        const year = originalDate.getFullYear() % 100; // Getting last two digits of the year

        // Padding single digits with a leading zero
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedYear = year < 10 ? `0${year}` : year;

        return `${formattedDay}-${formattedMonth}-${formattedYear}`;
    };

    const handleBidClick = () => {
        setShowBid(!showBid);
    }
    const handleNextButton = () => {
        (!nextsetNextButtonButton);
    }

    return (
        <>
            {showDetails ? <BidView userDe={userDe} BidTender={BidTender} /> : (
                <>
                    <div className='d-none d-xl-block d-md-block d-sm-none'>
                        <div className=' RFQ-card'>
                            <div className='container'>
                                <div className='row mt-5'>
                                </div>
                                <div className='row mt-5 SI-table'>
                                    <h2 className='mb-2'>Tender List</h2>
                                    <table className="table">
                                        <thead className='table-header'>
                                            <tr>
                                                <th>T.Id</th>
                                                <th>Tender Name</th>
                                                <th>Tender Create Date</th>
                                                <th>Tender Closing Date</th>
                                                <th>View</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array.isArray(tender) && tender.map((elem, index) => (
                                                <tr key={index + 1} className='table-row'>
                                                    <td>{elem.id}</td>
                                                    <td>{elem.projectName}</td>
                                                    <td>{formatDate(elem.createdAt)}</td>
                                                    <td>{elem.tenderClosingDate}</td>
                                                    <td>
                                                        <button className="option-button"  onClick={() => handleOpen(elem)} >
                                                            <FaEye />
                                                        </button>
                                                    </td>
                                                    <td>{elem.status}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='d-block d-xl-none d-md-none d-sm-block'>
                        <div className=' RFQ-card'>
                            <div className='container-fluid'>
                                <div className='row mt-5'>
                                    {/* <div className='col-5'>
                      <button className='btn register-btn' onClick={handleCreateTender} >Create Tender</button>
                    </div> */}
                                    {/* <div className='col-6'>
                      <input type="search" className="form-control" placeholder="Search Tender ..." aria-label="Search" style={{ height: '40px', border: "1px solid #ddd", borderRadius: '8px' }} />
                    </div> */}
                                </div>
                                <div className='row mt-5 SI-table'>
                                    <h2 className='mb-2'>Bid List</h2>
                                    <div className='col-12'>
                                        <div className='RFQ-Card' >
                                            <div className='container'>
                                                <div className='row'>
                                                    <div className='col-10'>
                                                        <h5>RFQ Name : </h5>
                                                        <p className='mt-1'>Tender Create Date : </p>
                                                        <p>Status : </p>
                                                        <p>No. of Bids : </p>
                                                    </div>
                                                    <div className='col-2'>
                                                    <button className="option-button"  onClick={() => handleOpen(elem)} >
                                                            <FaEye />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default TenderContain;
///////////////changes start///////////




////////////////changes end///////

// const renderNewComponent = () => {
//     return (
//         <>
//             {nextButton ? <TenderNextStep /> : (
//                 <>
//                     <div className='d-none d-xl-block d-md-block d-sm-none'>
//                         <div className='fluid-container'>
//                             <div className='row'>
//                                 <div className='col-12'>
//                                     <h2 className='mb-2 mt-2'>RFQ List</h2>
//                                     <div className='row mt-2'>
//                                         <input
//                                             type="search"
//                                             className="form-control otp-phone"
//                                             placeholder="Search RFQ ..."
//                                             aria-label="Search"
//                                             style={{ height: '40px', border: "1px solid #ddd", borderRadius: '8px' }}
//                                             onChange={handleSearchRFQChange}
//                                         />
//                                         {searchRFQdata && searchRFQdata.length === 0 && (
//                                             <p style={{ color: 'red' }}>No RFQ found.</p>
//                                         )}
//                                         {searchRFQdata && searchRFQdata.length > 0 && (
//                                             <div className='user-searchCard'>
//                                                 {searchRFQdata.map((elem, index) => (
//                                                     <div className='user-search' key={index}>
//                                                         <p onClick={() => handleViewRFQDetailsClick(elem)}>{elem.productName}</p>
//                                                         <hr></hr>
//                                                     </div>

//                                                 ))}
//                                             </div>
//                                         )}
//                                     </div>
//                                     <div className='row mt-2  SI-table'>
//                                         {searchRFQdata?.length > 0 ? (
//                                             <>
//                                                 <div className='RFQ-Card'>
//                                                     {searchRFQdata.map((elem, index) => (
//                                                         <div className='RFQ-Card' key={index}>
//                                                             <div className='container'>
//                                                                 <div className='row'>
//                                                                     <div className='col-10'>
//                                                                         <input type='checkbox' />
//                                                                         <h5>Project Name : {elem.productName}</h5>
//                                                                         <p>RFQ Create Date : {formatDate(elem.createdAt)}</p>
//                                                                         <p>Created By : {elem.createdBy}</p>
//                                                                         <h5>Status : {elem.status}</h5>
//                                                                     </div>
//                                                                     <div className='col-2'>
//                                                                         <button className="option-button" onClick={() => handleViewRFQDetailsClick(elem)}>
//                                                                             <FaEye />
//                                                                         </button>
//                                                                     </div>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     ))}
//                                                 </div>
//                                             </>
//                                         ) :
//                                             (
//                                                 <>
//                                                     {Array.isArray(RFQDe) && RFQDe.map((elem, index) =>
//                                                         <div className='RFQ-Card' key={index}>
//                                                             <div className='container'>
//                                                                 <div className='row'>
//                                                                     <div className='col-10'>
//                                                                         <input type='checkbox' />
//                                                                         <h5>Project Name : {elem.productName}</h5>
//                                                                         <p>RFQ Create Date : {formatDate(elem.createdAt)}</p>
//                                                                         <p>Created By : {elem.createdBy}</p>
//                                                                         <h5>Status : {elem.status}</h5>
//                                                                     </div>
//                                                                     <div className='col-2'>
//                                                                         <button className="option-button" onClick={() => handleViewRFQDetailsClick(elem)}>
//                                                                             <FaEye />
//                                                                         </button>
//                                                                     </div>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     )}
//                                                 </>
//                                             )}

//                                     </div>

//                                 </div>
//                             </div>
//                             <div className='row mt-2'>
//                                 <div className='col-10'></div>
//                                 <div className='col-1'>
//                                     <button className='btn back-btn' onClick={handleBackToDetails}>
//                                         Back
//                                     </button>
//                                 </div>
//                                 <div className='col-1'>
//                                     <button className='btn back-btn' onClick={handleNextButton}>
//                                         Next
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className='d-block d-xl-none d-md-none d-sm-block'>
//                         <div className='container-fluid'>
//                             <h2 className='mb-2 mt-2'>RFQ List</h2>
//                             <div className='row mt-2'>
//                                 <div className='col-11'>
//                                     <input
//                                         type="search"
//                                         className="form-control otp-phone"
//                                         placeholder="Search RFQ ..."
//                                         aria-label="Search"
//                                         style={{ height: '40px', border: "1px solid #ddd", borderRadius: '8px' }}
//                                         onChange={handleSearchRFQChange}
//                                     />
//                                     {searchRFQdata && searchRFQdata.length === 0 && (
//                                         <p style={{ color: 'red' }}>No RFQ found.</p>
//                                     )}
//                                     {searchRFQdata && searchRFQdata.length > 0 && (
//                                         <div className='user-searchCard'>
//                                             {searchRFQdata.map((elem, index) => (
//                                                 <div className='user-search' key={index}>
//                                                     <p onClick={() => handleViewRFQDetailsClick(elem)}>{elem.productName}</p>
//                                                     <hr></hr>
//                                                 </div>

//                                             ))}
//                                         </div>
//                                     )}
//                                 </div>
//                                 <div className='row'>

//                                     <div className='mobile-userCard'>
//                                         {searchRFQdata?.length > 0 ? (
//                                             <>
//                                                 <div className='RFQ-Card'>
//                                                     {searchRFQdata.map((elem, index) => (
//                                                         <div className='RFQ-Card' key={index}>
//                                                             <div className='container'>
//                                                                 <div className='row'>
//                                                                     <div className='col-10'>
//                                                                         <input type='checkbox' />
//                                                                         <h5>Project Name : {elem.productName}</h5>
//                                                                         <p>RFQ Create Date : {elem.createdAt}</p>
//                                                                         <p>Created By : {elem.createdBy}</p>
//                                                                         <h5>Status : {elem.status}</h5>
//                                                                     </div>
//                                                                     <div className='col-2'>
//                                                                         <button className="option-button" onClick={() => handleViewRFQDetailsClick(elem)}>
//                                                                             <FaEye />
//                                                                         </button>
//                                                                     </div>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     ))}
//                                                 </div>
//                                             </>
//                                         ) :
//                                             (
//                                                 <>
//                                                     {Array.isArray(RFQDe) && RFQDe.map((elem, index) =>
//                                                         <div className='RFQ-Card' key={index}>
//                                                             <div className='container'>
//                                                                 <div className='row'>
//                                                                     <div className='col-10'>
//                                                                         <input type='checkbox' />
//                                                                         <h5>Project Name : {elem.productName}</h5>
//                                                                         <p>RFQ Create Date : {formatDate(elem.createdAt)}</p>
//                                                                         <p>Created By : {elem.createdBy}</p>
//                                                                         <h5>Status : {elem.status}</h5>
//                                                                     </div>
//                                                                     <div className='col-2'>
//                                                                         <button className="option-button" onClick={() => handleViewRFQDetailsClick(elem)}>
//                                                                             <FaEye />
//                                                                         </button>
//                                                                     </div>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     )}
//                                                 </>
//                                             )}
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className='row mt-5'>

//                                 <div className='col-6'>
//                                     <button className='btn back-btn' onClick={handleBackToDetails}>
//                                         Back
//                                     </button>
//                                 </div>
//                                 <div className='col-6'>
//                                     <button className='btn back-btn' disabled onClick={handleBackToDetails}>
//                                         Send
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </>
//             )}

//         </>
//     )
// }








// import React, { useEffect,useState } from 'react'
// import { useDispatch } from 'react-redux';
// import { FaPlus, FaMinus, FaEye } from 'react-icons/fa';
// import { Input } from 'reactstrap';
// import axios from 'axios';
// import spring_boot_url from '../../../Utils/springApi';
// import Link from 'next/link';
// import { useRef } from 'react';
// import ModalComponent from '../Admin Dashboard/ModalComponent';
// // import BidContain from './BidContain';
// import TenderNextStep from './TenderNextStep';
// import DashboardLoader from '../../Element/DashboardLoader';
// import SellerDashboard from './SellerDashboard';
// import { RiDeleteBinLine } from 'react-icons/ri';
// import SellerBid from './SellerBid';

// const BidContain = () => {
//     const [showMessage, setShowMessage] = useState(true);
//     const [showMobile, setShowMobile] = useState(true);
//     const [isBid, setCreateBid] = useState(false);
//     const [allBids, setAllBids] = useState(false)

//     const handleLead = () => {
//         setShowMessage(false);
//     }
//     const handleMobileLead = () => {
//         setShowMobile(false);
//     }
//     const handleBack = () => {
//         setShowMessage(true);
//     }
//     const handleBidProcess = () => {
//         setCreateBid(true);
//         setAllBids(false);
//     }
//     const handleBidList = () => {
//         setAllBids(true);
//         setCreateBid(false)
//     }

//     const renderMessage = () => {
//         return (
//             <>

//                 <div className='container message-display'>
//                     <div className='row mb-2'>
//                         <button className='btn back-btn' onClick={handleBack}>Back</button>
//                     </div>
//                     <div className='row mt-2'>
//                         <div className='col-6'>
//                             <h2 className='fw-normal'>Mr. Sharma</h2>
//                             <h4>Unbox Industry</h4>
//                         </div>
//                         <div className='col-6 text-end'>
//                             <h4>Member Since</h4>
//                             <h6>Jul, 2020</h6>
//                         </div>
//                         <hr></hr>
//                     </div>
//                     <div className='row'>
//                         <p>Dear Mr. Sharma, <br></br><br></br>

//                             I have been introduced to your company by Unbox Industry. I am looking for Robot Humanoid Teacher.<br></br><br></br>

//                             Below are the requirement details : <br></br>
//                             Probable Requirement Type : Business Use<br></br>
//                             Weight : 50 kg<br></br>
//                             Model Name/Number : Robot Humanoid Teacher<br></br><br></br>

//                             Products enquired by the buyer :<br></br>
//                             Human Robot₹ 50,000 / Unit<br></br>
//                             Robot Humanoid Teacher₹ 1.99 Lakh / Piece<br></br>
//                             ROBOT FOR JEWELLERS₹ 1.95 Lakh / Piece<br></br>
//                             Humanoid Robot 17 Dof₹ 10,500 / Set<br></br>
//                             Human Intelligent Robot₹ 4 Lakh / Piece<br></br><br></br>

//                             My Requirement is for Robot Humanoid Teacher. Kindly send me price and other details.</p>
//                         <hr></hr>
//                     </div>
//                     <div className='row'>
//                         <div className='col-8'>
//                             <h5 className='mb-2'>Attached Documents:</h5>
//                             <p> <img src='/RFQ icon.svg' /> RFQ</p>
//                             <p> <img src='/image.svg' /> Image/Video</p>
//                             <p> <img src='/Pdf.svg' /> Pdf</p>
//                         </div>
//                     </div>
//                     <div className='row mb-2'>
//                         <button className='btn back-btn' onClick={handleBidProcess}>Bid</button>
//                     </div>
//                 </div>

//             </>
//         )
//     }
//     const noMessage = () => {
//         return (
//             <>
//                 <div className='full-message'>
//                     <img src='/emptyMessage.svg' />
//                     <p className='text-center'>Select an item to read <br></br> Nothing is selected</p>
//                 </div>
//             </>
//         )
//     }
//     const inboxMessage = () => {
//         return (
//             <>
//                 <div className=''>
//                     <div className='row'>
//                         <div className='col-12  inbox-message'>
//                             <div className='container'>
//                                 <div className='row mt-2'>
//                                     <div className='col-8'>
//                                         <h5>All Bids(1200)</h5>
//                                     </div>
//                                     <div className='col-4 text-end'>
//                                         <h5>Unread(200)</h5>
//                                     </div>
//                                     <hr></hr>
//                                 </div>

//                                 <div className='row day-card'>
//                                     <p>Today</p>
//                                 </div>
//                                 <div className='row'>
//                                     <div className='message-card' onClick={handleLead}>
//                                         <div className='row'>
//                                             <div className='col-3 mt-1'>
//                                                 <img src='/BidUser.svg' className='lead-profile' />
//                                             </div>
//                                             <div className='col-7'>
//                                                 <h4>Mr. Sharma</h4>
//                                                 <h6>Enquiry</h6>
//                                                 <p className='mt-1' style={{
//                                                     fontSize: '12px',
//                                                     overflow: 'hidden',
//                                                     textOverflow: 'ellipsis',
//                                                     whiteSpace: 'nowrap',
//                                                     maxWidth: '100%', // Optional, adjust as needed
//                                                 }}>
//                                                     Want to know about the epson's products pricing.Want to know about the epson's products pricing.Want to know about the epson's products pricing.Want to know about the epson's products pricing.
//                                                 </p>                </div>
//                                             <div className='col-2'>
//                                                 <RiDeleteBinLine />
//                                             </div>
//                                         </div>
//                                         <div className='row'>
//                                             <p className='text-end' style={{ fontSize: '12px' }}>30 mins ago</p>
//                                         </div>
//                                     </div>
//                                     <hr className='mt-1'></hr>

//                                 </div>
//                                 <div className='row'>
//                                     <div className='message-card' onClick={handleLead}>
//                                         <div className='row'>
//                                             <div className='col-3 mt-1'>
//                                                 <img src='/BidUser.svg' className='lead-profile' />
//                                             </div>
//                                             <div className='col-7'>
//                                                 <h4>Mr. Sharma</h4>
//                                                 <h6>Enquiry</h6>
//                                                 <p className='mt-1' style={{
//                                                     fontSize: '12px',
//                                                     overflow: 'hidden',
//                                                     textOverflow: 'ellipsis',
//                                                     whiteSpace: 'nowrap',
//                                                     maxWidth: '100%', // Optional, adjust as needed
//                                                 }}>
//                                                     Want to know about the epson's products pricing.Want to know about the epson's products pricing.Want to know about the epson's products pricing.Want to know about the epson's products pricing.
//                                                 </p>                </div>
//                                             <div className='col-2'>
//                                                 <RiDeleteBinLine />
//                                             </div>
//                                         </div>
//                                         <div className='row text-end'>
//                                             <p className='text-end' style={{ fontSize: '12px' }}>30 mins ago</p>
//                                         </div>
//                                     </div>
//                                     <hr className='mt-1'></hr>

//                                 </div>
//                                 <div className='row'>
//                                     <div className='message-card' onClick={handleLead}>
//                                         <div className='row'>
//                                             <div className='col-3 mt-1'>
//                                                 <img src='/BidUser.svg' className='lead-profile' />
//                                             </div>
//                                             <div className='col-7'>
//                                                 <h4>Mr. Sharma</h4>
//                                                 <h6>Enquiry</h6>
//                                                 <p className='mt-1' style={{
//                                                     fontSize: '12px',
//                                                     overflow: 'hidden',
//                                                     textOverflow: 'ellipsis',
//                                                     whiteSpace: 'nowrap',
//                                                     maxWidth: '100%', // Optional, adjust as needed
//                                                 }}>
//                                                     Want to know about the epson's products pricing.Want to know about the epson's products pricing.Want to know about the epson's products pricing.Want to know about the epson's products pricing.
//                                                 </p>                </div>
//                                             <div className='col-2'>
//                                                 <RiDeleteBinLine />
//                                             </div>
//                                         </div>
//                                         <div className='row text-end'>
//                                             <p className='text-end' style={{ fontSize: '12px' }}>30 mins ago</p>
//                                         </div>
//                                     </div>
//                                     <hr className='mt-1'></hr>

//                                 </div>
//                                 <div className='row'>
//                                     <div className='message-card' onClick={handleLead}>
//                                         <div className='row'>
//                                             <div className='col-3 mt-1'>
//                                                 <img src='/BidUser.svg' className='lead-profile' />
//                                             </div>
//                                             <div className='col-7'>
//                                                 <h4>Mr. Sharma</h4>
//                                                 <h6>Enquiry</h6>
//                                                 <p className='mt-1' style={{
//                                                     fontSize: '12px',
//                                                     overflow: 'hidden',
//                                                     textOverflow: 'ellipsis',
//                                                     whiteSpace: 'nowrap',
//                                                     maxWidth: '100%', // Optional, adjust as needed
//                                                 }}>
//                                                     Want to know about the epson's products pricing.Want to know about the epson's products pricing.Want to know about the epson's products pricing.Want to know about the epson's products pricing.
//                                                 </p>                </div>
//                                             <div className='col-2'>
//                                                 <RiDeleteBinLine />
//                                             </div>
//                                         </div>
//                                         <div className='row text-end'>
//                                             <p className='text-end' style={{ fontSize: '12px' }}>30 mins ago</p>
//                                         </div>
//                                     </div>
//                                     <hr className='mt-1'></hr>

//                                 </div>
//                                 <div className='row'>
//                                     <div className='message-card' onClick={handleLead}>
//                                         <div className='row'>
//                                             <div className='col-3 mt-1'>
//                                                 <img src='/BidUser.svg' className='lead-profile' />
//                                             </div>
//                                             <div className='col-7'>
//                                                 <h4>Mr. Sharma</h4>
//                                                 <h6>Enquiry</h6>
//                                                 <p className='mt-1' style={{
//                                                     fontSize: '12px',
//                                                     overflow: 'hidden',
//                                                     textOverflow: 'ellipsis',
//                                                     whiteSpace: 'nowrap',
//                                                     maxWidth: '100%', // Optional, adjust as needed
//                                                 }}>
//                                                     Want to know about the epson's products pricing.Want to know about the epson's products pricing.Want to know about the epson's products pricing.Want to know about the epson's products pricing.
//                                                 </p>                </div>
//                                             <div className='col-2'>
//                                                 <RiDeleteBinLine />
//                                             </div>
//                                         </div>
//                                         <div className='row text-end'>
//                                             <p className='text-end' style={{ fontSize: '12px' }}>30 mins ago</p>
//                                         </div>
//                                     </div>
//                                     <hr className='mt-1'></hr>

//                                 </div>
//                                 <div className='row'>
//                                     <div className='message-card' onClick={handleLead}>
//                                         <div className='row'>
//                                             <div className='col-3 mt-1'>
//                                                 <img src='/BidUser.svg' className='lead-profile' />
//                                             </div>
//                                             <div className='col-7'>
//                                                 <h4>Mr. Sharma</h4>
//                                                 <h6>Enquiry</h6>
//                                                 <p className='mt-1' style={{
//                                                     fontSize: '12px',
//                                                     overflow: 'hidden',
//                                                     textOverflow: 'ellipsis',
//                                                     whiteSpace: 'nowrap',
//                                                     maxWidth: '100%', // Optional, adjust as needed
//                                                 }}>
//                                                     Want to know about the epson's products pricing.Want to know about the epson's products pricing.Want to know about the epson's products pricing.Want to know about the epson's products pricing.
//                                                 </p>                </div>
//                                             <div className='col-2'>
//                                                 <RiDeleteBinLine />
//                                             </div>
//                                         </div>
//                                         <div className='row text-end'>
//                                             <p className='text-end' style={{ fontSize: '12px' }}>30 mins ago</p>
//                                         </div>
//                                     </div>
//                                     <hr className='mt-1'></hr>

//                                 </div>

//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </>
//         )
//     }
//     // if(!userDe){
//     //     return(
//     //         <div className='row mt-5'>
//     //         <SkeletonLoader/>
//     //         </div>
//     //     )
//     // }
//     return (
//         <>
//         {allBids && <SellerBid/>}
//             {isBid && <BidForm />}
//             {!isBid && !allBids && (
//                 <>
//                     <div className='row mt-2'>
//                         <button className=' btn compare-btn' onClick={handleBidList}>Bid List</button>
//                     </div>
//                     <div className='leads-card mt-2'>
//                         <div className='d-none d-xl-block d-md-block d-sm-none'>

//                             <div className='container'>

//                                 <div className='row'>
//                                     <div className='col-5'>
//                                         {inboxMessage()}
//                                     </div>
//                                     <div className='col-7'>
//                                         {showMessage ? noMessage() : renderMessage()}
//                                     </div>
//                                 </div>


//                             </div>
//                         </div>
//                         <div className='d-block d-xl-none d-md-none d-sm-block'>
//                             <div className='container'>
//                                 <div className='row'>
//                                     <div className='col-12'>
//                                         {showMessage ? inboxMessage() : renderMessage()}
//                                     </div>
//                                 </div>
//                             </div>

//                         </div>
//                     </div>
//                 </>
//             )}
//         </>

//     )
// }
// export default BidContain;
