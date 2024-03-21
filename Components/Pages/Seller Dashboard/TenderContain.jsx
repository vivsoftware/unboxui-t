import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React, { useEffect, useRef, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import TenderNextStep from './TenderNextStep';
import spring_boot_url from '../../../Utils/springApi';
import axios from 'axios';
const TenderContain = ({ rfq, tender, userDe }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  // const [userDe, setUserDe] = useState(true);
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
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = React.useState(false);
  const [uploadRfq, setuploadRfq] = useState("");
  const [rfqdata, ssetrfqdata] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [nextBtn, setnextBtn] = React.useState(false);
  const [Tenderselectdata, setTenderselectdata] = useState(true);
  const [searchData, setSearchData] = useState(true);
  

  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      // Clicked outside the search card, close it
      setShowSearchCard(false);
    }
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '4px solid #ff8400',
    boxShadow: 24,
    p: 4,
  };
  const handleClose = () => {
    setOpen(false);
    setuploadRfq(null);
  }
  const handleOpen = (elem) => {
    setOpen(true);
    ssetrfqdata(elem);
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
  }, []);
  const openModal = (userData) => {
    setSelectedUserData(userData);
    setModalOpen(true);
  };
  const toggleFilterDropdown = () => {
    setIsOpen(!isOpen);
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
      setSearchResults(null);
    } else {
      setSearchTerm(e.target.value);
    }
  };
// tender search start
  const handleTenderSearchChange = (e) => {
    
    if(e.target.value.trim() === ""){
      setsearchdata(null);
    }else{
      setSearchQuery(e.target.value);
      serachTender();
    }
  }

  const serachTender = (e) => {
    axios.get(`${spring_boot_url}api/tender/find?query=${searchQuery}`)
      .then(resp => {
        setsearchdata(resp.data);
      });
    console.log(searchQuery);
  }

  useEffect()

// tender search end
  const handleSearchRFQChange = (e) => {
    // Clear searchdata if the input is empty
    if (e.target.value.trim() === '') {
      setsearchRFQdata(null);
    } else {
      // const query = e.target.value;
      setSearchRFQQuery(e.target.value);
    }
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const handleViewDetailsClick = (userData) => {
    openModal(userData);
    setsearchdata(null);
  };
  const handleViewRFQDetailsClick = (elem) => {
    openModal(elem);
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
  const tendernext = (elem) => {
    setTenderselectdata(elem)
    setnextBtn(true)
  }

  /////////////////////////////////////////.."RFQ  Search Logic"../////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    // Function to filter data based on search term
    const filterData = () => {
      const filteredData = rfq?.filter(item => {
        // Customize the conditions based on your data structure
        return (
          (item.projectName && item.projectName.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.email && item.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.phoneNumber && item.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      });
      setSearchResults(filteredData);
    };
    filterData();
  }, [rfq, searchTerm]);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const renderDetails = () => {

    return (
      <>
        <div className='d-none d-xl-block d-md-block d-sm-none'>
          <div className=' RFQ-card'>
            <div className='container'>
              <div className='row mt-5'>
                <div className='col-2'>
                  <button className='btn register-btn' onClick={handleCreateTender} >Create Tender</button>
                </div>
                <div className='col-10'>
                  <input type="search" className="form-control" onChange={handleTenderSearchChange} placeholder="Search Tender ..." aria-label="Search" style={{ height: '40px', border: "1px solid #ddd", borderRadius: '8px' }} />
                </div>
              </div>
              <div className='row mt-5 SI-table'>
                <h2 className='mb-2'>Tender List</h2>
                <table className="table">
                  <thead className='table-header'>
                    <tr>
                      <th>T.Id</th>
                      <th>RFQ Name</th>
                      <th>Tender Create Date</th>
                      <th>Closing Date</th>
                      <th>View</th>
                      <th>Options</th>

                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(tender) && tender.map((elem, index) => (
                      <tr key={index + 1} className='table-row'>
                        <td>{elem.id}</td>
                        <td>{elem.projectName}</td>
                        <td>{formatDate(elem.createdAt)}</td>
                        <td>{elem.tenderClosingDate}</td>
                        <td>Pubished</td>
                        <td>
                          <button className="option-button" onClick={() => handleOpen(elem)}>
                            <FaEye />
                          </button>
                        </td>
                        <td style={{ position: 'relative' }}>
                          <button className="option-button" onClick={toggleDropdown}>
                            <img src="/option.svg" width="20px" height="20px" alt="Options" />
                          </button>
                          {isDropdownVisible && (
                            <div className='options-card' style={{ position: 'absolute', top: '100%', left: '65px', transform: 'translateY(-100%)', zIndex: '1' }}>
                              <p onClick={handleBidClick}>View Bid</p>
                              {/* <p onClick={handleOpen}>View Tender</p> */}
                              <p>Delete</p>
                            </div>
                          )}
                        </td>
                        <td>
                        </td>
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
                          <h5> RFQ Name:</h5>
                          <p className='mt-1'>Tender Create Date : </p>
                          <p>Status:</p>
                          <p>No.of Bids:</p>
                        </div>
                        <div className='col-2'>
                        <button className="option-button" onClick={() => handleOpen(elem)}>
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
    )
  }

  const renderNewComponent = () => {
    return (
      <>
        {nextButton ? <TenderNextStep Tenderselectdata={Tenderselectdata} /> : (
          <>
            <div className='d-none d-xl-block d-md-block d-sm-none'>
              <div className='fluid-container'>
                <div className='row'>
                  <div className='col-12'>
                    <h2 className='mb-2 mt-2'>RFQ List</h2>
                    <div className='row mt-2'>
                      <input
                        type="search"
                        className="form-control"
                        placeholder="Search RFQ ..."
                        aria-label="Search"
                        style={{ height: '40px', border: "1px solid #ddd", borderRadius: '8px' }}
                        onChange={handleSearchChange}
                      />
                      {searchResults && searchResults.length === 0 && (
                        <p style={{ color: 'red' }}>No RFQ found.</p>
                      )}
                      {searchResults && searchResults.length > 0 && (
                        <div className='user-searchCard'>
                          {searchResults.map((item, index) => (
                            <div className='user-search' key={index}>
                              {/* <p onClick={() => handleOpen(elem)}>{elem.productName}</p> */}
                              <p onClick={() => handleOpen(item)}>
                                {item?.projectName} - {item?.email} - {item?.phoneNumber}
                              </p>
                              <hr></hr>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className='row mt-2  SI-table'>
                      {searchResults?.length > 0 ? (
                        <>
                          <div className='RFQ-Card'>
                            {searchResults.map((elem, index) => (
                              <div className='RFQ-Card' key={index}>
                                <div className='container'>
                                  <div className='row'>
                                    <div className='col-10'>
                                      <input type='checkbox' onChange={() => tendernext(elem)} />
                                      <h5>Project Name : {elem.productName}</h5>
                                      <p>RFQ Create Date : {formatDate(elem.createdAt)}</p>
                                      <p>Created By : {elem.createdBy}</p>
                                      <h5>Status : {elem.status}</h5>
                                    </div>
                                    <div className='col-2'>
                                      <button className="option-button" onClick={() => handleOpen(elem)}>
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
                            {Array.isArray(rfq) && rfq.map((elem, index) =>
                              <div className='RFQ-Card' key={index}>
                                <div className='container'>
                                  <div className='row'>
                                    <div className='col-10'>
                                      <input type='checkbox' onChange={() => tendernext(elem)} />
                                      <h5>Project Name : {elem.productName}</h5>
                                      <p>RFQ Create Date : {formatDate(elem.createdAt)}</p>
                                      <p>Created By : {elem.createdBy}</p>
                                      <h5>Status : {elem.status}</h5>
                                    </div>
                                    <div className='col-2'>
                                    <button className="option-button" onClick={() => handleOpen(elem)}>
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
                      className="form-control"
                      placeholder="Search RFQ ..."
                      aria-label="Search"
                      style={{ height: '40px', border: "1px solid #ddd", borderRadius: '8px' }}
                      onChange={handleSearchChange}
                    />
                    {searchResults && searchResults.length === 0 && (
                      <p style={{ color: 'red' }}>No RFQ found.</p>
                    )}
                    {searchResults && searchResults.length > 0 && (
                      <div className='user-searchCard'>
                        {searchResults.map((item, index) => (
                          <div className='user-search' key={index}>
                            {/* <p onClick={() => handleOpen(elem)}>{elem.productName}</p> */}
                            <p onClick={() => handleOpen(item)}>
                              {item?.projectName} - {item?.email} - {item?.phoneNumber}
                            </p>
                            <hr></hr>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className='row'>
                    <div className='mobile-userCard'>
                      {searchResults?.length > 0 ? (
                        <>
                          <div className='RFQ-Card'>
                            {searchResults.map((elem, index) => (
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
                            {Array.isArray(rfq) && rfq.map((elem, index) =>
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
                      {/* Next */}
                    </button>
                  </div>
                </div>
              </div>
            </div>


            <div>
              <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
              >
                <Box sx={style}>
                  <div className="my-modal-content" style={{ display: "flex-relative" }}>
                    <h3 className='mb-2'>User Profile</h3>
                    <p>Project Name: {rfqdata.projectName}</p>
                    <p>purpose Of Rfq: {rfqdata.purposeOfRfq}</p>
                    <p>Created At: {rfqdata.createdAt}</p>
                    <p>Created By: {rfqdata.createdBy}</p>
                    <p>Status: {rfqdata.status}</p>
                    <p>Customer Email Id: {rfqdata.email}</p>
                    <p>Customer Phone No.: {rfqdata.phoneNumber}</p>
                    <div>
                      {uploadRfq ? (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {/* <p style={{ marginRight: '10px' }}>document: Yes</p> */}
                          <Link href={`${spring_boot_url}api/rfqdoc/download/${rfqdata?.id}`}>
                            <h3 style={{ marginRight: '10px' }}> Download Upload Documents</h3>
                          </Link>
                        </div>
                      ) : (
                        <p></p>
                      )}
                    </div>
                    <div style={{ display: 'flex' }}>
                      <button>Edit</button>
                      <button>Delete</button>
                      <button onClick={handleClose}>Close</button>
                    </div>
                  </div>
                </Box>
              </Modal>
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
