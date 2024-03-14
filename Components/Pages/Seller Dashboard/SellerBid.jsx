import React, { useState } from 'react'
import { MdKeyboardBackspace } from "react-icons/md";
import BidContain from './BidContain';

const SellerBid = () => {
    const [bidTable, setBidTable] = useState(false);
    const handleBacktoBids = () => {
        setBidTable(!bidTable);
    }
    return (
        <>
            {bidTable && <BidContain />}
            {!bidTable && (
                <>
                    <div className='container'>
                        <div className='row mt-2'>
                            <p onClick={handleBacktoBids} style={{ color: '#FF8400', fontSize: '20px' }}><MdKeyboardBackspace /> Back</p>
                        </div>
                        <div className='row mt-5'>
                            <h2>Bid List</h2>
                            <table className='mt-2'>
                                <thead>
                                    <tr className='table-header'>
                                        <th>Sr. No.</th>
                                        <th>Bid Id</th>
                                        <th>Vendor Id</th>
                                        <th>Bid For</th>
                                        <th>Quoted Value</th>
                                        <th>Delivery Period</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='table-row'>
                                        <td>1</td>
                                        <td>B01</td>
                                        <td>V01</td>
                                        <td>Machine Vision</td>
                                        <td>1,00,00,000</td>
                                        <td>2 months</td>
                                        <td style={{color:'green'}}>Win</td>
                                    </tr>
                                    <tr className='table-row'>
                                        <td>1</td>
                                        <td>B01</td>
                                        <td>V01</td>
                                        <td>Machine Vision</td>
                                        <td>1,00,00,000</td>
                                        <td>2 months</td>
                                        <td style={{color:'red'}}>Loose</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>


            )}
        </>
    )
}

export default SellerBid
