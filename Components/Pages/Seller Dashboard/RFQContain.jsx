import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEye } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import spring_boot_url from '../../../Utils/springApi';
import DashboardLoader from '../../Element/DashboardLoader';
import ViewRFQModal from '../Admin Dashboard/ViewRFQModal';


const RFQContain = ({rfq,tender}) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [userDe, setUserDe] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [searchQuery, setSearchQuery] = useState(true);
  const [searchdata, setsearchdata] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const openModal = (userData) => {
    setSelectedUserData(userData);
    setModalOpen(true);
  };

  const toggleDropdown = () => {
    setDropdownVisible((prevState) => !prevState);
  };

  const handleOptionClick = (option) => {
    console.log(`Option clicked: ${option}`);
    setDropdownVisible(false);

  };
  {
    Array.isArray(userDe) && userDe.map((elem, index) => (
      <tr key={index + 1}>
        <td>{index + 1}</td>
        <td>{elem.productName}</td>
        <td>{elem.createdAt}</td>
        <td>{elem.createdBy}</td>
        <td>{elem.status}</td>
        <td>{elem.name}</td>
        <td>{elem.email}</td>
        <td>{elem.phoneNumber}</td>
        <td><button className="option-button">
          <FaEye />
        </button></td>
      </tr>
    ))
  }
  const dispatch = useDispatch();
  const handleCreateRFQModal = () => {
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

  useEffect(() => {
    axios.get(`${spring_boot_url}api/userRfq`)
      .then(resp => {
        console.log(resp.data.json);
        localStorage.setItem("data", JSON.stringify(resp.data));
        setUserDe(resp.data);
      });
  }, []);
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleViewDetailsClick = (userData) => {
    openModal(userData);
    setsearchdata(null);
  };
  const handleSearchChange = (e) => {
    // Clear searchdata if the input is empty
    if (e.target.value.trim() === '') {
      setsearchdata(null);
    } else {
      // const query = e.target.value;
      setSearchQuery(e.target.value);
      searchRFQ()
    }
  };
  const searchRFQ = (e) => {
    axios.get(`${spring_boot_url}api/userRfq/search?query=${searchQuery}`)
      .then(resp => {
        setsearchdata(resp.data);
      });
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


//////////////rfq search logic//////////////////

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


  console.log("sellerrfqqqq", rfq)
  if(!userDe) {
    return (
      <>
      <div className='d-none d-xl-block d-md-block d-sm-none'>
        <div className='container RFQ-card'>
          <div className='row mt-5'>
            <div className='col-2 '>
              <button className='btn register-btn' 
                 style={{ marginLeft: "6px", marginTop: "4px",  border: "1px solid black",
                 borderRadius: "6px", }}
              onClick={handleCreateRFQModal}>Create RFQ</button>
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
                // style={{ height: '40px', border: "1px solid #ddd", borderRadius: '8px' }}
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
  
          </div>
          <div className='row mt-5 SI-table'>
            <h2 className='mb-2'>RFQ List</h2>
            <table className="table  ">
              <thead className='table-header'>
                <tr>
                  <th>Sr.No</th>
                  <th>Project Name</th>
                  <th>RFQ Create Date</th>
                  <th>Created By</th>
                  <th>Status</th>
                  <th>Customer Name</th>
                  <th>Customer Email Id</th>
                  <th>Customer Phone No.</th>
                  <th>Options</th>
                </tr>
              </thead>
             
            </table>
           <DashboardLoader/>
          </div>
        </div>
        </div>
        <div className='d-block d-xl-none d-md-none d-sm-block'>
        <div className='RFQ-card'>
          <div className='container-fluid'>
          <div className='row mt-5'>
            <div className='col-5 '>
              <button className='btn register-btn' 
                style={{ marginLeft: "6px", marginTop: "4px",  border: "1px solid black",
                borderRadius: "6px", }}
              onClick={handleCreateRFQModal}>Create RFQ</button>
            </div>
  
            <div className='col-6 '>
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

                // style={{ height: '40px', border: "1px solid #ddd", borderRadius: '8px' }}
                onChange={handleSearchChange}
              />
              {searchdata && searchdata.length === 0 && (
                <p style={{ color: 'red' }}>No RFQ found.</p>
              )}
              {searchdata && searchdata.length > 0 && (
                <div className='user-searchCard'>
                  {searchdata.map((elem, index) => (
                    <div className='user-search' key={index}>
                      <p onClick={() => handleViewDetailsClick(elem)}>{elem.productName}</p>
                      <hr></hr>
                    </div>
                    
                  ))}
                </div>
              )}          
              </div>
  
          </div>
           <div className='row mt-5'>
              <h2 className='mb-2'>RFQ List</h2>
              <DashboardLoader/>
            </div>
          </div>
        </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className='RFQ-card'>
        <div className='d-none d-xl-block d-md-block d-sm-none'>
          <div className='row mt-5'>
            <div className='col-2'>
              <button className='btn register-btn' 
                style={{ marginLeft: "6px", marginTop: "4px",  border: "1px solid black",
                borderRadius: "6px", }}
              onClick={handleCreateRFQModal}>Create RFQ</button>
            </div>

            <div className='col-10'>
              <input
                type="search"
                className="form-control"
                placeholder="Search RFQ ..."
                aria-label="Search"
                style={{
                  height: "40px",
                  border: "1px solid black",
                  borderRadius: "6px",
                  marginLeft: "210px",
                  width: "364px",
                }}
                // style={{ height: '40px', border: "1px solid #ddd", borderRadius: '8px' }}
                onChange={handleSearchChange}
              />
              {searchdata && searchdata.length === 0 && (
                <p style={{ color: 'red' }}>No RFQ found.</p>
              )}
              {searchdata && searchdata.length > 0 && (
                <div className='user-searchCard'>
                  {searchdata.map((elem, index) => (
                    <div className='user-search' key={index}>
                      <p onClick={() => handleViewDetailsClick(elem)}>{elem.productName}</p>
                      <hr></hr>
                    </div>

                  ))}
                </div>
              )}
            </div>
          </div>
          <div className='row mt-5 SI-table'>
            <h2 className='mb-2'>RFQ List</h2>
            <table className="table  ">
              <thead className='table-header' style={{borderRadius:'12px'}}>
                <tr>
                  <th>Sr.No</th>
                  <th>Project Name</th>
                  <th>RFQ Create Date</th>
                  <th>Created By</th>
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
                    <td>{elem.status}</td>
                    <td>
                      <button className="option-button" onClick={() => handleViewDetailsClick(elem)}>
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

        <div className='d-block d-xl-none d-md-none d-sm-block'>
      <div className='RFQ-card'>
        <div className='container-fluid'>
        <div className='row mt-5'>
          <div className='col-5 '>
            <button className='btn register-btn' onClick={handleCreateRFQModal}>Create RFQ</button>
          </div>

          <div className='col-6 '>
          <input
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
                    <p onClick={() => handleViewDetailsClick(elem)}>{elem.productName}</p>
                    <hr></hr>
                  </div>
                  
                ))}
              </div>
            )}          
            </div>

        </div>
         <div className='row mt-5'>
            <h2 className='mb-2'>RFQ List</h2>
            {Array.isArray(rfq) && rfq.map((elem, index) =>
              <div className='RFQ-Card' key={index}>
                <div className='container'>
                <div className='row'>
                  <div className='col-10'>
                    
                    <h5>Project Name : {elem.projectName}</h5>
                    <p>RFQ Create Date : {formatDate(elem.createdAt)}</p>
                    <p>Created By : {elem.createdBy}</p>
                    <p>Customer Name : {elem.name}</p>
                    <p>Customer Email : {elem.email}</p>
                    <p>Customer Phone No. : {elem.phoneNumber}</p>
                    <h5>Status : {elem.status}</h5>
                  </div>
                  <div className='col-2'>
                  <button className="option-button" onClick={() => handleViewDetailsClick(elem)}>
                        <FaEye />
                      </button>
                  </div>
                </div>
                </div>
              </div>
            )}
            <ViewRFQModal
              isOpen={isModalOpen}
              onClose={handleModalClose}
              userData={selectedUserData}
            />
          </div>
        </div>
      </div>
      </div>

      </div>
    </>
  )
}

export default RFQContain
