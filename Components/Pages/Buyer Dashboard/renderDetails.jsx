import React, { useEffect, useRef, useState } from "react";
import { FaEye } from "react-icons/fa";

import BidContain from "./BidContain";
import TenderNextStep from "./TenderNextStep";

import axios from "axios";
import RenderNewComponent from "./renderNewComponent";
import spring_boot_url from "../../../Utils/springApi";

const RenderDetails = ({ tender, tenderBids, formatDate, handleBidClick,  tenderBack }) => {
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
    setShowDetails(false);
    setNewComponentVisible(true);
    console.log("clicked create tender");
    console.log("show deatils state: ", showDetails);
  };

  //Fixig Back Button End\\


  //tender search start\\

  const handleTenderSearchChange = (e) => {
    const query = e.target.value.trim();
    setSearchTerm(query);
    if (query === "") {
      setSearchData(null);
    } else {
      searchTender(query);
    }
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

  const handleClose = () => {
    setOpen(false);
    setuploadRfq(null);
  };

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
                      style={{ marginLeft: "6px", marginTop: "60px" }}
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
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        marginLeft: "-230px",
                      }}
                    />
                  </div>
                  {/* Mapping Data */}
                  {searchData && searchData.length === 0 && (
                    <p style={{ color: "red" }}>No Tenders Found</p>
                  )}

                  {searchData && searchData.length > 0 && (
                    <div className="user-searchCard">
                      {searchData.map((item, index) => (
                        <div className="user-search" key={index}>
                          {/* <p onClick={() => handleOpen(elem)}>{elem.productName}</p> */}
                          <p onClick={() => handleOpen(item)}>
                            Product Name :- {item?.ProductName}
                            {<br></br>}
                            Email :- {item?.email} -{<br></br>} Phone Number :-{" "}
                            {item?.phoneNumber}
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
                        <th>Sr.No</th>
                        <th>RFQ Name</th>
                        <th>Tender Create Date</th>
                        <th>Status</th>
                        <th>No. of Bids</th>
                        <th>Options</th>
                      </tr>
                    </thead>
                    <tbody>
                    {(Array.isArray(tenderBack?.tender) ? tenderBack.tender : Array.isArray(tender) ? tender : []).map((elem, index) => (
                        
                        <tr key={index + 1} className="table-row">
                          <td>{elem && elem.id}</td> {/* Added a null check */}
                          <td>{elem && elem.rfqName}</td>{" "}
                          {/* Added a null check */}
                          <td>{elem && formatDate(elem.createdAt)}</td>{" "}
                          {/* Added a null check */}
                          <td>{elem && elem.tenderClosingDate}</td>{" "}
                          {/* Added a null check */}
                          <td>{elem && elem.createdBy}</td>{" "}
                          {/* Added a null check */}
                          <td>{tenderBids && tenderBids[elem?.id]}</td>{" "}
                          {/* Changed to safe access */}
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
                            <button
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
                            )}
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
                        height: "40px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
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
                            <button className="option-button">
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
