import React, { useState } from 'react'
import { Input } from 'reactstrap'
import { MdKeyboardBackspace } from "react-icons/md";
import TenderContain from './TenderContain';
import TenderReview from './TenderReviews';

const TenderNextStep = () => {
    const [backtoNext, setBacktoNext] = useState(false);
    const [backtoTender, setBacktoTender] = useState(false);

    const handleBacktoTender = () => {
        setBacktoTender(true);
    }
    const handleBidReview = () => {
        setBacktoNext(!backtoNext);
    }


    return (
        <>
            {backtoNext ? (
                <TenderReview />
            ) : backtoTender ? (
                <TenderContain />
            ) : (

                // {/* {backtoTender && <TenderReview />}
                // {!backtoTender && ( */}
                <>
                    <div className='container'>
                        <p onClick={handleBacktoTender} style={{ color: '#FF8400', fontSize: '20px' }}><MdKeyboardBackspace /> Back</p>
                        <div className='row mt-5'>
                            <div className='col-6'>
                                <div className='card specifications-card'>
                                    <h3 className='text-center'>Tender Specifications</h3>
                                    <div className='row mt-4'>
                                        <div className='col-5'>
                                            <label>Opportunity Amount : </label>
                                        </div>
                                        <div className='col-7'>
                                            <Input type='number' placeholder='Price' />
                                        </div>
                                    </div>
                                    <div className='row mt-2'>
                                        <div className='col-5'>
                                            <label>Tender Closing Date : </label>
                                        </div>
                                        <div className='col-7'>
                                            <Input type='date' placeholder='02-02-2020' />
                                        </div>
                                    </div>
                                    <div className='row mt-2'>
                                        <div className='col-5'>
                                            <label>Delivery Period :</label>
                                        </div>
                                        <div className='col-7'>
                                            <Input type='text' placeholder='3 months' />
                                        </div>
                                    </div>
                                    <div className='row mt-2'>
                                        <div className='col-5'>
                                            <label>Delivery Location : </label>
                                        </div>
                                        <div className='col-7'>
                                            <Input type='text' placeholder='Delhi' />
                                        </div>
                                    </div>
                                    <div className='row mt-2'>
                                        <div className='col-5'>
                                            <label>Description : </label>
                                        </div>
                                        <div className='col-7'>
                                            <textarea type='text' placeholder='About Tender' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className='card preferences-card'>
                                    <h3 className='text-center'>Preferences for Supplier</h3>
                                    <div className='row mt-4'>
                                        <div className='col-5'>
                                            <label>Annual Revenue : </label>
                                        </div>
                                        <div className='col-7'>
                                            <Input type='number' placeholder='Price' />
                                        </div>
                                    </div>
                                    <div className='row mt-2'>
                                        <div className='col-5'>
                                            <label>No. of Employees : </label>
                                        </div>
                                        <div className='col-7'>
                                            <Input type='number' placeholder='200' />
                                        </div>
                                    </div>
                                    <div className='row mt-2'>
                                        <div className='col-5'>
                                            <label>Years in Business :</label>
                                        </div>
                                        <div className='col-7'>
                                            <Input type='number' placeholder='20' />
                                        </div>
                                    </div>
                                    <div className='row mt-2'>
                                        <div className='col-5'>
                                            <label>Industries Served : </label>
                                        </div>
                                        <div className='col-7'>
                                            <Input type='number' placeholder='0' />
                                        </div>
                                    </div>
                                    <div className='row mt-2'>
                                        <div className='col-5'>
                                            <label>Certifications : </label>
                                        </div>
                                        <div className='col-7' style={{ display: 'flex', flexDirection: 'column' }}>
                                            <Input type='checkbox' />UR
                                            <Input type='checkbox' />ISO
                                            <Input type='checkbox' />GST
                                            <Input type='checkbox' />Other
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

export default TenderNextStep;
