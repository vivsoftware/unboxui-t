import React, { useEffect, useRef, useState } from "react";
import { FaEye } from "react-icons/fa";

import BidContain from "./BidContain";
import TenderNextStep from "./TenderNextStep";

import axios from "axios";
import RenderNewComponent from "./RenderNewComponent";
import spring_boot_url from "../../../Utils/springApi";

//check component how many renders ouccring and check stats and data in each render.
// to fix the issue of re-rendering.

const RenderDetails = ({
  tender,
  tenderBids,
  handleBidClick,
  handleBackToDetails,
  tenderBack,
  formatDate,
}) => {
  const [showBid, setShowBid] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isNewComponentVisible, setNewComponentVisible] = useState(false);
  const [tenderbid, settenderbid] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [rfqdata, setrfqdata] = useState(true);

  useEffect(() => {
    // const handleIsComponentVisible = () => {
    //     setNewComponentVisible(false);
    // }

    // console.log("tender in all tab contain",tender);
    // handleIsComponentVisible();


    /// changes

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
    setShowDetails(false);
    setNewComponentVisible(true);
    console.log("clicked create tender");
    console.log("show deatils state: ", showDetails);
  };
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
        <RenderNewComponent tender={tender} />
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
                </div>
                <div className="row mt-5 SI-table">
                  <h2 className="mb-2">Tender List</h2>
                  <table className="table">
                    <thead className="table-header">
                      <tr>
                        <th>Sr.No</th>
                        <th>RFQ Name</th>
                        <th>Tender Create Date</th>
                        <th>Closing Date</th>
                        <th>View</th>
                        <th>Options</th>
                      </tr>
                    </thead>
                    <tbody>
                    <p>Checking</p>
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
