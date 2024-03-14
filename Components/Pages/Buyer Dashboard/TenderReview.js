import React, { useState } from 'react';
import { Input } from 'reactstrap';
import { VscUnverified } from 'react-icons/vsc';
import { MdKeyboardBackspace, MdOutlineVerified } from "react-icons/md";
// import BidSubmit from './bidSubmit';
import TenderNextStep from './TenderNextStep';


const TenderReview = () => {
    const [backtoNext, setBacktoNext] = useState(false);


    const handleBacktoTenders = () => {
        setBacktoNext(!backtoNext);
    }


    return (
        <>
            {backtoNext && <TenderNextStep />}
            {!backtoNext && (
                <>
                    <div className='container11'>
                        <p onClick={handleBacktoTenders} style={{ color: '#FF8400', fontSize: '20px' }}><MdKeyboardBackspace /> Back</p>
                        <div className='row mt-5'>
                            <div className='col-6'>
                                <div className='card specifications-card'>
                                    <h3 className='text-center'>Tender Specifications</h3>
                                    <div className='row mt-4'>
                                        <div className='col-5'>
                                            <table className="table2">
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
                                                        <td>Opportunity Amount : </td>
                                                        <td>Prices</td>
                                                    </tr>
                                                    <tr className='table-row'>
                                                        <td>2</td>
                                                        <td>Tender Closing Date :</td>
                                                        <td>02-02-2020</td>
                                                    </tr>
                                                    <tr className='table-row'>
                                                        <td>3</td>
                                                        <td>Delivery Period :</td>
                                                        <td>3 months</td>
                                                    </tr>
                                                    <tr className='table-row'>
                                                        <td>4</td>
                                                        <td>Delivery Location :</td>
                                                        <td>Delhi</td>
                                                    </tr>
                                                    <tr className='table-row'>
                                                        <td>5</td>
                                                        <td>Description :</td>
                                                        <td>About Tender</td>
                                                    </tr>
                                                    <tr className='table-row'>
                                                        <td>6</td>
                                                        <td>Bid Amount :</td>
                                                        <td>50,00,000</td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className='col-6'>
                                <div className='card preferences-card'>
                                    <h3 className='text-center'>Preferences for Supplier</h3>
                                    <div className='row mt-4'>
                                        <div className='col-5'>
                                            <table className="table2">
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
                                                        <td>Prices</td>
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
                                                            <Input type='checkbox' />OTHERS <br /><br />

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row mt-2' style={{ display: 'flex', justifyContent: 'end' }}>
                            <button className='btn back-btn' onClick={() => handleBidReview()} style={{ float: 'right' }}>Next</button>
                        </div>
                    </div>

                </>


            )}
        </>
    )
}

export default TenderReview;