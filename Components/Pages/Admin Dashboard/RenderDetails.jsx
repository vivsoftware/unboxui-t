import React, { useEffect, useRef, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import BidContain from './BidContain';
import TenderNextStep from './TenderNextStep';
import axios from 'axios';
// import RenderNewComponent from './renderNewComponent';
import RenderNewComponent from './RenderNewComponent';
import spring_boot_url from '../../../Utils/springApi';


////////changes/////////
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
//////end///////////////



const RenderDetails = ({ tender, tenderBids, formatDate, handleBidClick, tenderBack, userDe }) => {
  const [showBid, setShowBid] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isNewComponentVisible, setNewComponentVisible] = useState(false);
  const [tenderbid, settenderbid] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [rfqdata, setrfqdata] = useState(true);
  const [searchData, setSearchData] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState(true);
  const [searchdata, setsearchdata] = useState(true);
  const userId = userDe?.id;

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
  };


  const handleOptionClick = (option, tenderId) => {
    handleClose();

    if (option === 'View Bid') {
      // Handle view bid functionality
      console.log("View Bid clicked for tender ID:", tenderId);
    }
    else if (option === 'Delete') {
      // Handle delete functionality
      const isConfirmed = window.confirm("Are you sure you want to delete this tender?");
      if (isConfirmed) {
        axios.delete(`${spring_boot_url}/tender/${tenderId}`)
          .then(response => {
            console.log("Tender deleted successfully:", response.data);
          })
          .catch(error => {
            console.error("Error deleting tender:", error);
          });
      }
    }
  };
  //////////////end////////////

  //Fixing Back Button Start\\
  useEffect(() => {

    setShowBid(false);
    setShowDetails(true);
    setDropdownVisible(false);
    setNewComponentVisible(false);
    // settenderbid(null);
    setOpen(false);
    setrfqdata(true);

    /// end
    settenderbid(tender);
  }, [tender, tenderBids, tenderBack]);

  const handleCreateTender = () => {
    // setShowDetails(false);
    //setShowDetails(false);
    setNewComponentVisible(true);
    console.log("clicked create tender");
    console.log("show deatils state: ", showDetails);
  };

  //Fixig Back Button End not done yet\\


  //tender search start\\



  const handleTenderSearchChange = (e) => {
    if (e.target.value.trim() === "") {
      setsearchdata(null);
    } else {
      setSearchQuery(e.target.value);
      serachTender();
    }
  };
  // useEffect(() => {
  //     axios.get(`${spring_boot_url}api/userRfq/${userId}`)
  //       .then(resp => {
  //         setRFQ(resp.data);
  //       })
  //       .catch(error => {
  //         console.error('Error fetching user RFQ data:', error);
  //       });
  //   }, [userId]);



  // const serachTender = (e) => {
  //   axios.get(`${spring_boot_url}api/userRfq/${userId}`)
  //     .then((resp) => {
  //       setsearchdata(resp.data);
  //       console.log("search Liist:-",resp.data);
  //     });
  //     console.log("search Liist:-",searchQuery);
  // };



  // fetching all data from db fix it to fetch only data of logged in user  \\
  const serachTender = (e) => {
    axios
      .get(`${spring_boot_url}api/tender/find?query=${searchQuery}`)
      .then((resp) => {
        setsearchdata(resp.data);
        console.log("search Liist:-", resp.data);
      });
    console.log("search Liist:-", searchQuery);
  };

  const searchTender = async (query) => {
    try {
      const resp = await axios.get(
        `${spring_boot_url}api/tender/find?query=${query}`
      );
      setSearchData(resp.data);
    } catch (error) {
      console.error("Error searching tender:", error);
    }
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
  //tender search end\\

  useEffect(() => {
    // Function to fetch and set tender bids
    const fetchAndSetTenderBid = async (tenderId) => {
      try {
        const response = await axios.get(
          `${spring_boot_url}api/sellersbid/${tenderId}`
        );
        settenderbid((prevBids) => ({
          ...prevBids,
          [tenderId]: response.data.length,
        }));
      } catch (error) {
        console.error("Error fetching seller bids:", error);
      }
    };
    // Iterate over each tender and fetch its bids
    Array.isArray(tender) &&
      tender.forEach((elem) => {
        fetchAndSetTenderBid(elem.id);
      });
  }, [tender]);

  // const handleClose = () => {
  //   setOpen(false);
  //   setuploadRfq(null);
  // };

  useEffect(() => {
    axios.get(`${spring_boot_url}api/sellersbid/get-all-bids`).then((resp) => {
      // console.log(resp.data.json);
      settenderbid(resp.data);
    });
  }, [tenderbid]);


  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleOpen = (elem) => {
    setOpen(true);
    setrfqdata(elem);
    console.log(elem);
    console.log("clicked open");
  };

  console.log("tender in RenderDetails tenderBack", tenderBack);
  console.log("tender in RenderDetails tender", tender);

  return (
    <>
      {isNewComponentVisible ? (
        <RenderNewComponent
          tender={tender}
          handleBackToDetails={() => setNewComponentVisible(false)}
        />
      ) : (
        <>
          <div className="d-none d-xl-block d-md-block d-sm-none">
            <div className=" RFQ-card">
              <div className="container">
                <div className="row mt-5">
                  <div className="col-2">
                    <button
                      className="btn register-btn"
                      onClick={handleCreateTender}
                      style={{ marginLeft: "6px", marginTop: "4px",  border: "1px solid black",
                      borderRadius: "6px", }}
                      // style={{ marginLeft: "6px", marginTop: "60px" }}
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
                        marginLeft: "120px",
                        width: "364px",
                      }}
                      // style={{
                      //   height: "40px",
                      //   border: "1px solid #ddd",
                      //   borderRadius: "8px",
                      //   marginLeft: "-230px",
                      // }}
                    />
                  </div>
                  {/*Search Mapping Data */}
                  {searchdata && searchdata.length === 0 && (
                    <p style={{ color: "red" }}>No Tenders Found</p>
                  )}

                  {searchdata && searchdata.length > 0 && (
                    <div className="user-searchCard">
                      {searchdata.map((item, index) => (
                        <div className="user-search" key={index}>
                          {/* <p onClick={() => handleOpen(elem)}>{elem.productName}</p> */}
                          <p onClick={() => handleOpen(item)}>
                            Rfq Name :- {item?.rfqName}
                            {<br></br>}
                            Email :-{""} {item?.email} -
                            {<br></br>}
                            Phone Number :-{" "}{item?.phoneNumber}
                          </p>
                          <hr></hr>
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Search mapping end */}
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
                        {/* <th>Status</th> */}
                        <th>Purpose</th>
                        <th>Status</th>
                        <th>{"View"}</th>
                        <th>Options</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(tender) && tender.map((elem, index) => (

                        <tr key={index + 1} className="table-row">
                          <td>{elem.id}</td>
                          <td>{elem.rfqName}</td>
                          <td>{formatDate(elem.createdAt)}</td>
                          <td>{elem.tenderClosingDate}</td>
                          <td>{elem.purpose}</td>
                          <td>Pubished</td>


                          <td>
                            <button
                              className="option-button"
                            onClick={() => handleOpen(elem)}
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
                                <MenuItem key={option} onClick={() => handleOptionClick(option, tender.id)}>
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
                                <p onClick={handleOpen}>View Tender</p>
                                <p>Delete</p>
                              </div>
                            )} */}
                          </td>
                          <td></td>
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
                        marginLeft: "120px",
                        width: "364px",
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
                            <h5>RFQ Name : </h5>
                            <p className="mt-1">Tender Create Date : </p>
                            <p>Status : </p>
                            <p>No. of Bids : </p>
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
      )}
    </>
  );
};

export default RenderDetails;


// import React, { useEffect, useRef, useState } from "react";
// import { FaEye } from "react-icons/fa";
// import BidContain from "./BidContain";
// import TenderNextStep from "./TenderNextStep";
// import axios from "axios";
// import RenderNewComponent from "./RenderNewComponent";
// import spring_boot_url from "../../../Utils/springApi";

// ////////changes/////////
// import IconButton from '@mui/material/IconButton';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

// //////end///////////////

// //check component how many renders ouccring and check stats and data in each render.
// // to fix the issue of re-rendering.

// const RenderDetails = ({
//   tender,
//   tenderBids,
//   handleBidClick,
//   handleBackToDetails,
//   tenderBack,
//   formatDate,
//   //handleBidDelete,  
// }) => {
//   const [showBid, setShowBid] = useState(false);
//   const [showDetails, setShowDetails] = useState(true);
//   const [isDropdownVisible, setDropdownVisible] = useState(false);
//   const [isNewComponentVisible, setNewComponentVisible] = useState(false);
//   const [tenderbid, settenderbid] = React.useState(null);
//   const [open, setOpen] = React.useState(false);
//   const [rfqdata, setrfqdata] = useState(true);
//   const [renderNewComponent, setRenderNewComponent] = useState(false); 


//   ////////////////////changes///////////////

//   const [anchorEl, setAnchorEl] = React.useState(null);
//   // const open = Boolean(anchorEl);

//   const options = [
//     'View Bid',
//     'Delete',
//   ];

//   const ITEM_HEIGHT = 48;

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//     setOpen(true);  //changes
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//     setOpen(false); //changes
//   };


//   const handleOptionClick = (option,rfq,tender) => {
//     handleClose();

//     if (option === 'View Bid') {
//       // Handle view bid functionality
//       console.log("View Bid clicked for tender ID:", tenderId);
//     }
//     else if (option === 'Delete') {
//       // Handle delete functionality
//       const isConfirmed = window.confirm("Are you sure you want to delete this tender?");
//       if (isConfirmed) {
//         axios.delete(`${spring_boot_url}api/tender/${tenderId}`)
//           .then(response => {
//             console.log("Tender deleted successfully:", response.data);
//           })
//           .catch(error => {
//             console.error("Error deleting tender:", error);
//           });
//       }
//     }
//   };
//   //////////////end////////////


//   useEffect(() => {
//     // const handleIsComponentVisible = () => {
//     //     setNewComponentVisible(false);
//     // }

//     // console.log("tender in all tab contain",tender);
//     // handleIsComponentVisible();

//     /// changes
//     setShowBid(false);
//     setShowDetails(true);
//     setDropdownVisible(false);
//     setNewComponentVisible(false);
//     // settenderbid(null);
//     setOpen(false);
//     setrfqdata(true);
//     /// end

//    settenderbid(tender);
//   }, [tender, tenderBids, tenderBack]);



//     const handleCreateTender = () => {
//       //setShowDetails(false);
//       setNewComponentVisible(true);
//       console.log("clicked create tender");
//       console.log("show deatils state: ", showDetails);
//     }; 

//   //   const handleBackToDetails = () => {
//   //   setShowDetails(true);
//   // };

//   const toggleDropdown = () => {
//     setDropdownVisible(!isDropdownVisible);
//   };

//   const handleOpen = (elem) => {
//     setOpen(true);
//     setrfqdata(elem);
//     console.log(elem);
//     console.log("clicked open");
//   };

//   //////////////////changes//////////////////
//   // const handleDelete = (tender) => {
//   //   const isConfirmed = window.confirm("Are you sure you want to delete this tender?");

//   //   if (isConfirmed) {
//   //     axios.delete(`${spring_boot_url}/tender/${tender.id}`)
//   //       .then(response => {
//   //         console.log("Tender deleted successfully:", response.data);
//   //       })
//   //       .catch(error => {
//   //         console.error("Error deleting tender:", error);
//   //       });
//   //   }
//   // }
//   //////////////////end////////////////////


//   console.log("tender in RenderDetails tender", tender);
//   return (
//     <>
//       {isNewComponentVisible ? (
//         <RenderNewComponent tender={tender} />
//       ) : (
//         <>
//           <div className="d-none d-xl-block d-md-block d-sm-none">
//             <div className=" RFQ-card">
//               <div className="container">
//                 <div className="row mt-5">
//                   <div className="col-2">
//                     <button
//                       className="btn register-btn"
//                       onClick={handleCreateTender}
//                       // onClick={() => handleCreateTender(tender)}
//                       style={{ marginLeft: "6px", marginTop: "4px",  border: "1px solid black",
//                       borderRadius: "6px", }}
//                     >
//                       Create Tender
//                     </button>
//                   </div>
//                   <div className="col-10">
//                     <input
//                       type="search"
//                       className="form-control"
//                       placeholder="Search Tender ..."
//                       aria-label="Search"
//                       style={{
//                         height: "40px",
//                         border: "1px solid black",
//                         borderRadius: "6px",
//                         marginLeft: "120px",
//                         width: "364px",
//                       }}
//                     />
//                   </div>
//                 </div>
//                 <div className="row mt-5 SI-table">
//                   <h2 className="mb-2">Tender List</h2>
//                   <table className="table">
//                     <thead className="table-header" style={{}}>
//                       <tr>
//                         <th>T.Id</th>
//                         <th>T.Name</th>
//                         <th>Tender Create Date</th>
//                         <th>Tender Closing Date</th>
//                         <th>Purpose</th>
//                         <th>Status</th>
//                         <th>View</th>
//                         <th>Options</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {(Array.isArray(tenderBack?.tender) ? tenderBack.tender : Array.isArray(tender) ? tender : []).map((elem, index) => (

//                         <tr key={index + 1} className="table-row">
//                           <td>{elem && elem.id}</td> {/* Added a null check */}
//                           <td>{elem && elem.rfqName}</td>{" "}
//                           {/* Added a null check */}
//                           <td>{elem && formatDate(elem.createdAt)}</td>{" "}
//                           {/* Added a null check */}
//                           <td>{elem && elem.tenderClosingDate}</td>{" "}
//                           <td>{elem.purpose}</td>
//                           {/* Added a null check */}
//                           {/* <td>{elem && elem.createdBy}</td>{" "} */}
//                           {/* Added a null check */}
//                           {/* <td>{tenderBids && tenderBids[elem?.id]}</td>{" "} */}
//                           {/* Changed to safe access */}
//                           <td>Pubished</td>
//                           <td>
//                             <button
//                               className="option-button"
//                              onClick={() => handleOpen(elem)}
//                             >
//                               <FaEye />
//                             </button>
//                           </td>
//                           <td style={{ position: "relative" }}>

//                             <IconButton
//                               aria-label="more"
//                               aria-controls="long-menu"
//                               aria-haspopup="true"
//                               onClick={handleClick}
//                             >
//                               <MoreVertIcon />
//                             </IconButton>
//                             <Menu
//                               id="long-menu"
//                               anchorEl={anchorEl}
//                               open={open}
//                               onClose={handleClose}
//                             >
//                               {options.map((option) => (
//                                 <MenuItem key={option} onClick={() => handleOptionClick(option, tender.id)}>
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
//                               />s
//                             </button>
//                             {isDropdownVisible && (
//                               <div
//                                 className="options-card"
//                                 style={{
//                                   position: "absolute",
//                                   top: "100%",
//                                   left: "65px",
//                                   transform: "translateY(-100%)",
//                                   zIndex: "1",s
//                                 }}
//                               > */}
//                             {/* <p onClick={handleBidClick}>View Bid</p>
//                             <p onClick={() => handleDelete(elem)}>Delete</p>
//                             <p onClick={handleOpen}>View Tender</p> */}
//                             {/* </div> */}
//                             {/* )} */}
//                           </td>
//                           <td></td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="d-block d-xl-none d-md-none d-sm-block">
//             <div className=" RFQ-card">
//               <div className="container-fluid">
//                 <div className="row mt-5">
//                   <div className="col-5">
//                     <button
//                       className="btn register-btn"
//                       onClick={handleCreateTender}
//                     >
//                       Create Tender
//                     </button>
//                   </div>
//                   <div className="col-6">
//                     <input
//                       type="search"
//                       className="form-control"
//                       placeholder="Search Tender ..."
//                       aria-label="Search"
//                       style={{
//                         height: "40px",
//                         border: "1px solid #ddd",
//                         borderRadius: "8px",
//                       }}
//                     />
//                   </div>
                  
//                 </div>
//                 <div className="row mt-5 SI-table">
//                   <h2 className="mb-2">Tender List</h2>
//                   <div className="col-12">
//                     <div className="RFQ-Card">
//                       <div className="container">
//                         <div className="row">
//                           <div className="col-10">
//                             <h5>RFQ Name : </h5>
//                             <p className="mt-1">Tender Create Date : </p>
//                             <p>Status : </p>
//                             <p>No. of Bids : </p>
//                           </div>
//                           <div className="col-2">
//                           <button
//                             className="option-button"
//                             onClick={() => handleOpen(elem)}
//                           >
//                             <FaEye />
//                           </button>
//                             {/* <button className="option-button">
//                               <FaEye />
//                             </button> */}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default RenderDetails;
