import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import spring_boot_url from '../../../Utils/springApi';

import { toast } from 'react-toastify';
import ModalComponent from './ModalComponent';
const BSMContain = ({ Tender, Rfq }) => {
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
  const searchRef = useRef(null);
  const [body1, setbody1] = useState(null);
  const [body2, setbody2] = useState(null);
  const [body3, setbody3] = useState(null);
  const [body4, setbody4] = useState(null);
  const [body5, setbody5] = useState(null);
  const [loader, setloader] = useState(false);
  const [mailId, setmailId] = useState(null);
  const [searchTenderQuery, setTenderSearchQuery] = useState(true);
  const [searchTenderdata, setsearchTenderdata] = useState(true);
  const [selectTender, setselectTender] = useState(false);
  const [selectTenderdata, setselectTenderdata] = useState(false);
  const [selectUser, setselectUser] = useState(false);
  const [selectUserdata, setselectUserdata] = useState(false);
  const [tenderDe, setTenderDe] = useState(true);


  //     ///////////changes for checkbox///////////
  const [selectedTender, setSelectedTender] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);

  // Function to handle Tender & User selection
  const handleTenderSelection = (elem) => {
    if (selectedTender === elem) {
      // If same checkbox clicked again, deselect it
      setSelectedTender(null);
     // setNextButtonDisabled(true); // Disable the next button
    } else {
      setSelectedTender(elem);
      //setNextButtonDisabled(false); // Enable the next button
    }
  };
  const handleUserSelection = (elem) => {
    if (selectedUser === elem) {
      // If same checkbox clicked again, deselect it
      setSelectedUser(null);
      //setNextButtonDisabled(true); // Disable the next button
    } else {
      setSelectedUser(elem);
      //setNextButtonDisabled(false); // Enable the next button
    }
  };

//   ////////////end///////////

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
    setDropdownVisible((prevState) => !prevState);
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

  const handleTenderSearchChange = (e) => {
    // Clear searchdata if the input is empty
    if (e.target.value.trim() === "") {
      setsearchdata(null);
    } else {
      // const query = e.target.value;
      setTenderSearchQuery(e.target.value);
      searchTender();
    }
  };

  const searchTender = (e) => {
    axios
      .get(`${spring_boot_url}api/tender/find?query=${searchTenderQuery}`) //chnaged
      .then((resp) => {
        console.log("tender serach reslut :- ", resp.data);
        console.log(resp.data.json);
        setTenderDe(resp.data);

        setsearchTenderdata(resp.data);
      });
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




  //////////////////////////////////////////////////////////////send email to user//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const SelecTender = (elem) => {
    setselectTender(true);
    setselectTenderdata(elem);

  }
  const UnSelecTender = () => {
    setselectTender(false);
    setselectTenderdata(null);
    // setmailId(null)

  }
  const SelecUser = (elem) => {
    setselectUser(true);
    setselectUserdata(elem);

  }
  const UnSelecUser = () => {
    setselectUser(false);
    setselectUserdata(null)
    // setmailId(null)

  }



  const savaeEmail = async (e) => {
    <loadermail />
    setmailId(mailId);
    console.log("mailId at savaeEmail", mailId);

    setbody1("Hi.... " + `${selectUserdata.firstName}`, +" a new tender has been received. Please find details and for more information check your respective dashboard.");
    setbody2(`Tender Name ${selectTenderdata.purpose}`)
    setbody3(`Tender delivery date ${selectTenderdata.deliveryDate}`)
    setbody4(`this mail is send by unboxindustry.com Admin`)
    setbody5(`please loging Yourself to unboxindusty.com`)
    toast(`Wait...`, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
    const formdata = new FormData();
    // formdata.append("fileName", "file");
    formdata.append('body1', body1);
    formdata.append('body2', body2);
    formdata.append('body3', body3);
    formdata.append('body4', body4);
    formdata.append('body5', body5);
    formdata.append('subject', 'Tender ');
    // formdata.append('files', SelectedFile);
    // formdata.fileName('fileName' , fileName);
    try {
      const response = await axios.post(`${spring_boot_url}api/mails/save`, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File uploaded successfully:', response.data);
      setmailId(response.data.id)
      setloader(true)
      toast.success(`Sending...........`, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      sendmail();
      toggle();
    } catch (error) {
      // setDocError(true)
      console.error('Error uploading file:', error);
      // toast.error('Error uploading file. Please try again.', {
      //   position: toast.POSITION.BOTTOM_CENTER,
      // });
    };
  }



  const sendmail = async (e) => {
    const formdata = new FormData();
    // formdata.append("fileName", "file");
    formdata.append('to', `${selectUserdata.email}`);

    // formdata.append('files', SelectedFile);
    // formdata.fileName('fileName' , fileName);
    try {
      console.log('File uploaded successfully:', mailId);
      //temp fix
      const response = await axios.post(`${spring_boot_url}api/mails/send/${mailId+1}`, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File uploaded successfully:', response.data);
      console.log("checking response status", response.status);
      if(response.status === 201){
        console.log("mail send successfully");
        toast.success(`Email sende to ${selectUserdata.email}`, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        console.log("implementing auto delete(checking)");  // implementing
        deleteMail(mailId+1); //temp fix :- to delete current mail after sending 

      }
      
      // Assuming handleReload and toggle are functions defined in your component
      // handleReload();
      toggle();
    } catch (error) {
      // setDocError(true)
      // console.error('Error uploading file:', error);
      // toast.error('Error uploading file. Please try again.', {
      //   position: toast.POSITION.BOTTOM_CENTER,
      // });
    };
  }

  const deleteMail = async (mailId) => {
    console.log("Id of mail to be deleted", mailId);
    try{

      const response = await axios.delete(`${spring_boot_url}api/mails/delete/${mailId}`);
      console.log("delete mail status", response.status);
      console.log("mail will be deleted successfully in five seconds");
    }
    catch(err){
      console.log(err);
    }
  }

  console.log("tenderbms", selectTenderdata)
  console.log("userbms", selectUserdata)
  console.log("mailid", mailId)


  return (
    <>
      <div className='d-none d-xl-block d-md-block d-sm-none'>
        <div className='fluid-container'>
          <div className='row mt-5'>
            <div className='col-5'>
              <h2 className='mb-2 mt-2'>Tender List</h2>
              <div className='row mt-2'>
                <input
                  type="search"
                  className="form-control otp-phone"
                  placeholder="Search Tender ..."
                  aria-label="Search"
                  style={{ height: '40px', border: "1px solid #ddd", borderRadius: '8px' }}
                  onChange={handleTenderSearchChange}
                />
                {searchTenderdata && searchTenderdata.length === 0 && (
                  <p style={{ color: 'red' }}>No Tender found.</p>
                )}
                {searchTenderdata && searchTenderdata.length > 0 && (
                  <div className='user-searchCard'>
                    {searchTenderdata.map((elem, index) => (
                      <div className='user-search' key={index}>
                        <p onClick={() => handleViewRFQDetailsClick(elem)}>{elem.purpose}</p>
                        <hr></hr>
                      </div>

                    ))}
                  </div>
                )}

                <div className='row mt-2  SI-table'>

                  {Array.isArray(Tender) && Tender.map((elem, index) =>
                    <div className='RFQ-Card' key={index}>
                      <div className='container'>
                        <div className='row'>
                          <div className='col-10'>
                            <input type='checkbox' 
                             //changes
                              checked={selectedTender === elem} //  RFQ is selected
                              onChange={() => handleTenderSelection(elem)} // Update the selected RFQ
                            //end
                            
                            // onChange={(event) => {
                            //   if (event.target.checked) {
                            //     SelecTender(elem);
                            //   } else {
                            //     UnSelecTender();
                            //   }
                            // }} 
                            />
                            <h5>TName : {elem.purpose}</h5>
                            <h5>Email Id : {elem.email}</h5>
                            <h5>Phone No. : {elem.phoneNumber}</h5>
                            <h5>Tender Id. : {elem.id}</h5>
                          </div>
                          <div className='col-2'>
                            <button className="option-button" 
                            //onClick={() => handleOpen(elem)}
                            onClick={() => handleViewDetailsClick(elem)}
                            >
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

            <div className='col-2 '></div>
            <div className='col-5 '>
              <h2 className='mb-2 mt-2'>Users List</h2>
              <div className='row mt-2'>
                <div className='col-8'>
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search User ..."
                    aria-label="Search"
                    style={{ height: '40px', border: '1px solid #ddd', borderRadius: '8px' }}
                    onChange={handleSearchChange}
                    onClick={() => setShowSearchCard(true)}
                  />
                  {showSearchCard && (
                    <div className="user-searchCard" ref={searchRef}>
                      {searchdata.length === 0 && <p style={{ color: 'red' }}>No SI found.</p>}
                      {searchdata.length > 0 && (
                        <div className="user-searchCard">
                          {searchdata.map((elem, index) => (
                            <div className="user-search" key={index}>
                              <p onClick={() => handleViewDetailsClick(elem)}>{elem.firstName}</p>
                              <hr />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className='col-4'>
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

                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className='row mt-2  SI-table'>
                {searchdata?.length > 0 ? (
                  <>
                    <div className='RFQ-Card'>
                      {searchdata.map((elem, index) => (
                        <div className='RFQ-Card' key={index}>
                          <div className='container'>
                            <div className='row'>
                              <div className='col-10'>
                                <input type='checkbox'
                                
                                onChange={() => SelecUser(elem)} />

                                <h5>Name : {elem.firstName}</h5>
                                <p>Email Id : {elem.email}</p>
                                <h5>Phone No. : {elem.phoneNumber}</h5>
                                <p>Company Name : {elem.companyName}</p>
                                <p>User Type : {elem.userTypes}</p>
                              </div>
                              <div className='col-2'>
                                <button className="option-button" 

                                onClick={() => handleViewDetailsClick(elem)}>
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
                      {Array.isArray(userDe) && userDe.map((elem, index) =>
                        <div className='RFQ-Card' key={index}>
                          <div className='container'>
                            <div className='row'>
                              <div className='col-10'>
                                <input type='checkbox' 
                                  //changes
                                  checked={selectedUser === elem} // Check if the RFQ is selected
                                  onChange={() => handleUserSelection(elem)} // Update the selected RFQ
                                 //end
                                
                                // onChange={(event) => {
                                //   if (event.target.checked) {
                                //     SelecUser(elem);
                                //   } else {
                                //     UnSelecUser();
                                //   }
                                // }} 
                                />
                                {/* <p key={index + 1}>{index + 1} </p> */}
                                <h5>Name : {elem.firstName}</h5>
                                <p>Email Id : {elem.email}</p>
                                <h5>Phone No. : {elem.phoneNumber}</h5>
                                <p>Company Name : {elem.companyName}</p>
                                <p>User Type : {elem.userTypes}</p>
                              </div>
                              <div className='col-2'>
                                <button className="option-button" 
                                 //onClick={() => handleOpen(elem)}

                                
                              onClick={() => handleViewDetailsClick(elem)}
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

                <ModalComponent
                  isOpen={isModalOpen}
                  onClose={handleModalClose}
                  userData={selectedUserData}
                />
              </div>


            </div>
          </div>
          <div className='row mt-2'>
            <div className='col-10'></div>
            <div className='col-1'>
              {/* <button className='btn back-btn' onClick={sendmail}>
                Back
              </button> */}
            </div>
            <div className='col-1'>

              {/* {selectTender && selectUser ? ( */}
              {selectedTender && selectedUser ? (

                <button className='btn back-btn' onClick={savaeEmail}>
                  Send
                </button>

              ) : (
                <button className=' unsend-btn' onClick={() => alert('Please select your choice first !')}>
                  Send
                </button>

              )}
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
                                <input type='checkbox' 
                                />
                                <h5>Project Name : {elem.productName}</h5>
                                <p>RFQ Create Date : {formatDate(elem.createdAt)}</p>
                                <p>Created By : {elem.createdBy}</p>
                                <h5>Status : {elem.status}</h5>
                              </div>
                              <div className='col-2'>
                                <button className="option-button" 
                                
                                onClick={() => handleViewRFQDetailsClick(elem)}>
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
            <h2 className='mb-2 mt-2'>Users List</h2>
            <div className='col-5'>
              <input
                type="search"
                className="form-control"
                placeholder="Search User ..."
                aria-label="Search"
                style={{ height: '40px', border: '1px solid #ddd', borderRadius: '8px' }}
                onChange={handleSearchChange}
                onClick={() => setShowSearchCard(true)}
              />
              {showSearchCard && (
                <div className="user-searchCard" ref={searchRef}>
                  {searchdata.length === 0 && <p style={{ color: 'red' }}>No SI found.</p>}
                  {searchdata.length > 0 && (
                    <div className="user-searchCard">
                      {searchdata.map((elem, index) => (
                        <div className="user-search" key={index}>
                          <p onClick={() => handleViewDetailsClick(elem)}>{elem.firstName}</p>
                          <hr />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className='col-7'>
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




            <div className='row'>

              <div className='mobile-userCard'>
                {searchdata?.length > 0 ? (
                  <>
                    <div className='RFQ-Card'>
                      {searchdata.map((elem, index) => (
                        <div className='RFQ-Card' key={index}>
                          <div className='container'>
                            <div className='row'>
                              <div className='col-10'>
                                <input type='checkbox' 
                                
                                  //changes
                                  checked={selectedUser === elem} // Check if the RFQ is selected
                                  onChange={() => handleUserSelection(elem)} // Update the selected RFQ
                                 //end
                                />
                                {/* <p key={index + 1}>{index + 1} </p> */}
                                <h5>Name : {elem.firstName}</h5>
                                <p>Email Id : {elem.email}</p>
                                <h5>Phone No. : {elem.phoneNumber}</h5>
                                <p>Company Name : {elem.companyName}</p>
                                <p>User Type : {elem.userTypes}</p>
                              </div>
                              <div className='col-2'>
                                <button className="option-button" 
                                //onClick={() => handleOpen(elem)}
                                  
                                  onClick={() => handleViewDetailsClick(elem)}
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
                      {Array.isArray(userDe) && userDe.map((elem, index) =>
                        <div className='RFQ-Card' key={index}>
                          <div className='container'>
                            <div className='row'>
                              <div className='col-10'>
                                <input type='checkbox' 
                                  //changes
                                  checked={selectedUser === elem} // Check if the RFQ is selected
                                  onChange={() => handleUserSelection(elem)} // Update the selected RFQ
                                 //end
                                
                                />
                                {/* <p key={index + 1}>{index + 1} </p> */}
                                <h5>Name : {elem.firstName}</h5>
                                <p>Email Id : {elem.email}</p>
                                <h5>Phone No. : {elem.phoneNumber}</h5>
                                <p>Company Name : {elem.companyName}</p>
                                <p>User Type : {elem.userTypes}</p>
                              </div>
                              <div className='col-2'>
                                <button className="option-button" 
                               // onClick={() => handleOpen(elem)}
                                
                                onClick={() => handleViewDetailsClick(elem)}
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
          <div className='row mt-5'>
            <div className='col-6'>
              <button className='btn back-btn' onClick={handleBackToDetails}>
                Back
              </button>
            </div>
            {selectTender === true ? (

              <div className='col-6'>
                <button className='btn back-btn' onClick={handleBackToDetails}>
                  Send
                </button>
              </div>

            ) : (
              <div className='col-6'>
                <button className='btn back-btn' disabled onClick={handleBackToDetails}>
                  Send
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default BSMContain



