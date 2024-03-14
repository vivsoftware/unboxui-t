import React, { useState } from 'react'
import TenderContain from './TenderContain';
import { MdKeyboardBackspace } from "react-icons/md";
import { MdOutlineVerified } from "react-icons/md";
import { VscUnverified } from "react-icons/vsc";
import ShortlistBidModal from './ShortlistBidModal';
import BidCompare from './BidCompare';

const BidContain = () => {
  const [backtoTender, setBacktoTender] = useState(false);
  const[gotoCompare, setGotoCompare] = useState(false);


  const handleBacktoTender = () => {
    setBacktoTender(true);
  }

  const handleBidCompare =() => {
    setGotoCompare(!gotoCompare)
    // setBacktoTender(!backtoTender);
  }


  return (
    <>

     {gotoCompare ? (       //changes for working back and next button together "IMPORTTANT"
        <BidCompare />
      ) : backtoTender ? (
        <TenderContain />
      ) : (

    // {/* {gotoCompare ? <BidCompare/> : ( */}

      // {/* {backtoTender && <TenderContain/>}
      // {!backtoTender && ( */}

        <>
          <div className='d-none d-xl-block d-md-block d-sm-none'>
            <div className=' RFQ-card'>
              <div className='container'>
                <div className='row mt-5'>
                  <p onClick={handleBacktoTender} style={{ color: '#FF8400', fontSize: '20px', marginLeft: '180px' }}><MdKeyboardBackspace /> Back</p>
                  <div className='col-12'>
                    <input type="search" className="form-control" placeholder="Search Bid ..." aria-label="Search" style={{ height: '40px', border: "1px solid #ddd", borderRadius: '8px', marginLeft: '180px' }} />
                  </div>
                </div>
                <div className='row mt-5 SI-table'>
                  <h2 className='mb-2'>Bids for Machine Vision</h2>
                  <table className="table">
                    <thead className='table-header'>
                      <tr>
                        <th>Sr.No</th>
                        <th>Bid Id</th>
                        <th>Vendor Id</th>
                        <th>Quoted value</th>
                        <th>Delivery Period</th>
                        <th>Verified</th>
                        <th>Select</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className='table-row'>
                        <td>1</td>
                        <td>B01</td>
                        <td>V01</td>
                        <td>1,00,00,000</td>
                        <td>2 months</td>
                        <td><MdOutlineVerified className='verified' /></td>
                        <td>
                          <input type='checkbox' />
                        </td>
                      </tr>
                      <tr className='table-row'>
                        <td>2</td>
                        <td>B02</td>
                        <td>V02</td>
                        <td>1,00,00,000</td>
                        <td>2 months</td>
                        <td><MdOutlineVerified className='verified' /></td>
                        <td>
                          <input type='checkbox' />
                        </td>
                      </tr>
                      <tr className='table-row'>
                        <td>3</td>
                        <td>B03</td>
                        <td>V03</td>
                        <td>1,00,00,000</td>
                        <td>2 months</td>
                        <td><VscUnverified className='unverified' /></td>
                        <td>
                          <input type='checkbox' />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className='row mt-5' style={{ display: 'flex', justifyContent: "center" }}>

                  {/* <button className='btn compare-btn'>Compare</button> */}
                  {/* <button className='btn compare-btn ms-2' onClick={openShortlistModal}>Shortlist</button> */}

                  <div className='row mt-2' style={{ display: 'flex', justifyContent: 'center' }}>
                    <button className='btn compare-btn' onClick={() => handleBidCompare()} style={{}}>Compare</button>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div className='d-block d-xl-none d-md-none d-sm-block'>
            <div className=' RFQ-card'>
              <div className='container-fluid'>
                <div className='row mt-5'>
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
                            <input type='check' />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <ShortlistBidModal isOpen={isShortlistBid} onClose={handleModalClose} /> */}

        </>
      )}

    </>
  )
}

export default BidContain;
