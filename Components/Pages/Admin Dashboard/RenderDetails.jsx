import React, { useEffect, useRef, useState } from 'react';
import { FaEye } from 'react-icons/fa';

import BidContain from './BidContain';
import TenderNextStep from './TenderNextStep';

import axios from 'axios';
import RenderNewComponent from './RenderNewComponent';
import spring_boot_url from '../../../Utils/springApi';

const RenderDetails = ({tender, tenderBids, formatDate, handleBidClick}) => {

    const [showBid, setShowBid] = useState(false);
    const [showDetails, setShowDetails] = useState(true);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [isNewComponentVisible, setNewComponentVisible] = useState(false);
    const [tenderbid, settenderbid] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [rfqdata, setrfqdata] = useState(true);
    
    useEffect(() => {
      // Function to fetch and set tender bids
      const fetchAndSetTenderBid = async (tenderId) => {
        try {
          const response = await axios.get(`${spring_boot_url}api/sellersbid/${tenderId}`);
          setTenderBids((prevBids) => ({
            ...prevBids,
            [tenderId]: response.data.length,
          }));
        } catch (error) {
          console.error('Error fetching seller bids:', error);
        }
      };
      // Iterate over each tender and fetch its bids
      Array.isArray(tender) && tender.forEach((elem) => {
        fetchAndSetTenderBid(elem.id);
      });
    }, [tender]);

    const handleClose = () => {
        setOpen(false);
        setuploadRfq(null);
      }


    useEffect(() => {
      axios.get(`${spring_boot_url}api/sellersbid/get-all-bids`)
        .then(resp => {
          console.log("RenderDetails",resp.data.json);
          settenderbid(resp.data);
        });
    }, [tenderbid]);

    const handleCreateTender = () => {
        // setShowDetails(false);
        setNewComponentVisible(true);
        console.log("clicked create tender");
      }
      const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
      };

      const handleOpen = (elem) => {
        setOpen(true);
        setrfqdata(elem);
        console.log(elem);
        console.log("clicked open");
      };

      console.log("tender in All tab contain",tender);

  
    return (
      <>
        {isNewComponentVisible ? <RenderNewComponent handleBackToDetails={() => setNewComponentVisible(false)} /> : (
          <>
            <div className='d-none d-xl-block d-md-block d-sm-none'>
              <div className=' RFQ-card'>
                <div className='container'>
                  <div className='row mt-5'>
                    <div className='col-2'>
                      <button className='btn register-btn' onClick={handleCreateTender} style={{ marginLeft: '6px', marginTop: '60px' }}>Create Tender</button>
                    </div>
                    <div className='col-10'>
                      <input type="search" className="form-control" placeholder="Search Tender ..." aria-label="Search" style={{ height: '40px', border: "1px solid #ddd", borderRadius: '8px', marginLeft: '-230px'}} />
                    </div>
                  </div>
                  <div className='row mt-5 SI-table'>
                    <h2 className='mb-2'>Tender List</h2>
                    <table className="table">
                      <thead className='table-header'>
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
                        {Array.isArray(tender) && tender.map((elem, index) => (
                          <tr key={index + 1} className='table-row'>
                            <td>{elem.id}</td>
                            <td>{elem.rfqName}</td>
                            <td>{formatDate(elem.createdAt)}</td>
                            <td>{elem.tenderClosingDate}</td>
                            <td>{elem.createdBy}</td>
                            <td>{tenderBids[elem.id]}</td>
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
                                  <p onClick={handleOpen}>View Tender</p>
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
                              <h5>RFQ Name : </h5>
                              <p className='mt-1'>Tender Create Date : </p>
                              <p>Status : </p>
                              <p>No. of Bids : </p>
                            </div>
                            <div className='col-2'>
                              <button className="option-button" >
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
    )
  }

  export default RenderDetails;