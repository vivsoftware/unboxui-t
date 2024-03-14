import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { FaPlus, FaMinus, FaEye } from 'react-icons/fa';
import { Input } from 'reactstrap';
import axios from 'axios';
import spring_boot_url from '../../../Utils/springApi';
import Link from 'next/link';
import ModalComponent from './ModalComponent';
import { useRef } from 'react';
import DashboardLoader from '../../Element/DashboardLoader';
import { useRouter } from 'next/router';
// import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import { auth } from '../../../Config/firebase';

import TenderNextStep from './TenderNextStep';   //changes
import BidContain from './BidContain';


const TenderContain = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [userDe, setUserDe] = useState(true);
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

  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      // Clicked outside the search card, close it
      setShowSearchCard(false);
    }
  };

  useEffect(() => {
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
    allUsers();
  }, []);

  const openModal = (userData) => {
    setSelectedUserData(userData);
    setModalOpen(true);
  };

  const toggleFilterDropdown = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    axios.get(`${spring_boot_url}api/userRfq`)
      .then(resp => {
        console.log(resp.data.json);
        localStorage.setItem("data", JSON.stringify(resp.data));
        setRFQDe(resp.data);
      });
  }, []);

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
  const allUsers = () => {
    axios.get(`${spring_boot_url}api/adminuser/allusers`)
      .then(resp => {
        console.log(resp.data.json);
        localStorage.setItem("data", JSON.stringify(resp.data));
        setUserDe(resp.data);
      });
  }
  const seller = () => {
    axios.get(`${spring_boot_url}api/adminuser/search?query=seller`)
      .then(resp => {
        console.log(resp.data.json);
        setUserDe(resp.data);
      });
  }
  const buyer = () => {
    axios.get(`${spring_boot_url}api/adminuser/search?query=buyer`)
      .then(resp => {
        console.log(resp.data.json);
        setUserDe(resp.data);
      });
  }
  const serviceProvider = () => {
    axios.get(`${spring_boot_url}api/adminuser/search?query=service provider`)
      .then(resp => {
        console.log(resp.data.json);
        setUserDe(resp.data);
      });
  }

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

  const handleViewDetailsClick = (userData) => {
    openModal(userData);
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
    setNextButton(!nextButton);
  }


  const renderDetails = () => {
    // if (!userDe) {
    //   return (
    //     <>
    //       {showBid ? <BidContain /> : (
    //         <>
    //           <div className='d-none d-xl-block d-md-block d-sm-none'>
    //             <div className=' RFQ-card'>
    //               <div className='container'>
    //                 <div className='row mt-5'>
    //                   <div className='col-2'>
    //                     <button className='btn register-btn' >Create Tender</button>
    //                   </div>
    //                   <div className='col-10'>
    //                     <input type="search" className="form-control" placeholder="Search Tender ..." aria-label="Search" style={{ height: '40px', border: "1px solid #ddd", borderRadius: '8px' }} />
    //                   </div>
    //                 </div>
    //                 <div className='row mt-5 SI-table'>
    //                   <h2 className='mb-2'>Tender List</h2>
    //                   <table className="table">
    //                     <thead className='table-header'>
    //                       <tr>
    //                         <th>Sr.No</th>
    //                         <th>RFQ Name</th>
    //                         <th>Tender Create Date</th>
    //                         <th>Status</th>
    //                         <th>No. of Bids</th>
    //                         <th>Options</th>
    //                       </tr>
    //                     </thead>

    //                   </table>
    //                   <DashboardLoader />
    //                 </div>
                    
    //               </div>
    //             </div>
    //           </div>
    //           <div className='d-block d-xl-none d-md-none d-sm-block'>
    //             <div className=' RFQ-card'>
    //               <div className='container-fluid'>
    //                 <div className='row mt-5'>
    //                   <div className='col-5'>
    //                     <button className='btn register-btn'  >Create Tender</button>
    //                   </div>
    //                   <div className='col-6'>
    //                     <input type="search" className="form-control" placeholder="Search Tender ..." aria-label="Search" style={{ height: '40px', border: "1px solid #ddd", borderRadius: '8px' }} />
    //                   </div>
    //                 </div>
    //                 <div className='row mt-5 SI-table'>
    //                   <h2 className='mb-2'>Tender List</h2>
    //                   <DashboardLoader />
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </>
    //       )}



    //     </>
    //   )
    // }
    return (
      <>
        {showBid ? <BidContain /> : (
          <>
            <div className='d-none d-xl-block d-md-block d-sm-none'>
              <div className=' RFQ-card'>
                <div className='container'>
                  <div className='row mt-5'>
                    <div className='col-2'>
                      <button className='btn register-btn' onClick={handleCreateTender} style={{marginLeft: '10px', marginTop: '60px'}}>Create Tender</button>
                    </div>
                    <div className='col-10'>
                      <input type="search" className="form-control" placeholder="Search Tender ..." aria-label="Search" style={{ height: '40px', border: "1px solid #ddd", borderRadius: '8px', marginLeft: '-220px' }} />
                    </div>
                  </div>
                  <div className='row mt-5 SI-table'>
                    <h2 className='mb-2'>Tender List</h2>
                    <table className="table">
                      <thead className='table-header'>
                        <tr>
                          <th>Sr.No</th>
                          <th>RFQ Name</th>
                          <th>Tender Create Date</th>
                          <th>Status</th>
                          <th>No. of Bids</th>
                          <th>Options</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className='table-row'>
                          <td>1</td>
                          <td>Machine Vision</td>
                          <td>1/12/23</td>
                          <td>Published</td>
                          <td>2</td>
                          <td style={{ position: 'relative' }}>
                            <button className="option-button" onClick={toggleDropdown}>
                              <img src="/option.svg" width="20px" height="20px" alt="Options" />
                            </button>
                            {isDropdownVisible && (
                              <div className='options-card' style={{ position: 'absolute', top: '100%', left: '65px', transform: 'translateY(-100%)', zIndex: '1' }}>
                                <p onClick={handleBidClick}>View Bid</p>
                                <p>Edit</p>
                                <p>Delete</p>
                              </div>
                            )}
                          </td>
                        </tr>
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
                    <div className='col-5'>
                      <button className='btn register-btn' onClick={handleCreateTender} >Create Tender</button>
                    </div>
                    <div className='col-6'>
                      <input type="search" className="form-control" placeholder="Search Tender ..." aria-label="Search" style={{ height: '40px', border: "1px solid #ddd", borderRadius: '8px' }} />
                    </div>
                  </div>
                  <div className='row mt-5 SI-table'>
                    <h2 className='mb-2'>Tender List</h2>
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
                              <button className="option-button" >
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

  const renderNewComponent = () => {
    return (
      <>
        {nextButton ? <TenderNextStep /> : (
          <>
            <div className='d-none d-xl-block d-md-block d-sm-none'>
              <div className='fluid-container'>
                <div className='row'>
                  <div className='col-12'>
                    <h2 className='mb-2 mt-2' style={{marginLeft: '10px'}}>RFQ List</h2>
                    <div className='row mt-2'>
                      <input
                        type="search"
                        className="form-control otp-phone"
                        placeholder="Search RFQ ..."
                        aria-label="Search"
                        style={{ height: '40px', border: "1px solid #ddd", borderRadius: '8px', marginLeft: '10px' }}
                        onChange={handleSearchRFQChange}
                      />
                      {searchRFQdata && searchRFQdata.length === 0 && (
                        <p style={{ color: 'red' }}>No RFQ found.</p>
                      )}
                      {searchRFQdata && searchRFQdata.length > 0 && (
                        <div className='user-searchCard'>
                          {searchRFQdata.map((elem, index) => (
                            <div className='user-search' key={index}>
                              <p onClick={() => handleViewRFQDetailsClick(elem)}>{elem.productName}</p>
                              <hr></hr>
                            </div>

                          ))}
                        </div>
                      )}
                    </div>
                    <div className='row mt-2  SI-table'>
                      {searchRFQdata?.length > 0 ? (
                        <>
                          <div className='RFQ-Card'>
                            {searchRFQdata.map((elem, index) => (
                              <div className='RFQ-Card' key={index}>
                                <div className='container'>
                                  <div className='row'>
                                    <div className='col-10'>
                                      <input type='checkbox' />
                                      <h5>Project Name : {elem.productName}</h5>
                                      <p>RFQ Create Date : {formatDate(elem.createdAt)}</p>
                                      <p>Created By : {elem.createdBy}</p>
                                      <h5>Status : {elem.status}</h5>
                                    </div>
                                    <div className='col-2'>
                                      <button className="option-button" onClick={() => handleViewRFQDetailsClick(elem)}>
                                        <FaEye />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      ) :
                        (
                          <>
                            {Array.isArray(RFQDe) && RFQDe.map((elem, index) =>
                              <div className='RFQ-Card' key={index}>
                                <div className='container'>
                                  <div className='row'>
                                    <div className='col-10'>
                                      <input type='checkbox' />
                                      <h5>Project Name : {elem.productName}</h5>
                                      <p>RFQ Create Date : {formatDate(elem.createdAt)}</p>
                                      <p>Created By : {elem.createdBy}</p>
                                      <h5>Status : {elem.status}</h5>
                                    </div>
                                    <div className='col-2'>
                                      <button className="option-button" onClick={() => handleViewRFQDetailsClick(elem)}>
                                        <FaEye />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        )}

                    </div>

                  </div>
                </div>
                <div className='row mt-2'>
                  <div className='col-10'></div>
                  <div className='col-1'>
                    <button className='btn back-btn' onClick={handleBackToDetails}>
                      Back
                    </button>
                  </div>
                  <div className='col-1'>
                    <button className='btn back-btn' onClick={handleNextButton}>
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='d-block d-xl-none d-md-none d-sm-block'>
              <div className='container-fluid'>
                <h2 className='mb-2 mt-2'>RFQ List</h2>
                <div className='row mt-2'>
                  <div className='col-11'>
                    <input
                      type="search"
                      className="form-control otp-phone"
                      placeholder="Search RFQ ..."
                      aria-label="Search"
                      style={{ height: '40px', border: "1px solid #ddd", borderRadius: '8px' }}
                      onChange={handleSearchRFQChange}
                    />
                    {searchRFQdata && searchRFQdata.length === 0 && (
                      <p style={{ color: 'red' }}>No RFQ found.</p>
                    )}
                    {searchRFQdata && searchRFQdata.length > 0 && (
                      <div className='user-searchCard'>
                        {searchRFQdata.map((elem, index) => (
                          <div className='user-search' key={index}>
                            <p onClick={() => handleViewRFQDetailsClick(elem)}>{elem.productName}</p>
                            <hr></hr>
                          </div>

                        ))}
                      </div>
                    )}
                  </div>
                  <div className='row'>

                    <div className='mobile-userCard'>
                      {searchRFQdata?.length > 0 ? (
                        <>
                          <div className='RFQ-Card'>
                            {searchRFQdata.map((elem, index) => (
                              <div className='RFQ-Card' key={index}>
                                <div className='container'>
                                  <div className='row'>
                                    <div className='col-10'>
                                      <input type='checkbox' />
                                      <h5>Project Name : {elem.productName}</h5>
                                      <p>RFQ Create Date : {elem.createdAt}</p>
                                      <p>Created By : {elem.createdBy}</p>
                                      <h5>Status : {elem.status}</h5>
                                    </div>
                                    <div className='col-2'>
                                      <button className="option-button" onClick={() => handleViewRFQDetailsClick(elem)}>
                                        <FaEye />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      ) :
                        (
                          <>
                            {Array.isArray(RFQDe) && RFQDe.map((elem, index) =>
                              <div className='RFQ-Card' key={index}>
                                <div className='container'>
                                  <div className='row'>
                                    <div className='col-10'>
                                      <input type='checkbox' />
                                      <h5>Project Name : {elem.productName}</h5>
                                      <p>RFQ Create Date : {formatDate(elem.createdAt)}</p>
                                      <p>Created By : {elem.createdBy}</p>
                                      <h5>Status : {elem.status}</h5>
                                    </div>
                                    <div className='col-2'>
                                      <button className="option-button" onClick={() => handleViewRFQDetailsClick(elem)}>
                                        <FaEye />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        )}
                    </div>
                  </div>
                </div>

                <div className='row mt-5'>

                  <div className='col-6'>
                    <button className='btn back-btn' onClick={handleBackToDetails}>
                      Back
                    </button>
                  </div>
                  <div className='col-6'>
                    <button className='btn back-btn' disabled onClick={handleBackToDetails}>
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}




      </>
    )
  }

  return (
    <>
      <div className=''>
        {showDetails ? renderDetails() : renderNewComponent()}
      </div>
    </>
  )
}

export default TenderContain;
