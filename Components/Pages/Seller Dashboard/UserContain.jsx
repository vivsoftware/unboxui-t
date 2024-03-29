import { useDispatch } from 'react-redux';
import spring_boot_url from '../../../Utils/springApi';
import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FaEye } from "react-icons/fa";
import ModalComponent from '../Admin Dashboard/ModalComponent';
import DashboardLoader  from '../../Element/DashboardLoader';

const UserContain = ({userId} , registeredUser, userDe)=> {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [searchdata, setsearchdata] = useState(true);
  const [userDet, setUserDet] = useState(null);
  const [searchQuery, setSearchQuery] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('All');
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState(null);
  // const [registeredUsers, setRegisteredUsers] = useState(null); 

  const openModal = (userData) => {
    setSelectedUserData(userData);
    setModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const savedOption = localStorage.getItem('selectedOption');
    if (savedOption) {
      setSelectedOption(savedOption);
    }
    allUsers();
    //getRegisteredUsers();
  }, []);

  const toggleFilterDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleFilterOptionClick = (option) => {
    setSelectedOption(option);
    setModalOpen(false);
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
  {
    Array.isArray(userDet) && userDet.map((elem, index) => (
      <tr key={index + 1}>
        <td>{index + 1}</td>
        <td>{elem.name}</td>
        <td>{elem.email}</td>
        <td>{elem.city}</td>
        <td>
          <img src="/option.svg" alt={`Option for ${elem.name}`} width="20px" height="20px" />
        </td>
      </tr>
    ))
  }
  const toggleDropdown = () => {
    setDropdownVisible((prevState) => !prevState);
  };

  const handleOptionClick = (option) => {
    console.log(`Option clicked: ${option}`);
    setDropdownVisible(false);
    if (option === 'view') {
      setShowDetails(false);
    }
  };

  const handleBackClick = () => {
    setShowDetails(true);
  };

  const dispatch = useDispatch();
  const handleModal = () => {
    dispatch({ type: "REGISTERSIMODAL" });
  };

//  console.log("registered user in usercontain",registeredUser);
//  console.log("registered user in usercontain",userDe);
//   const getRegisteredUsers = () => {
//     axios.get(`${spring_boot_url}api/registerId/?registerId=${registeredUser.id}`)
//       .then(resp => {
//         console.log("registered user",resp.data.json);
        
//       });
//   };

  const allUsers = () =>{
    axios.get(`${spring_boot_url}api/adminuser/allusers`)
    .then(resp => {
      console.log(resp.data.json);
      localStorage.setItem("data", JSON.stringify(resp.data));
      setUserDet(resp.data);
    });
  }
  const seller = () => {
    axios.get(`${spring_boot_url}api/adminuser/search?query=seller`)
      .then(resp => {
        console.log(resp.data.json);
        setUserDet(resp.data);
      });
  }
  const buyer = () => {
    axios.get(`${spring_boot_url}api/adminuser/search?query=buyer`)
      .then(resp => {
        console.log(resp.data.json);
        setUserDet(resp.data);
      });
  }
  const serviceProvider = () => {
    axios.get(`${spring_boot_url}api/adminuser/search?query=service provider`)
      .then(resp => {
        console.log(resp.data.json);
        setUserDet(resp.data);
      });
  }
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
  if(!userDet){
    return(
      <>
      <div className='SI-card'>
        <div className='d-none d-xl-block d-md-block d-sm-none'>
          <div className='container'>
        <div className='row mt-5 '>
          <div className='col-2'>
            <button className='btn register-btn' onClick={handleModal} >Register User</button>
          </div>
          <div className='col-7'>
            <input
             
              type="search"
              className="form-control"
              placeholder="Search User ..."
              aria-label="Search"
              style={{ height: '40px', border: "1px solid #ddd", borderRadius: '8px' }}
              onChange={handleSearchChange}
            />
            {searchdata && searchdata.length === 0 && (
              <p style={{ color: 'red' }}>No SI found.</p>
            )}
            {searchdata && searchdata.length > 0 && (
              <div className='user-searchCard'>
                {searchdata.map((elem, index) => (
                  <div className='user-search' key={index}>
                    <p onClick={() => handleViewDetailsClick(elem)}>{elem.firstName}</p>
                    <hr></hr>
                  </div>
                  
                ))}
              </div>
            )}
          </div>                                                                                
          <div className='col-3'>
        <div className='custom-dropdown'>
          <button className='btn filter-btn' onClick={toggleFilterDropdown}>
          Filter({selectedOption})
          </button>
          {isOpen && (
            <div className='custom-dropdown-menu'>
              <div className='custom-dropdown-item' onClick={() => handleFilterOptionClick('All')}>
                All
              </div>
              <div className='custom-dropdown-item' onClick={() => handleFilterOptionClick('Seller')}>
                Seller
              </div>
              <div className='custom-dropdown-item' onClick={() => handleFilterOptionClick('Buyer')}>
                Buyer
              </div>
              <div className='custom-dropdown-item' onClick={() => handleFilterOptionClick('Service Provider')}>
                Service Provider
              </div>
            </div>
          )}
        </div>
      </div>
        </div>
        <div className='row mt-5 SI-table'>
        <h2 className='mb-2'>Users List</h2>
          <table className="table ">
            <thead className='table-header'>
              <tr>
                <th>Sr.No</th>
                <th>Name</th>
                <th>User Id</th>
                <th>Email Id</th>
                <th>Phone No.</th>
                <th>Company Name</th>
                <th>Type</th>
                <th>View</th>
              </tr>
            </thead>
          </table>
          <DashboardLoader/>
        </div>
        </div>
        </div>
        <div className='d-block d-xl-none d-md-none d-sm-block'>
          <div className='container'>
        <div className='row mt-5 '>
          <div className='col-4'>
            <button className='btn register-btn' onClick={handleModal}>Register User</button>
          </div>
          <div className='col-6 ms-3'>
        <div className='custom-dropdown'>
          <button className='btn filter-btn' onClick={toggleFilterDropdown}>
          Filter({selectedOption})
          </button>
          {isOpen && (
            <div className='custom-dropdown-menu'>
              <div className='custom-dropdown-item' onClick={() => handleFilterOptionClick('All')}>
                All
              </div>
              <div className='custom-dropdown-item' onClick={() => handleFilterOptionClick('Seller')}>
                Seller
              </div>
              <div className='custom-dropdown-item' onClick={() => handleFilterOptionClick('Buyer')}>
                Buyer
              </div>
              <div className='custom-dropdown-item' onClick={() => handleFilterOptionClick('Service Provider')}>
                Service Provider
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
      <div className='row mt-1'>
          <div className='col-11'>
            <input
              type="search"
              className="form-control"
              placeholder="Search User ..."
              aria-label="Search"
              style={{ height: '40px', border: "1px solid #ddd", borderRadius: '8px' }}
              onChange={handleSearchChange}
            />
            {searchdata && searchdata.length === 0 && (
              <p style={{ color: 'red' }}>No SI found.</p>
            )}
            {searchdata && searchdata.length > 0 && (
              <div className='user-searchCard'>
                {searchdata.map((elem, index) => (
                  <div className='user-search' key={index}>
                    <p onClick={() => handleViewDetailsClick(elem)}>{elem.firstName}</p>
                    <hr></hr>
                  </div>
                  
                ))}
              </div>
            )}
          </div>                                                                                
          
        </div>
        <div className='row mt-5 SI-table'>
        <h2 className='mb-2'>Users List</h2>
        <div className='col-12'>
           <DashboardLoader/>
            </div>
         
        </div>
        </div>
        </div>
      </div>
    </>
    )
             }
  
  return (
    <>
      <div className='SI-card'>
        <div className='d-none d-xl-block d-md-block d-sm-none'>
          <div className='container'>
        <div className='row mt-5 '>
          <div className='col-2'>
            <button className='btn register-btn' onClick={handleModal} >Register User</button>
          </div>
          <div className='col-7'>
            <input
              type="search"
              className="form-control"
              placeholder="Search User ..."
              aria-label="Search"
              style={{ height: '40px', border: "1px solid #ddd", borderRadius: '8px' }}
              onChange={handleSearchChange}
            />
            {searchdata && searchdata.length === 0 && (
              <p style={{ color: 'red' }}>No SI found.</p>
            )}
            {searchdata && searchdata.length > 0 && (
              <div className='user-searchCard'>
                {searchdata.map((elem, index) => (
                  <div className='user-search' key={index}>
                    <p onClick={() => handleViewDetailsClick(elem)}>{elem.firstName}</p>
                    <hr></hr>
                  </div>
                  
                ))}
              </div>
            )}
          </div>                                                                                
          <div className='col-3'>
        <div className='custom-dropdown'>
          <button className='btn filter-btn' onClick={toggleFilterDropdown}>
          Filter({selectedOption})
          </button>
          {isOpen && (
            <div className='custom-dropdown-menu'>
              <div className='custom-dropdown-item' onClick={() => handleFilterOptionClick('All')}>
                All
              </div>
              <div className='custom-dropdown-item' onClick={() => handleFilterOptionClick('Seller')}>
                Seller
              </div>
              <div className='custom-dropdown-item' onClick={() => handleFilterOptionClick('Buyer')}>
                Buyer
              </div>
              <div className='custom-dropdown-item' onClick={() => handleFilterOptionClick('Service Provider')}>
                Service Provider
              </div>
            </div>
          )}
        </div>
      </div>
        </div>
        <div className='row mt-5 SI-table'>
        <h2 className='mb-2'>Users List</h2>
          <table className="table ">
            <thead className='table-header'>
              <tr>
                <th>Sr.No</th>
                <th>Name</th>
                <th>User Id</th>
                <th>Email Id</th>
                <th>Phone No.</th>
                <th>Company Name</th>
                <th>Type</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(userDet) && userDet.map((elem, index) => (
                <tr key={index + 1} className='table-row'>
                  <td>{index + 1}</td>
                  <td>{elem.firstName}</td>
                  <td>{elem.id}</td>
                  <td>{elem.email}</td>
                  <td>{elem.phoneNumber}</td>
                  <td>{elem.company}</td>
                  <td>{elem.userTypes}</td>
                  <td> 
                    <button className="option-button" onClick={() => handleViewDetailsClick(elem)}>
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ModalComponent
        isOpen={isModalOpen}
        onClose={handleModalClose}
        userData={selectedUserData}
      />
        </div>
        </div>
        </div>
        <div className='d-block d-xl-none d-md-none d-sm-block'>
          <div className='container'>
        <div className='row mt-5 '>
          <div className='col-4'>
            <button className='btn register-btn' onClick={handleModal}>Register User</button>
          </div>
          <div className='col-6 ms-3'>
        <div className='custom-dropdown'>
          <button className='btn filter-btn' onClick={toggleFilterDropdown}>
          Filter({selectedOption})
          </button>
          {isOpen && (
            <div className='custom-dropdown-menu'>
              <div className='custom-dropdown-item' onClick={() => handleFilterOptionClick('All')}>
                All
              </div>
              <div className='custom-dropdown-item' onClick={() => handleFilterOptionClick('Seller')}>
                Seller
              </div>
              <div className='custom-dropdown-item' onClick={() => handleFilterOptionClick('Buyer')}>
                Buyer
              </div>
              <div className='custom-dropdown-item' onClick={() => handleFilterOptionClick('Service Provider')}>
                Service Provider
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
      <div className='row mt-1'>
          <div className='col-11'>
            <input
              type="search"
              className="form-control"
              placeholder="Search User ..."
              aria-label="Search"
              style={{ height: '40px', border: "1px solid #ddd", borderRadius: '8px' }}
              onChange={handleSearchChange}
            />
            {searchdata && searchdata.length === 0 && (
              <p style={{ color: 'red' }}>No SI found.</p>
            )}
            {searchdata && searchdata.length > 0 && (
              <div className='user-searchCard'>
                {searchdata.map((elem, index) => (
                  <div className='user-search' key={index}>
                    <p onClick={() => handleViewDetailsClick(elem)}>{elem.firstName}</p>
                    <hr></hr>
                  </div>
                  
                ))}
              </div>
            )}
          </div>                                                                                
          
        </div>
        <div className='row mt-5 SI-table'>
        <h2 className='mb-2'>Users List</h2>
        <div className='col-12'>
           {Array.isArray(userDet) && userDet.map((elem, index) =>
              <div className='RFQ-Card' key={index}>
                <div className='container'>
                <div className='row'>
                  <div className='col-10'>
                    <h5>Name : {elem.firstName}</h5>
                    <p className='mt-1'>Email Id : {elem.email}</p>
                    <p>Phone No. : {elem.phoneNumber}</p>
                    <p>Company Name : {elem.companyName}</p>
                    <p>User Type : {elem.userTypes}</p>
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
            </div>
          <ModalComponent
        isOpen={isModalOpen}
        onClose={handleModalClose}
        userData={selectedUserData}
      />
        </div>
        </div>
        </div>
      </div>
    </>
  )

}







export default UserContain;
