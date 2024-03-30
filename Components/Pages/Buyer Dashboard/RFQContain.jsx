import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { FaEye } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import spring_boot_url from '../../../Utils/springApi';
import ViewRFQModal from '../Admin Dashboard/ViewRFQModal';
const RFQContain = ({ rfq }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [userDe, setUserDe] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [searchQuery, setSearchQuery] = useState(true);
  const [searchdata, setsearchdata] = useState(true);
  const [rfqdata, ssetrfqdata] = useState(true);
  const [uploadRfq, setuploadRfq] = useState("");
  const searchRef = useRef(null);
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  
  const searchInputRef = useRef(null);

  const openModal = (userData) => {
    setSelectedUserData(userData);
    setModalOpen(true);
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
    if (open === true) {

      if (rfqdata && rfqdata.id) {
        // axios.get(`${spring_boot_url}api/${rfqdata.id}/download`)
        axios.get(`${spring_boot_url}api/rfqdoc/download/${rfqdata.id}`)
          .then(resp => {
            console.log(resp.data.json);
            localStorage.setItem("data", JSON.stringify(resp.data));
            setuploadRfq(resp.data);
          })
          .catch(error => {
            // Handle errors if needed
            console.error("Error fetching data:", error);
          });
      }
    }
    // Make sure rfqdata.id exists before making the request

  },); // Include rfqdata.id as a dependency



  const toggleDropdown = () => {
    setDropdownVisible((prevState) => !prevState);
  };

  const handleOptionClick = (option) => {
    console.log(`Option clicked: ${option}`);
    setDropdownVisible(false);

  };
  {
    Array.isArray(rfq) && rfq.map((elem, index) => (
      <tr key={index + 1}>
        <td>{index + 1}</td>
        <td>{elem.productName}</td>
        <td>{elem.createdAt}</td>
        <td>{elem.createdBy}</td>
        <td>{elem.status}</td>
        <td><button className="option-button">
          <FaEye />
        </button></td>
      </tr>
    ))
  }
  const dispatch = useDispatch();
  const handleCreateRFQModal = (userDe) => {
    dispatch({ type: "CREATERFQMODAL" });

  };
  const handleUploadRFQModal = () => {
    dispatch({ type: "UPLOADRFQMODAL" });
  };
  const handleModalRFQ = () => {
    dispatch({ type: "ALLRFQMODAL" });
  };
  const updateModalSI = () => {
    dispatch({ type: "UPDATESIMODAL" });
  };

  // useEffect(() => {
  //   axios.get(`${spring_boot_url}api/userRfq`)
  //     .then(resp => {
  //       console.log(resp.data.json);
  //       localStorage.setItem("data", JSON.stringify(resp.data));
  //       setUserDe(resp.data);
  //     });
  // }, []);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleViewDetailsClick = (userData) => {
    openModal(userData);
    setSearchResults(null);
  };
  const handleSearchChange = (e) => {
    const searchTerm = event.target.value.trim();
    setSearchTerm(searchTerm);
    setShowSearchResults(searchTerm !== ''); // Show search results only if search term is not empty

    // Filter data based on search term
    const filteredData = rfq?.filter(item => (
      (item.projectName && item.projectName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.email && item.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.phoneNumber && item.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()))
    ));
    setSearchResults(filteredData);

  };



  // const handleSearchChange = (event) => {
  //   const searchTerm = event.target.value.trim();
  //   setSearchTerm(searchTerm);
  
  //   // Filter data based on search term
  //   const filteredData = rfq?.filter(item => (
  //     (item.projectName && item.projectName.toLowerCase().includes(searchTerm.toLowerCase())) ||
  //     (item.email && item.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
  //     (item.phoneNumber && item.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()))
  //   ));
  //   setSearchResults(filteredData);
  // };
  

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




  const handleItemClick = (selectedItem) => {
    setuserId(selectedItem.id)
    setphoneNumber(selectedItem.phoneNumber)
    setemail(selectedItem.email)
    setSelectedItem((prevSelectedItem) =>
      prevSelectedItem === selectedItem.firstName ? '' : selectedItem.firstName
    );
    setShowSearchCard(false); // Hide search card when an item is clicked
    setSearchOpen(false);
  };


  return (
    <>
      <div className='d-none d-xl-block d-md-block d-sm-none'>
        <div className='container RFQ-card'>
          <div className='row mt-5'>
            <div className='col-2 '>
              <button className='btn register-btn'
              style={{ marginLeft: "6px", marginTop: "4px",  border: "1px solid black",
              borderRadius: "6px", }} 
              onClick={handleCreateRFQModal}               
              // style={{ marginLeft: '6px', marginTop: '60px' }}
              >Create RFQ</button>
            </div>
            <div className='col-10 '>
              <input
                type="search"
                className="form-control"
                placeholder="Search RFQ ..."
                aria-label="Search"
                style={{
                  height: "40px",
                  border: "1px solid black",
                  borderRadius: "6px",
                  marginLeft: "120px",
                  width: "364px",
                }}
                // style={{ height: '40px', border: "1px solid #ddd", borderRadius: '8px', marginLeft: '-230px' }}
                onChange={handleSearchChange}
              />
              {
                searchTerm && (
                  <>
                    {searchResults && searchResults.length === 0 && (
                      <p style ={{color:'red'}}>No RFQ Found</p>
                    )}

                    {searchResults && searchResults.length > 0 && (
                      <div className='user-searchCard'>
                        {searchResults.map((item, index) => (
                          <div className='user-search' key={index}>
                            <p onClick={() => handleItemClick(item)}>
                              {item.email} 
                            </p>  
                            <hr></hr>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )
              }
            </div>
          </div>
          {/* //desktopview */}
          <div className='row mt-5 SI-table'>
            <h2 className='mb-2'>RFQ List</h2>
            <table className="table  ">
              <thead className='table-header'>
                <tr>
                  <th>Sr.No</th>
                  <th>Project Name</th>
                  <th>RFQ Create Date</th>
                  <th>Created By</th>
                  <th>Customer Email Id</th>
                  <th>Customer Phone No.</th>
                  <th>Status</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(rfq) && rfq.map((elem, index) => (
                  <tr key={index + 1} className='table-row'>
                    <td>{index + 1}</td>
                    <td>{elem.projectName}</td>
                    <td>{formatDate(elem.createdAt)}</td>
                    <td>{elem.createdBy}</td>
                    <td>{elem.email}</td>
                    <td>{elem.phoneNumber}</td>
                    <td>{elem.status}</td>
                    <td>
                      <button className="option-button" onClick={() => handleOpen(elem)}>
                        {/* <button onClick={handleOpen}>Open modal</button> */}
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ViewRFQModal
              isOpen={isModalOpen}
              onClose={handleModalClose}
              userData={selectedUserData}
            />
          </div>
        </div>
      </div>
      <div className=' flex d-block d-xl-none d-md-none d-sm-block'>
        <div className='RFQ-card'>
          <div className='container-fluid'>
            <div className='row mt-5'>
              <div className='col-5 '>
                <button className='btn register-btn' onClick={handleCreateRFQModal}>Create RFQ</button>
              </div>
              <div className='col-6 '>
                {/* <input
                  ref={searchRef}
                  type="search"
                  className="form-control"
                  placeholder="Search RFQ ..."
                  aria-label="Search"
                  style={{ height: '40px', border: "1px solid #ddd", borderRadius: '8px' }}
                  onChange={handleSearchChange}
                />
                {searchdata && searchdata.length === 0 && (
                  <p style={{ color: 'red' }}>No RFQ found.</p>
                )}
                {searchdata && searchdata.length > 0 && (
                  <div className='user-searchCard'>
                    {searchdata.map((elem, index) => (
                      <div className='user-search' key={index}>
                        <p onClick={() => handleOpen(elem)}>{elem.productName}</p>
                        <hr></hr>
                      </div>
                    ))}
                  </div>
                    )} */}
              </div>
            </div>
            {/* mobile view */}
            <div className='row mt-5'>
              <h2 className='mb-2'>RFQ List</h2>
              {Array.isArray(rfq) && rfq.map((elem, index) =>
                <div key={index}>
                  <div className='rfqsmobile'>
                    <div className='row'>
                      <div className='col-10'>

                        <h5>Project Name : {elem.projectName}</h5>
                        <p>RFQ Create Date : {formatDate(elem.createdAt)}</p>
                        <p>Created By : {elem.createdBy}</p>
                        <p>Customer Name : {elem.name}</p>
                        <p>Customer Email : {elem.email}</p>
                        <p>Customer Phone No. : {elem.phoneNumber}</p>
                        <p>Status:{elem.status}</p>
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
            </div>
          </div>
        </div>
      </div>
      {/* /////////////////////////////////////////////////////////rfq view poupmodal code////////////////////////////////////////////////////// */}
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

export default RFQContain
