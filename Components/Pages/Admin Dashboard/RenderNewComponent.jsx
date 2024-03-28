import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
// import BidContain from './BidContain';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import spring_boot_url from '../../../Utils/springApi';
import TenderNextStep from './TenderNextStep';


const RenderNewComponent = ({ }) => {

  const [nextButton, setNextButton] = useState(false);
  const [searchRFQdata, setsearchRFQdata] = useState(true);
  const [RFQDe, setRFQDe] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [uploadRfq, setuploadRfq] = useState("");
  const [rfqdata, setrfqdata] = useState(true);
  const [showSearchCard, setShowSearchCard] = useState(false);
  const [searchRFQQuery, setSearchRFQQuery] = useState(true);
  const [searchQuery, setSearchQuery] = useState(true);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [selectRfq, setselectRfq] = useState(false);
  const [selectRfqdata, setselectRfqdata] = useState(false);

  ///////////changes for checkbox///////////
  const [selectedRFQ, setSelectedRFQ] = useState(null);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);

  // Function to handle RFQ selection
  const handleRFQSelection = (elem) => {
    if (selectedRFQ === elem) {
      // If same checkbox clicked again, deselect it
      setSelectedRFQ(null);
      setNextButtonDisabled(true); // Disable the next button
    } else {
      setSelectedRFQ(elem);
      setNextButtonDisabled(false); // Enable the next button
    }
  };

  ////////////end///////////


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
  const handleNextButton = () => {
    setNextButton(!nextButton);
    console.log("clicked next");
  }
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

  useEffect(() => {
    axios.get(`${spring_boot_url}api/userRfq`)
      .then(resp => {
        console.log(resp.data.json);
        localStorage.setItem("data", JSON.stringify(resp.data));
        setRFQDe(resp.data);
      });
  }, []);

  useEffect(() => {

    setTenderBack(tender);
    console.log("tender Back Set Tender: ", tenderBack);
  });

  if (tenderBack == null) {
    setTenderBack(tender);
  }

  const searchRFQ = (e) => {
    axios.get(`${spring_boot_url}api/userRfq/search?query=${searchQuery}`)
      .then(resp => {
        console.log(resp.data.json);
        setsearchRFQdata(resp.data);
      });
  };

  const selectRfqc = (elem) => {
    setselectRfqdata(elem)
    setselectRfq(true)
  }

  const handleViewRFQDetailsClick = (userData) => {
    openModal(userData);
    setsearchRFQdata(null);
  };

  const handleOpen = (elem) => {
    setOpen(true);
    setrfqdata(elem);
  };

  const handleClose = () => {
    setOpen(false);
    setuploadRfq(null);
  }


  const searchSi = (e) => {
    axios.get(`${spring_boot_url}api/adminuser/search?query=${searchQuery}`)
      .then(resp => {
        console.log(resp.data.json);
        setsearchdata(resp.data);
      });
  };

  const openModal = (userData) => {
    setSelectedUserData(userData);
    setModalOpen(true);
    console.log("clicked eye");
  };

  const handleBackToDetails = () => {
    setbacktoTender(true)
    setShowDetails(true);
    setNextButton(false)
    console.log("Back Details");
  };

  return (
    <>
      {nextButton ? (<TenderNextStep selectRfqdata={selectRfqdata} />
      ) : (
        <>

          <div className='d-none d-xl-block d-md-block d-sm-none'>
            <div className='fluid-container'>
              <div className='row'>
                <div className='col-12'>
                  <h2 className='mb-2 mt-2' style={{ marginLeft: '180px' }}>RFQ List</h2>
                  <div className='row mt-2'>
                    <input
                      type="search"
                      className="form-control otp-phone"
                      placeholder="Search RFQ ..."
                      aria-label="Search"
                      style={{ height: '40px', border: "1px solid #ddd", borderRadius: '8px', marginLeft: '190px' }}
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
                                    <input type='checkbox'
                                      //changes
                                      checked={selectedRFQ === elem} //  RFQ is selected
                                      onChange={() => handleRFQSelection(elem)} // Update the selected RFQ
                                    //end


                                    />
                                    <h5>Project Name : {elem.productName}</h5>
                                    <p>RFQ Create Date : {formatDate(elem.createdAt)}</p>
                                    <p>Created By : {elem.createdBy}</p>
                                    <h5>Status : {elem.status}</h5>
                                  </div>
                                  <div className='col-2'>
                                    <button className="option-button"
                                      onClick={() => handleOpen(elem)}

                                    //onClick={() => handleViewRFQDetailsClick(elem)}

                                    >
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
                                    <input
                                      type='checkbox'

                                      //changes
                                      checked={selectedRFQ === elem} // Check if the RFQ is selected
                                      onChange={() => handleRFQSelection(elem)} // Update the selected RFQ
                                    //end

                                    //onChange={() => selectRfqc(elem)}
                                    />


                                    <h5>Project Name : {elem.productName}</h5>
                                    <p>RFQ Create Date : {formatDate(elem.createdAt)}</p>
                                    <p>Created By : {elem.createdBy}</p>
                                    <h5>Status : {elem.status}</h5>
                                  </div>
                                  <div className='col-2'>
                                    <button className="option-button" 
                                    onClick={() => handleOpen(elem)}


                                    //onClick={() => handleViewRFQDetailsClick(elem)}
                                    >
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
                  {/* <button className='btn back-btn' onClick={handleNextButton}>
                    Next
                  </button> */}
                     <button className="btn back-btn" onClick={handleNextButton} disabled={nextButtonDisabled}>
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
  )
}

export default RenderNewComponent;