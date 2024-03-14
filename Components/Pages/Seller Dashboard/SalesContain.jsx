import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import ViewQuoteModal from './ViewQuoteModal';

const SalesContain = () => {
  const [searchData , setSearchData] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const handleSearchChange = () => {
      setSearchData(!searchData);
  };
  const handleViewDetailsClick = () => {
    openModal();
    setSearchData(null);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  return (
    <>
      <div className='RFQ-card container-fluid'>
        <div className='d-none d-xl-block d-md-block d-sm-none'>
          <div className='row mt-5'>
            <div className='col-12'>
              <input 
              className="form-control" 
              type='search' 
              aria-label="Search" 
              placeholder='Search quotes' 
              style={{ height: '40px', border: "1px solid #ddd", borderRadius: '8px' }}
              onChange={handleSearchChange} 
              />
              
              {searchData &&  (
                <div className='user-searchCard'>
                    <div className='user-search' >
                      <p onClick={() => handleViewDetailsClick()}>Pooja</p>
                      <hr></hr>
                    </div>
                </div>
              )}
            </div>
            <div className='row mt-5  SI-table'>
              <h2 className='mb-2'>Quote List</h2>
              <table>
                <thead className='table-header' style={{borderRadius:'12px'}}>
                  <tr>
                    <th>Quote Id</th>
                    <th>Quote For</th>
                    <th>Quote To</th>
                    <th>Quote Value</th>
                    <th>Date</th>
                    <th>Company Name</th>
                    <th>View</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='table-row'>
                    <td>1</td>
                    <td>Machine Vision</td>
                    <td>Pooja</td>
                    <td>1,00,00,000</td>
                    <td>06-01-2024</td>
                    <td>VIV</td>
                    <td>
                      <button className="option-button" onClick={() => handleViewDetailsClick()}>
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <ViewQuoteModal 
              isOpen={isModalOpen}
              onClose={handleModalClose}/>
            </div>
          </div>
        </div>
        <div className='d-block d-xl-none d-md-none d-sm-block'>
          <div className='row mt-3'>
            <div className='col-10'>
          <input 
              className="form-control" 
              type='search' 
              aria-label="Search" 
              placeholder='Search quotes' 
              style={{ height: '40px', border: "1px solid #ddd", borderRadius: '8px' }}
              onChange={handleSearchChange} 
              />
              
              {searchData &&  (
                <div className='user-searchCard'>
                    <div className='user-search' >
                      <p onClick={() => handleViewDetailsClick()}>Pooja</p>
                      <hr></hr>
                    </div>
                </div>
              )}
              </div>
          </div>
          <div className='row mt-3'>
            <h2 className='mb-2'>Quote List</h2>
            <div className='RFQ-Card'>
                <div className='container'>
                <div className='row'>
                  <div className='col-10'> 
                    <h5>Quote For : Machine Vision</h5>
                    <p>Quote To : Pooja</p>
                    <p>Quote Value : 1,00,00,0000</p>
                    <p>Date : 06-01-2024</p>
                    <p>Company Name : VIV</p>
                  </div>
                </div>
                </div>
              </div> 
          </div>
        </div>
      </div>
    </>
  )
}

export default SalesContain
