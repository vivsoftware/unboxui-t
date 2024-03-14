import React, { useState } from 'react';
import { Input } from 'reactstrap';
import { MdKeyboardBackspace, MdOutlineVerified } from "react-icons/md";
import BidSubmit from './bidSubmit';


const BidNext = () => {
    const [backtoBid, setBacktoBid] = useState(false);

    const handleBacktoBid = () => {
        setBacktoBid(!backtoBid);
    }


    return (
        <>
            {backtoBid && <BidSubmit />}
            {!backtoBid && (
                <>
                    <div className='container'>
                        <p onClick={handleBacktoBid} style={{ color: '#FF8400', fontSize: '20px' }}><MdKeyboardBackspace /> Back</p>

                        <div className='row mt-5'>
                            <h5 style={{ fontSize: '24px', fontWeight: '500', marginLeft: '430px', marginRight: '20px' }}>Review Your Bid For Submission</h5>
                        </div>
                        <hr></hr>

                        <div className='row mt-4'>
                            <div className='col-3'>
                            </div>
                            <table className="table1">
                                <thead className='table-header'>
                                    <tr>
                                        <th>Sr. No</th>
                                        <th>Questions</th>
                                        <th>Answers</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='table-row'>
                                        <td>1</td>
                                        <td>Annual Revenue :</td>
                                        <td>10,00,00,000</td>
                                    </tr>
                                    <tr className='table-row'>
                                        <td>2</td>
                                        <td>No. of Employees :</td>
                                        <td>200</td>
                                    </tr>
                                    <tr className='table-row'>
                                        <td>3</td>
                                        <td>Years in Business :</td>
                                        <td>20</td>
                                    </tr>
                                    <tr className='table-row'>
                                        <td>4</td>
                                        <td>Industries Served :</td>
                                        <td>0</td>
                                    </tr>
                                    <tr className='table-row'>
                                        <td>5</td>
                                        <td>Certifications :</td>
                                        <td>
                                            <Input type='checkbox' />UR &ensp;
                                            <Input type='checkbox' />ISO &ensp;
                                            <Input type='checkbox' />GST &ensp;
                                            <Input type='checkbox' />Other &ensp;
                                        </td>
                                    </tr>
                                    <tr className='table-row'>
                                        <td>6</td>
                                        <td>Bid Amount :</td>
                                        <td>50,00,000</td>
                                    </tr>
                                    <tr className='table-row'>
                                        <td>7</td>
                                        <td>Required Other Docs : </td>
                                        <td>
                                            <Input type='checkbox' />GST &ensp;
                                            <Input type='checkbox' />CIN &ensp;
                                            <Input type='checkbox' />CRC <br /><br />

                                            <p className='text-center'>MSME<MdOutlineVerified className='verified ' /></p>
                                            <p className='text-center'>Bank Mandot <MdOutlineVerified className='verified ' /></p>
                                            <p className='text-center'>CC Copy <MdOutlineVerified className='verified ' /></p>

                                        </td>

                                    </tr>
                                </tbody>
                            </table>


                        </div>


                        <div className='row mt-2' style={{ display: 'flex', justifyContent: 'end' }}>
                            <button className='btn compare-btn'>Review</button>
                            <button className='btn compare-btn ms-2'>Submit</button>
                        </div>
                    </div>

                </>


            )}
        </>
    )
}

export default BidNext;