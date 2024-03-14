import React, { useState } from 'react'
import { render } from 'react-dom';
import { RiDeleteBinLine } from "react-icons/ri";
import SkeletonLoader from '../../Element/SkeletonLoader';

const LeadsContain = () => {
  const [showMessage, setShowMessage] = useState(true);
  const [showMobile, setShowMobile] = useState(true);

  const handleLead = () => {
    setShowMessage(false);
  }
  const handleMobileLead = () => {
    setShowMobile(false);
  }
  const handleBack = () => {
    setShowMessage(true);
  }
  const renderMessage = () => {
    return (
      <>
       
        <div className='container message-display'>
        <div className='row mb-2'>
            <button className='btn back-btn' onClick={handleBack}>Back</button>
          </div>
          <div className='row mt-2'>
            <div className='col-6'>
              <h2 className='fw-normal'>Mr. Sharma</h2>
              <h4>Unbox Industry</h4>
            </div>
            <div className='col-6 text-end'>
              <h4>Member Since</h4>
              <h6>Jul, 2020</h6>
            </div>
            <hr></hr>
          </div>
          <div className='row'>
            <p>Dear Mr. Sharma, <br></br><br></br>

              I have been introduced to your company by Unbox Industry. I am looking for Robot Humanoid Teacher.<br></br><br></br>

              Below are the requirement details : <br></br>
              Probable Requirement Type : Business Use<br></br>
              Weight : 50 kg<br></br>
              Model Name/Number : Robot Humanoid Teacher<br></br><br></br>

              Products enquired by the buyer :<br></br>
              Human Robot₹ 50,000 / Unit<br></br>
              Robot Humanoid Teacher₹ 1.99 Lakh / Piece<br></br>
              ROBOT FOR JEWELLERS₹ 1.95 Lakh / Piece<br></br>
              Humanoid Robot 17 Dof₹ 10,500 / Set<br></br>
              Human Intelligent Robot₹ 4 Lakh / Piece<br></br><br></br>

              My Requirement is for Robot Humanoid Teacher. Kindly send me price and other details.</p>
            <hr></hr>
          </div>
          <div className='row'>
            <div className='col-8'>
              <h5 className='mb-2'>Attached Documents:</h5>
              <p> <img src='/RFQ icon.svg' /> RFQ</p>
              <p> <img src='/image.svg' /> Image/Video</p>
              <p> <img src='/Pdf.svg' /> Pdf</p>
            </div>
          </div>
          <div className='row mb-2'>
            <button className='btn back-btn' onClick={handleBack}>Quote</button>
          </div>
        </div>

      </>
    )
  }
  const noMessage = () => {
    return (
      <>
          <div className='full-message'>
            <img src='/emptyMessage.svg' />
            <p className='text-center'>Select an item to read <br></br> Nothing is selected</p>
          </div>
      </>
    )
  }
  const inboxMessage = () => {
    return (
      <>
      <div className=''>
        <div className='row'>
        <div className='col-12  inbox-message'>
          <div className='container'>
            <div className='row mt-2'>
              <div className='col-8'>
                <h5>All Leads(1200)</h5>
              </div>
              <div className='col-4 text-end'>
                <h5>Unread(200)</h5>
              </div>
              <hr></hr>
            </div>

            <div className='row day-card'>
              <p>Today</p>
            </div>
            <div className='row'>
              <div className='message-card' onClick={handleLead}>
                <div className='row'>
                  <div className='col-3 mt-1'>
                    <img src='/BidUser.svg' className='lead-profile' />
                  </div>
                  <div className='col-7'>
                    <h4>Mr. Sharma</h4>
                    <h6>Enquiry</h6>
                    <p className='mt-1' style={{
                      fontSize: '12px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '100%', // Optional, adjust as needed
                    }}>
                      Want to know about the epson's products pricing.Want to know about the epson's products pricing.Want to know about the epson's products pricing.Want to know about the epson's products pricing.
                    </p>                </div>
                  <div className='col-2'>
                    <RiDeleteBinLine />
                  </div>
                </div>
                <div className='row'>
                  <p className='text-end' style={{ fontSize: '12px' }}>30 mins ago</p>
                </div>
              </div>
              <hr className='mt-1'></hr>

            </div>
            <div className='row'>
              <div className='message-card' onClick={handleLead}>
                <div className='row'>
                  <div className='col-3 mt-1'>
                    <img src='/BidUser.svg' className='lead-profile' />
                  </div>
                  <div className='col-7'>
                    <h4>Mr. Sharma</h4>
                    <h6>Enquiry</h6>
                    <p className='mt-1' style={{
                      fontSize: '12px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '100%', // Optional, adjust as needed
                    }}>
                      Want to know about the epson's products pricing.Want to know about the epson's products pricing.Want to know about the epson's products pricing.Want to know about the epson's products pricing.
                    </p>                </div>
                  <div className='col-2'>
                    <RiDeleteBinLine />
                  </div>
                </div>
                <div className='row text-end'>
                  <p className='text-end' style={{ fontSize: '12px' }}>30 mins ago</p>
                </div>
              </div>
              <hr className='mt-1'></hr>

            </div>
            <div className='row'>
              <div className='message-card' onClick={handleLead}>
                <div className='row'>
                  <div className='col-3 mt-1'>
                    <img src='/BidUser.svg' className='lead-profile' />
                  </div>
                  <div className='col-7'>
                    <h4>Mr. Sharma</h4>
                    <h6>Enquiry</h6>
                    <p className='mt-1' style={{
                      fontSize: '12px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '100%', // Optional, adjust as needed
                    }}>
                      Want to know about the epson's products pricing.Want to know about the epson's products pricing.Want to know about the epson's products pricing.Want to know about the epson's products pricing.
                    </p>                </div>
                  <div className='col-2'>
                    <RiDeleteBinLine />
                  </div>
                </div>
                <div className='row text-end'>
                  <p className='text-end' style={{ fontSize: '12px' }}>30 mins ago</p>
                </div>
              </div>
              <hr className='mt-1'></hr>

            </div>
            <div className='row'>
              <div className='message-card' onClick={handleLead}>
                <div className='row'>
                  <div className='col-3 mt-1'>
                    <img src='/BidUser.svg' className='lead-profile' />
                  </div>
                  <div className='col-7'>
                    <h4>Mr. Sharma</h4>
                    <h6>Enquiry</h6>
                    <p className='mt-1' style={{
                      fontSize: '12px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '100%', // Optional, adjust as needed
                    }}>
                      Want to know about the epson's products pricing.Want to know about the epson's products pricing.Want to know about the epson's products pricing.Want to know about the epson's products pricing.
                    </p>                </div>
                  <div className='col-2'>
                    <RiDeleteBinLine />
                  </div>
                </div>
                <div className='row text-end'>
                  <p className='text-end' style={{ fontSize: '12px' }}>30 mins ago</p>
                </div>
              </div>
              <hr className='mt-1'></hr>

            </div>
            <div className='row'>
              <div className='message-card' onClick={handleLead}>
                <div className='row'>
                  <div className='col-3 mt-1'>
                    <img src='/BidUser.svg' className='lead-profile' />
                  </div>
                  <div className='col-7'>
                    <h4>Mr. Sharma</h4>
                    <h6>Enquiry</h6>
                    <p className='mt-1' style={{
                      fontSize: '12px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '100%', // Optional, adjust as needed
                    }}>
                      Want to know about the epson's products pricing.Want to know about the epson's products pricing.Want to know about the epson's products pricing.Want to know about the epson's products pricing.
                    </p>                </div>
                  <div className='col-2'>
                    <RiDeleteBinLine />
                  </div>
                </div>
                <div className='row text-end'>
                  <p className='text-end' style={{ fontSize: '12px' }}>30 mins ago</p>
                </div>
              </div>
              <hr className='mt-1'></hr>

            </div>
            <div className='row'>
              <div className='message-card' onClick={handleLead}>
                <div className='row'>
                  <div className='col-3 mt-1'>
                    <img src='/BidUser.svg' className='lead-profile' />
                  </div>
                  <div className='col-7'>
                    <h4>Mr. Sharma</h4>
                    <h6>Enquiry</h6>
                    <p className='mt-1' style={{
                      fontSize: '12px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '100%', // Optional, adjust as needed
                    }}>
                      Want to know about the epson's products pricing.Want to know about the epson's products pricing.Want to know about the epson's products pricing.Want to know about the epson's products pricing.
                    </p>                </div>
                  <div className='col-2'>
                    <RiDeleteBinLine />
                  </div>
                </div>
                <div className='row text-end'>
                  <p className='text-end' style={{ fontSize: '12px' }}>30 mins ago</p>
                </div>
              </div>
              <hr className='mt-1'></hr>

            </div>

          </div>
        </div>
        </div>
      </div>
      </>
    )
  }
  //  if(!userDe){
        // return(
        //     <div className='row mt-5'>            
        //     <SkeletonLoader/>
        //     </div>
        // )
    // }
  return (
    <>

      <div className='leads-card mt-5'>
      <div className='d-none d-xl-block d-md-block d-sm-none'>
        <div className='container'>
          <div className='row'>
              <div className='col-5'>
                {inboxMessage()}
              </div>
              <div className='col-7'>
                {showMessage ? noMessage() : renderMessage()}
              </div>
            </div>
            
           
          </div>
        </div>
        <div className='d-block d-xl-none d-md-none d-sm-block'>
          <div className='container'>
            <div className='row'>
            <div className='col-12'>
                {showMessage ? inboxMessage() : renderMessage()}
              </div>
            </div>
          </div>
              
            </div>
      </div>
    </>
  )
}

export default LeadsContain
