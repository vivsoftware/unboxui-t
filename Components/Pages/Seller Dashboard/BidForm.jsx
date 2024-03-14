// import React, { useState } from 'react'
// import BidContain from './BidContain';
// import { MdKeyboardBackspace, MdOutlineVerified } from "react-icons/md";
// import { Input } from 'reactstrap';
// import { VscUnverified } from 'react-icons/vsc';
// import BidView from './bidView';


// const BidForm = () => {
//     const [bidMessage, setBidMessage] = useState(false);
//     // const handleBacktoBids = () => {
//     //     setBidMessage(!bidMessage);
//     // }


//      const handleBidProcess = () => {
//         setBidMessage(!bidMessage);
//     }



//     return (
//         <>
//             {bidMessage && <BidView />}
//             {!bidMessage && (
//                 <>
//                     <div className='container'>
//                         <div className='row mt-2'>
//                             <p onClick={handleBacktoBids} style={{ color: '#FF8400', fontSize: '20px' }}><MdKeyboardBackspace /> Back</p>
//                             <div className='row mt-1'>
//                                 <p>Tender Id</p>
//                                 <p>Description</p>
//                                 <p>Opening Date: 08-01-2024/Closing Date:never</p>
//                             </div>
//                             <div className='bid-creation-card'>
//                                 <div className='row'>
//                                     <div className='col-6'>
//                                         <div className='tender-specs-card'>
//                                             <div className='container'>
//                                                 <div className='row mt-1'>
//                                                     <div className='col-4'>
//                                                         <label>Annual Revenue :</label>
//                                                     </div>
//                                                     <div className='col-7'>
//                                                         <Input type='number' placeholder='10,00,00,000' />
//                                                     </div>
//                                                 </div>
//                                                 <div className='row mt-1'>
//                                                     <div className='col-4'>
//                                                         <label>No. of Eemployees :</label>
//                                                     </div>
//                                                     <div className='col-7'>
//                                                         <Input type='number' placeholder='200' />
//                                                     </div>
//                                                 </div>
//                                                 <div className='row mt-1'>
//                                                     <div className='col-4'>
//                                                         <label>Years in Business :</label>
//                                                     </div>
//                                                     <div className='col-7'>
//                                                         <Input type='number' placeholder='20' />
//                                                     </div>
//                                                 </div>
//                                                 <div className='row mt-1'>
//                                                     <div className='col-4'>
//                                                         <label>Industries Served :</label>
//                                                     </div>
//                                                     <div className='col-7'>
//                                                         <Input type='number' placeholder='0' />
//                                                     </div>
//                                                 </div>
//                                                 <div className='row mt-1'>
//                                                     <div className='col-4'>
//                                                         <label>Certifications : </label>
//                                                     </div>
//                                                     <div className='col-7' style={{ display: 'flex', flexDirection: 'column' }}>
//                                                         <Input type='checkbox' />UR
//                                                         <Input type='checkbox' />ISO
//                                                         <Input type='checkbox' />GST
//                                                         <Input type='checkbox' />Other
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className='col-6'>
//                                         <div className='container'>
//                                             <div className='row mt-1'>
//                                                 <div className='col-5'>
//                                                     <label>Bid Amount :</label>
//                                                 </div>
//                                                 <div className='col-7'>
//                                                     <Input type='number' placeholder='50,00,000' />
//                                                 </div>
//                                             </div>
//                                             <div className='row mt-1'>
//                                                 <div className='col-5'>
//                                                     <label>Upload Technical Specs: </label>
//                                                 </div>
//                                                 <div className='col-7'>
//                                                     <Input type='file' placeholder='50,00,000' />
//                                                 </div>
//                                             </div>
//                                             <div className='row mt-1'>
//                                                 <label>Required Other Docs : </label>
//                                             </div>
//                                             <div className='row mt-1'>
//                                                 <div className='col-12'>
//                                                     <div className='row mt-1'>
//                                                         <div className='col-12'>
//                                                             <div className='doc-card'>
//                                                                 <p className='text-center'>GST <MdOutlineVerified className='verified ' /></p>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                     <div className='row mt-1'>
//                                                         <div className='col-12'>
//                                                             <div className='doc-card'>
//                                                                 <p className='text-center'>CIN <MdOutlineVerified className='verified ' /></p>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                     <div className='row mt-1'>
//                                                         <div className='col-12'>
//                                                             <div className='doc-card'>
//                                                                 <p className='text-center'>CRC <MdOutlineVerified className='verified ' /></p>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                     <div className='row mt-1'>
//                                                         <div className='col-6'>
//                                                             <div className='doc-card'>
//                                                                 <p className='text-center'>MSME <VscUnverified className='unverified ' /></p>
//                                                             </div>
//                                                         </div>
//                                                         <div className='col-6'>
//                                                             <Input type='file' />
//                                                         </div>
//                                                     </div>
//                                                     <div className='row mt-1'>
//                                                         <div className='col-6'>
//                                                             <div className='doc-card'>
//                                                                 <p className='text-center'>Bank Mandot <VscUnverified className='unverified ' /></p>
//                                                             </div>
//                                                         </div>
//                                                         <div className='col-6'>
//                                                             <Input type='file' />
//                                                         </div>
//                                                     </div>
//                                                     <div className='row mt-1'>
//                                                         <div className='col-6'>
//                                                             <div className='doc-card'>
//                                                                 <p className='text-center'>CC Copy <VscUnverified className='unverified ' /></p>
//                                                             </div>
//                                                         </div>
//                                                         <div className='col-6'>
//                                                             <Input type='file' />
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className='row mt-5' style={{ display: 'flex', justifyContent: 'center' }}>
//                                 <button className='btn compare-btn'>Review</button>
//                                 <button className='btn compare-btn ms-2'>Submit</button>
//                             </div>
//                         </div>
//                     </div>
//                 </>
//             )}



//         </>
//     )
// }

// export default BidForm
