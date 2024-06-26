import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaEye } from "react-icons/fa";
import spring_boot_url from "../../../Utils/springApi";
import TenderNextStep from "./TenderNextStep";

////////changes/////////
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
//////end///////////////


const TenderContain = ({ rfq, tender }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  // const [userDe, setUserDe] = useState(true);
  const [RFQDe, setRFQDe] = useState(true);
  const [searchdata, setsearchdata] = useState(true); //true
  const [searchRFQdata, setsearchRFQdata] = useState([]); //true
  const [searchQuery, setSearchQuery] = useState(true);
  const [searchRFQQuery, setSearchRFQQuery] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All");
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [showRFQ, setShowRFQ] = useState(true);
  const [showUsers, setShowUsers] = useState(true);
  const [showSearchCard, setShowSearchCard] = useState(false);
  const [showBid, setShowBid] = useState(false);
  const [nextButton, setNextButton] = useState(false);
  const searchRef = useRef(null);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = React.useState(false);
  const [uploadRfq, setuploadRfq] = useState("");
  const [rfqdata, ssetrfqdata] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [nextBtn, setnextBtn] = React.useState(false);
  const [Tenderselectdata, setTenderselectdata] = useState("");
  const [searchData, setSearchData] = useState(true );

  ///////////changes for checkbox///////////
  const [selectedRFQ, setSelectedRFQ] = useState(null);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);


   ////////////////////changes///////////////

   const [anchorEl, setAnchorEl] = React.useState(null);
   // const open = Boolean(anchorEl);
 
   const options = [
     'View Bid',
     'Delete',
   ];
 
   const ITEM_HEIGHT = 48;
 
   const handleClick = (event) => {
     setAnchorEl(event.currentTarget);
     setOpen(true);  //changes
   };
   const handleClose = () => {
     setAnchorEl(null);
     setOpen(false); //changes
       setuploadRfq(null);
    setsearchdata(null);
    setsearchRFQdata(null);
   };
   
  
  
   const handleOptionClick = (option,elem) => {
     handleClose();
    console.log("vdvvevvev", tender);
    console.log("selected option", elem);
     if (option === 'View Bid') {
       // Handle view bid functionality
      //  console.log("View Bid clicked for tender ID:", tender.userId);
       console.log("View Bid clicked for rfq ID:", elem?.id);
     }
     else if (option === 'Delete') {
       // Handle delete functionality
       const isConfirmed = window.confirm("Are you sure you want to delete this tender?");
       if (isConfirmed) {
        axios.delete(`${spring_boot_url}api/tender/${elem.id}`)
    .then(response => {
      console.log("Tender deleted status", response.status);
     //  onDeleteTender(elem.id);
      const updatedTender = tender.filter(item => item.id !== elem.id);
      settender(updatedTender);
       // can be notify his info using noty

       //curently tender is getting deleted but state is not updating we have to refesh the page to see the changes
    })
    .catch(error => {
      console.error("Error deleting tender:", error);
    });
        console.log("implementing tender delete");
       }
     }
   };

   

  //  const onDeleteTender = (tenderId) => {
  //   setTender((prevTenders) => prevTenders.filter((item) => item.id !== tenderId));
  //  };
   //////////////end////////////

  // Function to handle RFQ selection
  const handleRFQSelection = (elem) => {
    
    if (selectedRFQ === elem) {
      // If same checkbox clicked again, deselect it
      setSelectedRFQ(null);
      setNextButtonDisabled(true); // Disable the next button
      //setTenderselectdata(elem); // Set the selected tender to pass as prop
    } else {
      setSelectedRFQ(elem);
      setNextButtonDisabled(false); // Enable the next button
    }
    console.log("in handleRFQSelection", elem);
    tendernext(elem);
  };
  ////////////end///////////

  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      // Clicked outside the search card, close it
      setShowSearchCard(false);
    }
    
     
    console.log("clicked outside tttt");
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "4px solid #ff8400",
    boxShadow: 24,
    p: 4,
  };
  // const handleClose = () => {
  //   setOpen(false);
  //   setuploadRfq(null);
  //   setsearchdata(null);
  //   setsearchRFQdata(null); 
  // };
  const handleOpen = (elem) => {
    setOpen(true);
    ssetrfqdata(elem);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const savedOption = localStorage.getItem("selectedOption");
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
  };
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };
  // const handleOptionClick = (option) => {
  //   console.log(`Option clicked: ${option}`);
  //   setDropdownVisible(false);
  // };
  const handleBackToDetails = () => {
    setShowDetails(true);
  };
  const openRFQDropdown = () => {
    setShowRFQ(!showRFQ);
  };
  const openUsersDropdown = () => {
    setShowUsers(!showUsers);
  };
  const handleSearchChange = (e) => {
    // Clear searchdata if the input is empty
    if (e.target.value.trim() === "") {
      setSearchResults(null);
    } else {
      setSearchTerm(e.target.value);
    }
  };
  // tender search start
  const handleTenderSearchChange = (e) => {
    if (e.target.value.trim() === "") {
      setsearchdata(null);
    } else {
      setSearchQuery(e.target.value);
      console.log("search Liist:-",e.target.value);
      serachTender();
    }
  };

  const serachTender = (e) => {
    axios
      .get(`${spring_boot_url}api/tender/find?query=${searchQuery}`)
      .then((resp) => {
        setsearchdata(resp.data);
      });
    console.log(searchQuery);
  };

  useEffect(() => {
    const filterTenderData = tender?.filter((item) => {
      return (
        (item.RfqName &&
          item.ProductName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.email &&
          item.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.phoneNumber &&
          item.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
    setSearchData(filterTenderData);
    
  }, [tender, searchTerm]);


  // useEffect(() => {
  //   // Filter tender data based on search term
  //   const filterTenderData = () => {
  //     if (!searchTerm.trim()) {
  //       // If search term is empty, set search data to null
  //       setsearchdata(null);
  //       return;
  //     }

  //     const filteredData = tender.filter((item) => {
  //       // Customize conditions based on your data structure
  //       return (
  //         (item.ProductName &&
  //           item.ProductName.toLowerCase().includes(searchTerm.toLowerCase())) ||
  //         (item.email &&
  //           item.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
  //         (item.phoneNumber &&
  //           item.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()))
  //       );
  //     });
  //     setSearchData(filteredData);
  //   };

  //   filterTenderData();
  // }, [tender, searchTerm]);


  // tender search end
  const handleSearchRFQChange = (e) => {
    // Clear searchdata if the input is empty
    if (e.target.value.trim() === "") {
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
  };
  const handleNextButton = () => {
    setNextButton(!nextButton);
  };
  
  
  // const handleRFQselectionAndTendernext = (elem) => {
  //   console.log("in handleRFQselectionAndTendernext",elem);
  //   handleRFQSelection(elem); 
  //   tendernext(elem);
  // }
  
  const tendernext = (elem) => {
    setTenderselectdata(elem);
//setnextBtn(true);
  };

  /////////////////////////////////////////.."RFQ  Search Logic"../////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    // Function to filter data based on search term
    const filterData = () => {
      const filteredData = rfq?.filter((item) => {
        // Customize the conditions based on your data structure
        return (
          (item.projectName &&
            item.projectName
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (item.email &&
            item.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.phoneNumber &&
            item.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      });
      setSearchResults(filteredData);
    };
    filterData();
  }, [rfq, searchTerm]);

  useEffect(() => {
  console.log("tenderContain tender data", tender);
  console.log("tenderContain rfq data", rfq);
  console.log("tenderContain search data", Tenderselectdata);
  })

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const renderDetails = () => {
    return (
      <>
        <div className="d-none d-xl-block d-md-block d-sm-none" >
          <div className=" RFQ-card">
            <div className="container">
              <div className="row mt-5">
                <div className="col-2">
                  <button
                    className="btn register-btn"
                    style={{ marginLeft: "6px", marginTop: "4px",  border: "1px solid black",
                    borderRadius: "6px", }}
                    onClick={handleCreateTender}
                  >
                    Create Tender
                  </button>
                </div>
                <div className="col-10">
                  <input
                    type="search"
                    className="form-control"
                    onChange={handleTenderSearchChange}
                    placeholder="Search Tender ..."
                    aria-label="Search"
                    style={{
                      height: "40px",
                      border: "1px solid black",
                      borderRadius: "6px",
                      marginLeft: "190px",
                      width: "364px",
                    }}
                    // style={{
                    //   height: "40px",
                    //   border: "1px solid #ddd",
                    //   borderRadius: "8px",
                    // }}
                  />
                </div>
                {/* mapping data */}
                {searchdata && searchdata.length === 0 && (
                  <p style={{ color: "red" }}>No Tender found.</p>
                )}

                {searchdata && searchdata.length > 0 && (
                  <div className="user-searchCard">
                    {searchData.map((item, index) => (
                      <div className="user-search" key={index}>
                        {/* <p onClick={() => handleOpen(elem)}>{elem.productName}</p> */}
                        <p onClick={() => handleOpen(item)}>
                          Product Name :-{" "}{item?.ProductName}  
                          {<br></br>}
                          Email :-{" "}{item?.email} -
                          {<br></br>} {" "}
                          Phone Number :-{" "}{item?.phoneNumber}
                        </p>
                        <hr></hr>
                      </div>
                    ))}
                  </div>
                )}
                 {/* mapping end */}
              </div>
              <div className="row mt-5 SI-table">
                <h2 className="mb-2">Tender List</h2>
                <table className="table">
                  <thead className="table-header">
                    <tr>
                      <th>T.Id</th>
                      <th>T.Name</th>
                      <th>Tender Create Date</th>
                      <th>Tender Closing Date</th>
                      <th>Purpose</th>
                      <th>Status</th>
                      <th>View</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(tender) &&
                      tender.map((elem, index) => (
                        <tr key={index + 1} className="table-row">
                          <td>{elem.id}</td>
                          <td>{elem.rfqName}</td>
                          {/* <td>{elem.projectName}</td> */}
                          <td>{formatDate(elem.createdAt)}</td>
                          <td>{elem.tenderClosingDate}</td>
                          <td>{elem.purpose}</td>
                          <td>Pubished</td>
                          <td>
                            <button
                              className="option-button"
                             // onClick={() => handleOpen(elem)}
                            >
                              <FaEye />
                            </button>
                          </td>
                          <td style={{ position: "relative" }}>
                          <IconButton
                              aria-label="more"
                              aria-controls="long-menu"
                              aria-haspopup="true"
                              onClick={handleClick}
                            >
                              <MoreVertIcon />
                            </IconButton>
                            <Menu
                              id="long-menu"
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                            >
                              {options.map((option) => (
                                <MenuItem key={option} onClick={() => handleOptionClick(option,elem)}>
                                  {option}
                                </MenuItem>
                              ))}
                            </Menu>
                            {/* <button
                              className="option-button"
                              onClick={toggleDropdown}
                            >
                              <img
                                src="/option.svg"
                                width="20px"
                                height="20px"
                                alt="Options"
                              />
                            </button>
                            {isDropdownVisible && (
                              <div
                                className="options-card"
                                style={{
                                  position: "absolute",
                                  top: "100%",
                                  left: "65px",
                                  transform: "translateY(-100%)",
                                  zIndex: "1",
                                }}
                              >
                                <p onClick={handleBidClick}>View Bid</p>
                                <p>Delete</p>
                              </div>
                            )} */}
                          </td>
    
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="d-block d-xl-none d-md-none d-sm-block">
          <div className=" RFQ-card">
            <div className="container-fluid">
              <div className="row mt-5">
                <div className="col-5">
                  <button
                    className="btn register-btn"
                    onClick={handleCreateTender}
                  >
                    Create Tender
                  </button>
                </div>
                <div className="col-6">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search Tender ..."
                    aria-label="Search"
                    style={{
                      // height: "40px",
                      // border: "1px solid #ddd",
                      // borderRadius: "8px",
                   
                        height: "40px",
                        border: "1px solid black",
                        borderRadius: "6px",
                        marginLeft: "400px",
                        width: "10px"
                    }}
                  />
                </div>
              </div>
              <div className="row mt-5 SI-table">
                <h2 className="mb-2">Tender List</h2>
                <div className="col-12">
                  <div className="RFQ-Card">
                    <div className="container">
                      <div className="row">
                        <div className="col-10">
                          <h5> RFQ Name:</h5>
                          <p className="mt-1">Tender Create Date : </p>
                          <p>Status:</p>
                          <p>No.of Bids:</p>
                        </div>
                        <div className="col-2">
                          <button
                            className="option-button"
                            onClick={() => handleOpen(elem)}
                          >
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
    );
  };

  const renderNewComponent = () => {
    return (
      <>
        {nextButton ? (
          <TenderNextStep Tenderselectdata={Tenderselectdata} />
        ) : (
          <>
            <div className="d-none d-xl-block d-md-block d-sm-none">
              <div className="fluid-container">
                <div className="row">
                  <div className="col-12">
                    <h2 className="mb-2 mt-2">RFQ List</h2>
                    <div className="row mt-2">
                      <input
                        type="search"
                        className="form-control"
                        placeholder="Search RFQ ..."
                        aria-label="Search"
                        style={{
                          height: "40px",
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                        }}
                        onChange={handleSearchChange}
                      />
                      {searchResults && searchResults.length === 0 && (
                        <p style={{ color: "red" }}>No RFQ found.</p>
                      )}
                      {searchResults && searchResults.length > 0 && (
                        <div className="user-searchCard">
                          {searchResults.map((item, index) => (
                            <div className="user-search" key={index}>
                              {/* <p onClick={() => handleOpen(elem)}>{elem.productName}</p> */}
                              <p onClick={() => handleOpen(item)}>
                                {item?.projectName} - {item?.email} -{" "}
                                {item?.phoneNumber}
                              </p>
                              <hr></hr>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="row mt-2  SI-table">
                      {searchResults?.length > 0 ? (
                        <>
                          <div className="RFQ-Card">
                            {searchResults.map((elem, index) => (
                              <div className="RFQ-Card" key={index}>
                                <div className="container">
                                  <div className="row">
                                    <div className="col-10">
                                      <input
                                        type="checkbox"

                                        //changes
                                        checked={selectedRFQ === elem } //  RFQ is selected
                                        
                                        onChange={() => handleRFQSelection(elem)} // Update the selected RFQ
                                        //end

                                        // onChange={() => tendernext(elem)}
                                      />
                                      <h5>Project Name : {elem.productName}</h5>
                                      <p>
                                        RFQ Create Date :{" "}
                                        {formatDate(elem.createdAt)}
                                      </p>
                                      <p>Created By : {elem.createdBy}</p>
                                      <h5>Status : {elem.status}</h5>
                                    </div>
                                    <div className="col-2">
                                      <button
                                        className="option-button"
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
                      ) : (
                        <>
                          {Array.isArray(rfq) &&
                            rfq.map((elem, index) => (
                              <div className="RFQ-Card" key={index}>
                                <div className="container">
                                  <div className="row">
                                    <div className="col-10">
                                      <input
                                        type="checkbox"

                                        //changes
                                        checked={selectedRFQ === elem} // Check if the RFQ is selected
                                        onChange={() => handleRFQSelection(elem)} // Update the selected RFQ
                                        //end

                                        //onChange={() => tendernext(elem)}
                                      />
                                      <h5>Project Name : {elem.productName}</h5>
                                      <p>
                                        RFQ Create Date :{" "}
                                        {formatDate(elem.createdAt)}
                                      </p>
                                      <p>Created By : {elem.createdBy}</p>
                                      <h5>Status : {elem.status}</h5>
                                    </div>
                                    <div className="col-2">
                                      <button
                                        className="option-button"
                                        onClick={() => handleOpen(elem)}
                                      >
                                        <FaEye />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-10"></div>
                  <div className="col-1">
                    <button
                      className="btn back-btn"
                      onClick={handleBackToDetails}
                    >
                      Back
                    </button>
                  </div>
                  <div className="col-1">
                    {/* <button className="btn back-btn" onClick={handleNextButton}>
                      Next
                    </button> */}

                    {/* ///////////RFQ List Next Button////////// */}
                     <button className="btn back-btn" onClick={handleNextButton} disabled={nextButtonDisabled}>
                     Next
                    </button>
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="d-block d-xl-none d-md-none d-sm-block">
              <div className="container-fluid">
                <h2 className="mb-2 mt-2">RFQ List</h2>
                <div className="row mt-2">
                  <div className="col-11">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search RFQ ..."
                      aria-label="Search"
                      style={{
                        height: "40px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                      }}
                      onChange={handleSearchChange}
                    />
                    {searchResults && searchResults.length === 0 && (
                      <p style={{ color: "red" }}>No RFQ found.</p>
                    )}
                    {searchResults && searchResults.length > 0 && (
                      <div className="user-searchCard">
                        {searchResults.map((item, index) => (
                          <div className="user-search" key={index}>
                            {/* <p onClick={() => handleOpen(elem)}>{elem.productName}</p> */}
                            <p onClick={() => handleOpen(item)}>
                              {item?.projectName} - {item?.email} -{" "}
                              {item?.phoneNumber}
                            </p>
                            <hr></hr>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="row">
                    <div className="mobile-userCard">
                      {searchResults?.length > 0 ? (
                        <>
                          <div className="RFQ-Card">
                            {searchResults.map((elem, index) => (
                              <div className="RFQ-Card" key={index}>
                                <div className="container">
                                  <div className="row">
                                    <div className="col-10">
                                      <input type="checkbox" />
                                      <h5>Project Name : {elem.productName}</h5>
                                      <p>RFQ Create Date : {elem.createdAt}</p>
                                      <p>Created By : {elem.createdBy}</p>
                                      <h5>Status : {elem.status}</h5>
                                    </div>
                                    <div className="col-2">
                                      <button
                                        className="option-button"
                                        onClick={() =>
                                          handleViewRFQDetailsClick(elem)
                                        }
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
                      ) : (
                        <>
                          {Array.isArray(rfq) &&
                            rfq.map((elem, index) => (
                              <div className="RFQ-Card" key={index}>
                                <div className="container">
                                  <div className="row">
                                    <div className="col-10">
                                      <input type="checkbox" />
                                      <h5>Project Name : {elem.productName}</h5>
                                      <p>
                                        RFQ Create Date :{" "}
                                        {formatDate(elem.createdAt)}
                                      </p>
                                      <p>Created By : {elem.createdBy}</p>
                                      <h5>Status : {elem.status}</h5>
                                    </div>
                                    <div className="col-2">
                                      <button
                                        className="option-button"
                                        onClick={() =>
                                          handleViewRFQDetailsClick(elem)
                                        }
                                      >
                                        <FaEye />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-6">
                    <button
                      className="btn back-btn"
                      onClick={handleBackToDetails}
                    >
                      Back
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      className="btn back-btn"
                      disabled
                      onClick={handleBackToDetails}
                    >
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
                  <div
                    className="my-modal-content"
                    style={{ display: "flex-relative" }}
                  >
                    <h3 className="mb-2">User Profile</h3>
                    <p>Project Name: {rfqdata.projectName}</p>
                    <p>purpose Of Rfq: {rfqdata.purposeOfRfq}</p>
                    <p>Created At: {rfqdata.createdAt}</p>
                    <p>Created By: {rfqdata.createdBy}</p>
                    <p>Status: {rfqdata.status}</p>
                    <p>Customer Email Id: {rfqdata.email}</p>
                    <p>Customer Phone No.: {rfqdata.phoneNumber}</p>
                    <div>
                      {uploadRfq ? (
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {/* <p style={{ marginRight: '10px' }}>document: Yes</p> */}
                          <Link
                            href={`${spring_boot_url}api/rfqdoc/download/${rfqdata?.id}`}
                          >
                            <h3 style={{ marginRight: "10px" }}>
                              {" "}
                              Download Upload Documents
                            </h3>
                          </Link>
                        </div>
                      ) : (
                        <p></p>
                      )}
                    </div>
                    <div style={{ display: "flex" }}>
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
    );
  };

  return (
    <>
      <div className="">
        {showDetails ? renderDetails() : renderNewComponent()}
      </div>
    </>
  );
};

export default TenderContain;





// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
// import axios from "axios";
// import React, { useEffect, useRef, useState } from "react";
// import { FaEye } from "react-icons/fa";
// import spring_boot_url from "../../../Utils/springApi";
// import TenderNextStep from "./TenderNextStep";

// ////////changes/////////
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import IconButton from '@mui/material/IconButton';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// //////end///////////////


// const TenderContain = ({ rfq, tender }) => {
//   const [isDropdownVisible, setDropdownVisible] = useState(false);
//   const [showDetails, setShowDetails] = useState(true);
//   // const [userDe, setUserDe] = useState(true);
//   const [RFQDe, setRFQDe] = useState(true);
//   const [searchdata, setsearchdata] = useState(true); //true
//   const [searchRFQdata, setsearchRFQdata] = useState([]); //true
//   const [searchQuery, setSearchQuery] = useState(true);
//   const [searchRFQQuery, setSearchRFQQuery] = useState(true);
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState("All");
//   const [selectedUserData, setSelectedUserData] = useState(null);
//   const [showRFQ, setShowRFQ] = useState(true);
//   const [showUsers, setShowUsers] = useState(true);
//   const [showSearchCard, setShowSearchCard] = useState(false);
//   const [showBid, setShowBid] = useState(false);
//   const [nextButton, setNextButton] = useState(false);
//   const searchRef = useRef(null);
  
//   const [searchTerm, setSearchTerm] = useState("");
//   const [open, setOpen] = React.useState(false);
//   const [uploadRfq, setuploadRfq] = useState("");
//   const [rfqdata, ssetrfqdata] = useState(true);
//   const [searchResults, setSearchResults] = useState([]);
//   const [nextBtn, setnextBtn] = React.useState(false);
//   const [Tenderselectdata, setTenderselectdata] = useState("");
//   const [searchData, setSearchData] = useState(true );
//   const [openOption, setOpenOption] = React.useState(false); //new hook 

//   ///////////changes for checkbox///////////
//   const [selectedRFQ, setSelectedRFQ] = useState(null);
//   const [nextButtonDisabled, setNextButtonDisabled] = useState(true);

//   ///////////////////for new modal///////////
//  const [openTender, setOpenTender] = useState(false);
//  const [isModalOpen, setModalOpen] = useState(false);


//    ////////////////////changes///////////////

//    const [anchorEl, setAnchorEl] = React.useState(null);
//    // const open = Boolean(anchorEl);
 
//    const options = [
//      'View Bid',
//      'Delete',
//    ];
 
//    const ITEM_HEIGHT = 48;

//    const openModal = (userData) => {
//     console.log("modal open clicked", userData);
//     setSelectedUserData(userData);
//     setModalOpen(true);
//     //setOpen(true);
//     //setOpenOption(true);
//     ssetrfqdata(userData);
//   };

//   const closeModal = () => {
//     setSelectedUserData(null);
//     setModalOpen(false);
//   }
 
//    const handleClick = (event) => {
//      setAnchorEl(event.currentTarget);
//     setOpen(true);  //changes
//      //setOpenOption(true);
//    };

//    const handleClose = () => {
//      setAnchorEl(null);
//      setOpen(false); //changes
//        setuploadRfq(null);
//     setsearchdata(null);
//     setsearchRFQdata(null);
//    };

//    const handleOpen = (elem) => {
//     console.log("handleOpen");
//     setOpen(true);
//     //setOpenOption(true);
//     ssetrfqdata(elem);
//   };


//   // const handleOpenTender = (elem) => {
//   //   // setOpenTender(true);
//   //   setOpenTender(openTender);
//   //   //setModalOpen(true);
//   //   ssetrfqdata(elem);
//   //   console.log("handleOpenTender",openTender);
//   // }

//   // const handleCloseTender = () => {
//   //   setOpenTender(false);
//   // }
 
//    const handleOptionClick = (option,elem) => {
//      handleClose();
//     console.log("vdvvevvev", tender);
//     console.log("selected option", elem);
//      if (option === 'View Bid') {
//        // Handle view bid functionality
//       //  console.log("View Bid clicked for tender ID:", tender.userId);
//        console.log("View Bid clicked for rfq ID:", elem?.id);
//      }
//      else if (option === 'Delete') {
//        // Handle delete functionality
//        const isConfirmed = window.confirm("Are you sure you want to delete this tender?");
//        if (isConfirmed) {
//         axios.delete(`${spring_boot_url}api/tender/${elem.id}`)
//     .then(response => {
//       console.log("Tender deleted status", response.status);
//      //  onDeleteTender(elem.id);
//       const updatedTender = tender.filter(item => item.id !== elem.id);
//       settender(updatedTender);
//        // can be notify his info using noty

//        //curently tender is getting deleted but state is not updating we have to refesh the page to see the changes
//     })
//     .catch(error => {
//       console.error("Error deleting tender:", error);
//     });
//         console.log("implementing tender delete");
//        }
//      }
//    };

   

//   //  const onDeleteTender = (tenderId) => {
//   //   setTender((prevTenders) => prevTenders.filter((item) => item.id !== tenderId));
//   //  };
//    //////////////end////////////

//   // Function to handle RFQ selection
//   const handleRFQSelection = (elem) => {
    
//     if (selectedRFQ === elem) {
//       // If same checkbox clicked again, deselect it
//       setSelectedRFQ(null);
//       setNextButtonDisabled(true); // Disable the next button
//       //setTenderselectdata(elem); // Set the selected tender to pass as prop
//     } else {
//       setSelectedRFQ(elem);
//       setNextButtonDisabled(false); // Enable the next button
//     }
//     console.log("in handleRFQSelection", elem);
//     tendernext(elem);
//   };
//   ////////////end///////////

//   const handleClickOutside = (e) => {
//     if (searchRef.current && !searchRef.current.contains(e.target)) {
//       // Clicked outside the search card, close it
//       setShowSearchCard(false);
//     }
    
     
//     console.log("clicked outside tttt");
//   };
//   const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 400,
//     bgcolor: "background.paper",
//     border: "4px solid #ff8400",
//     boxShadow: 24,
//     p: 4,
//   };

//   // const handleClose = () => {
//   //   setOpen(false);
//   //   setuploadRfq(null);
//   //   setsearchdata(null);
//   //   setsearchRFQdata(null); 
//   // };

  
//   useEffect(() => {
//     document.addEventListener("click", handleClickOutside);
//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, []);

//   useEffect(() => {
//     const savedOption = localStorage.getItem("selectedOption");
//     if (savedOption) {
//       setSelectedOption(savedOption);
//     }
//   }, []);
  
//   const toggleFilterDropdown = () => {
//     setIsOpen(!isOpen);
//   };
//   const handleCreateTender = () => {
//     setShowDetails(false);
//   };
//   const toggleDropdown = () => {
//     setDropdownVisible(!isDropdownVisible);
//   };
//   // const handleOptionClick = (option) => {
//   //   console.log(`Option clicked: ${option}`);
//   //   setDropdownVisible(false);
//   // };
//   const handleBackToDetails = () => {
//     setShowDetails(true);
//   };
//   const openRFQDropdown = () => {
//     setShowRFQ(!showRFQ);
//   };
//   const openUsersDropdown = () => {
//     setShowUsers(!showUsers);
//   };
//   const handleSearchChange = (e) => {
//     // Clear searchdata if the input is empty
//     if (e.target.value.trim() === "") {
//       setSearchResults(null);
//     } else {
//       setSearchTerm(e.target.value);
//     }
//   };
//   // tender search start
//   const handleTenderSearchChange = (e) => {
//     if (e.target.value.trim() === "") {
//       setsearchdata(null);
//     } else {
//       setSearchQuery(e.target.value);
//       console.log("search Liist:-",e.target.value);
//       serachTender();
//     }
//   };

//   const serachTender = (e) => {
//     axios
//       .get(`${spring_boot_url}api/tender/find?query=${searchQuery}`)
//       .then((resp) => {
//         setsearchdata(resp.data);
//       });
//     console.log(searchQuery);
//   };

//   useEffect(() => {
//     const filterTenderData = tender?.filter((item) => {
//       return (
//         (item.RfqName &&
//           item.ProductName.toLowerCase().includes(searchTerm.toLowerCase())) ||
//         (item.email &&
//           item.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
//         (item.phoneNumber &&
//           item.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()))
//       );
//     });
//     setSearchData(filterTenderData);
    
//   }, [tender, searchTerm]);


//   // useEffect(() => {
//   //   // Filter tender data based on search term
//   //   const filterTenderData = () => {
//   //     if (!searchTerm.trim()) {
//   //       // If search term is empty, set search data to null
//   //       setsearchdata(null);
//   //       return;
//   //     }

//   //     const filteredData = tender.filter((item) => {
//   //       // Customize conditions based on your data structure
//   //       return (
//   //         (item.ProductName &&
//   //           item.ProductName.toLowerCase().includes(searchTerm.toLowerCase())) ||
//   //         (item.email &&
//   //           item.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
//   //         (item.phoneNumber &&
//   //           item.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()))
//   //       );
//   //     });
//   //     setSearchData(filteredData);
//   //   };

//   //   filterTenderData();
//   // }, [tender, searchTerm]);


//   // tender search end
//   const handleSearchRFQChange = (e) => {
//     // Clear searchdata if the input is empty
//     if (e.target.value.trim() === "") {
//       setsearchRFQdata(null);
//     } else {
//       // const query = e.target.value;
//       setSearchRFQQuery(e.target.value);
//     }
//   };
//   const handleModalClose = () => {
//     setModalOpen(false);
//   };
//   const handleViewDetailsClick = (userData) => {
//     openModal(userData);
//     setsearchdata(null);
//   };
//   const handleViewRFQDetailsClick = (elem) => {
//     console.log("handleViewRFQDetailsClick", elem);
//     openModal(elem);
//     setsearchRFQdata(null);
//   };
//   const handleTenderClick = (elem) => {
//     openModal(elem);  
    
//     //setOpen(true)
//     setOpenOption(true);
//     console.log("handleTenderClick", elem, "openOPTION", openOption);
    
//   }
//   const formatDate = (dateString) => {
//     const originalDate = new Date(dateString);
//     const day = originalDate.getDate();
//     const month = originalDate.getMonth() + 1; // Months are zero-indexed, so add 1
//     const year = originalDate.getFullYear() % 100; // Getting last two digits of the year
//     // Padding single digits with a leading zero
//     const formattedDay = day < 10 ? `0${day}` : day;
//     const formattedMonth = month < 10 ? `0${month}` : month;
//     const formattedYear = year < 10 ? `0${year}` : year;
//     return `${formattedDay}-${formattedMonth}-${formattedYear}`;
//   };
//   const handleBidClick = () => {
//     setShowBid(!showBid);
//   };
//   const handleNextButton = () => {
//     setNextButton(!nextButton);
//   };
  
  
//   // const handleRFQselectionAndTendernext = (elem) => {
//   //   console.log("in handleRFQselectionAndTendernext",elem);
//   //   handleRFQSelection(elem); 
//   //   tendernext(elem);
//   // }
  
//   const tendernext = (elem) => {
//     setTenderselectdata(elem);
// //setnextBtn(true);
//   };

//   /////////////////////////////////////////.."RFQ  Search Logic"../////////////////////////////////////////////////////////////////////////
//   useEffect(() => {
//     // Function to filter data based on search term
//     const filterData = () => {
//       const filteredData = rfq?.filter((item) => {
//         // Customize the conditions based on your data structure
//         return (
//           (item.projectName &&
//             item.projectName
//               .toLowerCase()
//               .includes(searchTerm.toLowerCase())) ||
//           (item.email &&
//             item.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
//           (item.phoneNumber &&
//             item.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()))
//         );
//       });
//       setSearchResults(filteredData);
//     };
//     filterData();
//   }, [rfq, searchTerm]);

//   useEffect(() => {
//   console.log("tenderContain tender data", tender);
//   console.log("tenderContain rfq data", rfq);
//   console.log("tenderContain search data", Tenderselectdata);
//   })

//   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//   const renderDetails = () => {
//     return (
//       <>
//         <div className="d-none d-xl-block d-md-block d-sm-none" >
//           <div className=" RFQ-card">
//             <div className="container">
//               <div className="row mt-5">
//                 <div className="col-2">
//                   <button
//                     className="btn register-btn"
//                     style={{ marginLeft: "6px", marginTop: "4px",  border: "1px solid black",
//                     borderRadius: "6px", }}
//                     onClick={handleCreateTender}
//                   >
//                     Create Tender
//                   </button>
//                 </div>
//                 <div className="col-10">
//                   <input
//                     type="search"
//                     className="form-control"
//                     onChange={handleTenderSearchChange}
//                     placeholder="Search Tender ..."
//                     aria-label="Search"
//                     style={{
//                       height: "40px",
//                       border: "1px solid black",
//                       borderRadius: "6px",
//                       marginLeft: "190px",
//                       width: "364px",
//                     }}
//                     // style={{
//                     //   height: "40px",
//                     //   border: "1px solid #ddd",
//                     //   borderRadius: "8px",
//                     // }}
//                   />
//                 </div>
//                 {/* mapping data */}
//                 {searchdata && searchdata.length === 0 && (
//                   <p style={{ color: "red" }}>No Tender found.</p>
//                 )}

//                 {searchdata && searchdata.length > 0 && (
//                   <div className="user-searchCard">
//                     {searchData.map((item, index) => (
//                       <div className="user-search" key={index}>
//                         {/* <p onClick={() => handleOpen(elem)}>{elem.productName}</p> */}
//                         <p onClick={() => handleOpen(item)}>
//                           Product Name :-{" "}{item?.ProductName}  
//                           {<br></br>}
//                           Email :-{" "}{item?.email} -
//                           {<br></br>} {" "}
//                           Phone Number :-{" "}{item?.phoneNumber}
//                         </p>
//                         <hr></hr>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//                  {/* mapping end */}
//               </div>
//               <div className="row mt-5 SI-table">
//                 <h2 className="mb-2">Tender List</h2>
//                 <table className="table">
//                   <thead className="table-header">
//                     <tr>
//                       <th>T.Id</th>
//                       <th>T.Name</th>
//                       <th>Tender Create Date</th>
//                       <th>Tender Closing Date</th>
//                       <th>Purpose</th>
//                       <th>Status</th>
//                       <th>View</th>
//                       <th>Options</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {Array.isArray(tender) &&
//                       tender.map((elem, index) => (
//                         <tr key={index + 1} className="table-row">
//                           <td>{elem.id}</td>
//                           <td>{elem.rfqName}</td>
//                           {/* <td>{elem.projectName}</td> */}
//                           <td>{formatDate(elem.createdAt)}</td>
//                           <td>{elem.tenderClosingDate}</td>
//                           <td>{elem.purpose}</td>
//                           <td>Pubished</td>
//                           <td>
//                           <button
//                               className="option-button"
//                                //onClick={() => handleViewRFQDetailsClick(elem)}
//                               //onClick={() => openModal(elem)}
//                                //onClick={() => handleTenderClick(elem)}
//                                //onClick={() => handleOpenTender(elem)}
//                                onClick={() => openModal(elem)}
//                             >
//                               <FaEye />
//                             </button>
//                           </td>
//                           <td style={{ position: "relative" }}>
//                           <IconButton
//                               aria-label="more"
//                               aria-controls="long-menu"
//                               aria-haspopup="true"
//                               onClick={handleClick}
//                             >
//                               <MoreVertIcon />
//                             </IconButton>
//                             {/* <IconButton onClick={() => handleOpenTenderClick(elem)}} */}
//                             <Menu
//                               id="long-menu"
//                               anchorEl={anchorEl}
//                               open={open}
//                               onClose={handleClose}
//                             >
//                               {options.map((option) => (
//                                 <MenuItem key={option} onClick={() => handleOptionClick(option,elem)}>
//                                   {option}
//                                 </MenuItem>
//                               ))}
//                             </Menu>
//                             {/* <button
//                               className="option-button"
//                               onClick={toggleDropdown}
//                             >
//                               <img
//                                 src="/option.svg"
//                                 width="20px"
//                                 height="20px"
//                                 alt="Options"
//                               />
//                             </button>
//                             {isDropdownVisible && (
//                               <div
//                                 className="options-card"
//                                 style={{
//                                   position: "absolute",
//                                   top: "100%",
//                                   left: "65px",
//                                   transform: "translateY(-100%)",
//                                   zIndex: "1",
//                                 }}
//                               >
//                                 <p onClick={handleBidClick}>View Bid</p>
//                                 <p>Delete</p>
//                               </div>
//                             )} */}
//                           </td>
    
//                         </tr>
//                       ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="d-block d-xl-none d-md-none d-sm-block">
//           <div className=" RFQ-card">
//             <div className="container-fluid">
//               <div className="row mt-5">
//                 <div className="col-5">
//                   <button
//                     className="btn register-btn"
//                     onClick={handleCreateTender}
//                   >
//                     Create Tender
//                   </button>
//                 </div>
//                 <div className="col-6">
//                   <input
//                     type="search"
//                     className="form-control"
//                     placeholder="Search Tender ..."
//                     aria-label="Search"
//                     style={{
//                       // height: "40px",
//                       // border: "1px solid #ddd",
//                       // borderRadius: "8px",
                   
//                         height: "40px",
//                         border: "1px solid black",
//                         borderRadius: "6px",
//                         marginLeft: "400px",
//                         width: "10px"
//                     }}
//                   />
//                 </div>
//               </div>
//               <div className="row mt-5 SI-table">
//                 <h2 className="mb-2">Tender List</h2>
//                 <div className="col-12">
//                   <div className="RFQ-Card">
//                     <div className="container">
//                       <div className="row">
//                         <div className="col-10">
//                           <h5> RFQ Name:</h5>
//                           <p className="mt-1">Tender Create Date : </p>
//                           <p>Status:</p>
//                           <p>No.of Bids:</p>
//                         </div>
//                         <div className="col-2">
//                         <button
//                               className="option-button"
//                               // onClick={() => handleOpen(elem)}
//                               //onClick={() => openModal(elem)}
//                              // onClick={() => handleTenderClick(elem)}
//                               //onClick={() => handleOpenTender(elem)}
//                               onClick={() => openModal(elem)}
//                             >
//                               <FaEye />
//                             </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   };

//   const renderNewComponent = () => {
//     return (
//       <>
//         {nextButton ? (
//           <TenderNextStep Tenderselectdata={Tenderselectdata} />
//         ) : (
//           <>
//             <div className="d-none d-xl-block d-md-block d-sm-none">
//               <div className="fluid-container">
//                 <div className="row">
//                   <div className="col-12">
//                     <h2 className="mb-2 mt-2">RFQ List</h2>
//                     <div className="row mt-2">
//                       <input
//                         type="search"
//                         className="form-control"
//                         placeholder="Search RFQ ..."
//                         aria-label="Search"
//                         style={{
//                           height: "40px",
//                           border: "1px solid #ddd",
//                           borderRadius: "8px",
//                         }}
//                         onChange={handleSearchChange}
//                       />
//                       {searchResults && searchResults.length === 0 && (
//                         <p style={{ color: "red" }}>No RFQ found.</p>
//                       )}
//                       {searchResults && searchResults.length > 0 && (
//                         <div className="user-searchCard">
//                           {searchResults.map((item, index) => (
//                             <div className="user-search" key={index}>
//                               {/* <p onClick={() => handleOpen(elem)}>{elem.productName}</p> */}
//                               <p onClick={() => handleOpen(item)}>
//                                 {item?.projectName} - {item?.email} -{" "}
//                                 {item?.phoneNumber}
//                               </p>
//                               <hr></hr>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                     <div className="row mt-2  SI-table">
//                       {searchResults?.length > 0 ? (
//                         <>
//                           <div className="RFQ-Card">
//                             {searchResults.map((elem, index) => (
//                               <div className="RFQ-Card" key={index}>
//                                 <div className="container">
//                                   <div className="row">
//                                     <div className="col-10">
//                                       <input
//                                         type="checkbox"

//                                         //changes
//                                         checked={selectedRFQ === elem } //  RFQ is selected
                                        
//                                         onChange={() => handleRFQSelection(elem)} // Update the selected RFQ
//                                         //end

//                                         // onChange={() => tendernext(elem)}
//                                       />
//                                       <h5>Project Name : {elem.productName}</h5>
//                                       <p>
//                                         RFQ Create Date :{" "}
//                                         {formatDate(elem.createdAt)}
//                                       </p>
//                                       <p>Created By : {elem.createdBy}</p>
//                                       <h5>Status : {elem.status}</h5>
//                                     </div>
//                                     <div className="col-2">
//                                       <button
//                                         className="option-button"
//                                         onClick={() => handleOpen(elem)}
//                                         //onClick={() => handleViewRFQDetailsClick(elem)}
//                                       >
//                                         <FaEye />
//                                       </button>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </>
//                       ) : (
//                         <>
//                           {Array.isArray(rfq) &&
//                             rfq.map((elem, index) => (
//                               <div className="RFQ-Card" key={index}>
//                                 <div className="container">
//                                   <div className="row">
//                                     <div className="col-10">
//                                       <input
//                                         type="checkbox"

//                                         //changes
//                                         checked={selectedRFQ === elem} // Check if the RFQ is selected
//                                         onChange={() => handleRFQSelection(elem)} // Update the selected RFQ
//                                         //end

//                                         //onChange={() => tendernext(elem)}
//                                       />
//                                       <h5>Project Name : {elem.productName}</h5>
//                                       <p>
//                                         RFQ Create Date :{" "}
//                                         {formatDate(elem.createdAt)}
//                                       </p>
//                                       <p>Created By : {elem.createdBy}</p>
//                                       <h5>Status : {elem.status}</h5>
//                                     </div>
//                                     <div className="col-2">
//                                       <button
//                                         className="option-button"
//                                         onClick={() => handleOpen(elem)}
//                                       >
//                                         <FaEye />
//                                       </button>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             ))}
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="row mt-2">
//                   <div className="col-10"></div>
//                   <div className="col-1">
//                     <button
//                       className="btn back-btn"
//                       onClick={handleBackToDetails}
//                     >
//                       Back
//                     </button>
//                   </div>
//                   <div className="col-1">
//                     {/* <button className="btn back-btn" onClick={handleNextButton}>
//                       Next
//                     </button> */}

//                     {/* ///////////RFQ List Next Button////////// */}
//                      <button className="btn back-btn" onClick={handleNextButton} disabled={nextButtonDisabled}>
//                      Next
//                     </button>
                    
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="d-block d-xl-none d-md-none d-sm-block">
//               <div className="container-fluid">
//                 <h2 className="mb-2 mt-2">RFQ List</h2>
//                 <div className="row mt-2">
//                   <div className="col-11">
//                     <input
//                       type="search"
//                       className="form-control"
//                       placeholder="Search RFQ ..."
//                       aria-label="Search"
//                       style={{
//                         height: "40px",
//                         border: "1px solid #ddd",
//                         borderRadius: "8px",
//                       }}
//                       onChange={handleSearchChange}
//                     />
//                     {searchResults && searchResults.length === 0 && (
//                       <p style={{ color: "red" }}>No RFQ found.</p>
//                     )}
//                     {searchResults && searchResults.length > 0 && (
//                       <div className="user-searchCard">
//                         {searchResults.map((item, index) => (
//                           <div className="user-search" key={index}>
//                             {/* <p onClick={() => handleOpen(elem)}>{elem.productName}</p> */}
//                             <p onClick={() => handleOpen(item)}>
//                               {item?.projectName} - {item?.email} -{" "}
//                               {item?.phoneNumber}
//                             </p>
//                             <hr></hr>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                   <div className="row">
//                     <div className="mobile-userCard">
//                       {searchResults?.length > 0 ? (
//                         <>
//                           <div className="RFQ-Card">
//                             {searchResults.map((elem, index) => (
//                               <div className="RFQ-Card" key={index}>
//                                 <div className="container">
//                                   <div className="row">
//                                     <div className="col-10">
//                                       <input type="checkbox" />
//                                       <h5>Project Name : {elem.productName}</h5>
//                                       <p>RFQ Create Date : {elem.createdAt}</p>
//                                       <p>Created By : {elem.createdBy}</p>
//                                       <h5>Status : {elem.status}</h5>
//                                     </div>
//                                     <div className="col-2">
//                                       <button
//                                         className="option-button"
//                                         onClick={() =>
//                                           handleViewRFQDetailsClick(elem)
//                                         }
//                                       >
//                                         <FaEye />
//                                       </button>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </>
//                       ) : (
//                         <>
//                           {Array.isArray(rfq) &&
//                             rfq.map((elem, index) => (
//                               <div className="RFQ-Card" key={index}>
//                                 <div className="container">
//                                   <div className="row">
//                                     <div className="col-10">
//                                       <input type="checkbox" />
//                                       <h5>Project Name : {elem.productName}</h5>
//                                       <p>
//                                         RFQ Create Date :{" "}
//                                         {formatDate(elem.createdAt)}
//                                       </p>
//                                       <p>Created By : {elem.createdBy}</p>
//                                       <h5>Status : {elem.status}</h5>
//                                     </div>
//                                     <div className="col-2">
//                                       <button
//                                         className="option-button"
//                                         onClick={() =>
//                                           handleViewRFQDetailsClick(elem)
//                                         }
//                                       >
//                                         <FaEye />
//                                       </button>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             ))}
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="row mt-5">
//                   <div className="col-6">
//                     <button
//                       className="btn back-btn"
//                       onClick={handleBackToDetails}
//                     >
//                       Back
//                     </button>
//                   </div>
//                   <div className="col-6">
//                     <button
//                       className="btn back-btn"
//                       disabled
//                       onClick={handleBackToDetails}
//                     >
//                       Send
//                       {/* Next */}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <Modal
//                 keepMounted
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="keep-mounted-modal-title"
//                 aria-describedby="keep-mounted-modal-description"
//               >
//                 <Box sx={style}>
//                   <div
//                     className="my-modal-content"
//                     style={{ display: "flex-relative" }}
//                   >
//                     <h3 className="mb-2">User Profile</h3>
//                     <p>Project Name: {rfqdata.projectName}</p>
//                     <p>purpose Of Rfq: {rfqdata.purposeOfRfq}</p>
//                     <p>Created At: {rfqdata.createdAt}</p>
//                     <p>Created By: {rfqdata.createdBy}</p>
//                     <p>Status: {rfqdata.status}</p>
//                     <p>Customer Email Id: {rfqdata.email}</p>
//                     <p>Customer Phone No.: {rfqdata.phoneNumber}</p>
//                     <div>
//                       {uploadRfq ? (
//                         <div style={{ display: "flex", alignItems: "center" }}>
//                           {/* <p style={{ marginRight: '10px' }}>document: Yes</p> */}
//                           <Link
//                             href={`${spring_boot_url}api/rfqdoc/download/${rfqdata?.id}`}
//                           >
//                             <h3 style={{ marginRight: "10px" }}>
//                               {" "}
//                               Download Upload Documents
//                             </h3>
//                           </Link>
//                         </div>
//                       ) : (
//                         <p></p>
//                       )}
//                     </div>
//                     <div style={{ display: "flex" }}>
//                       <button>Edit</button>
//                       <button>Delete</button>
//                       <button onClick={handleClose}>Close</button>
//                     </div>
//                   </div>
//                 </Box>
//               </Modal>
//             </div>

//         {/* /////////New Modal///////////// */}
//             <div>
//               <Modal
//                 keepMounted
//                 //open={openTender}
//                 open={isModalOpen}
//                 onClose={closeModal}
//                 //onClose={handleCloseTender}
//                 aria-labelledby="keep-mounted-modal-title"
//                 aria-describedby="keep-mounted-modal-description"
//               >
//                 <Box sx={style}>
//                   <div
//                     className="my-modal-content"
//                     style={{ display: "flex-relative" }}
//                   >
//                     <h3 className="mb-2">User Profile</h3>
//                     <p>Project Name: {rfqdata.projectName}</p>
//                     <p>purpose Of Rfq: {rfqdata.purposeOfRfq}</p>
//                     <p>Created At: {rfqdata.createdAt}</p>
//                     <p>Created By: {rfqdata.createdBy}</p>
//                     <p>Status: {rfqdata.status}</p>
//                     <p>Customer Email Id: {rfqdata.email}</p>
//                     <p>Customer Phone No.: {rfqdata.phoneNumber}</p>
//                     <div>
//                       {uploadRfq ? (
//                         <div style={{ display: "flex", alignItems: "center" }}>
//                           {/* <p style={{ marginRight: '10px' }}>document: Yes</p> */}
//                           <Link
//                             href={`${spring_boot_url}api/rfqdoc/download/${rfqdata?.id}`}
//                           >
//                             <h3 style={{ marginRight: "10px" }}>
//                               {" "}
//                               Download Upload Documents
//                             </h3>
//                           </Link>
//                         </div>
//                       ) : (
//                         <p></p> 
//                       )}
//                     </div>
//                     <div style={{ display: "flex" }}>
//                       <button>Edit</button>
//                       <button>Delete</button>
//                       <button onClick={handleClose}>Close</button>
//                     </div>
//                   </div>
//                 </Box>
//               </Modal>
//             </div>
//             {/* /////////////////////New Modal end//////////////////// */}
//           </>
//         )}
//       </>
//     );
//   };

//   return (
//     <>
//       <div className="">
//         {showDetails ? renderDetails() : renderNewComponent()}
//       </div>
//     </>
//   );
// };

// export default TenderContain;




