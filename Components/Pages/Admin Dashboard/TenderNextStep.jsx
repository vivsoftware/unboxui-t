import React, { useState } from 'react';
import { Input } from 'reactstrap';
import { MdKeyboardBackspace } from "react-icons/md";
import TenderContain from './TenderContain';
import TenderReview from './TenderReviews';

const TenderNextStep = ({selectedRFQ}) => {
    const [backtoNext, setBacktoNext] = useState(false);
    const [backtoTender, setBacktoTender] = useState(false);

    const handleBacktoTender = () => {
        setBacktoTender(true);
    }

    const handleBidReview = () => {
        // Check if all required fields are filled
        const requiredFields = [
            'opportunityAmount',
            'tenderClosingDate',
            'deliveryPeriod',
            'deliveryLocation',
            'description',
            'annualRevenue',
            'employeeNumber',
            'bussinessYears',
            'industriesServed',
            'certification'
        ];


        const isFormValid = requiredFields.every(field => {
            const value = document.querySelector(`#${field}`).value.trim();
            return value !== ''; // Check if value is not empty
        });

        if (isFormValid) {
            // Store form data


        // Store form data
        const formData = {
            opportunityAmount: document.querySelector('#opportunityAmount').value,
            tenderClosingDate: document.querySelector('#tenderClosingDate').value,
            deliveryPeriod: document.querySelector('#deliveryPeriod').value,
            deliveryLocation: document.querySelector('#deliveryLocation').value,
            description: document.querySelector('#description').value,
            annualRevenue: document.querySelector('#annualRevenue').value,
            employeeNumber: document.querySelector('#employeeNumber').value,
            bussinessYears: document.querySelector('#bussinessYears').value,
            industriesServed: document.querySelector('#industriesServed').value,
            certification: document.querySelector('#certification').value,
        };

        localStorage.setItem('formData', JSON.stringify(formData));
        setBacktoNext(true);
    } else {
        alert('Please fill in all the required fields');
    }
}

// console.log("selectedRFQ",selectedRFQ)

    return (
        <>
            {backtoNext ? (
                <TenderReview />
            ) : backtoTender ? (
                <TenderContain />
            ) : (
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
                                            <Input type='number' placeholder='Price' id='opportunityAmount' />
                                        </div>
                                    </div>
                                    <div className='row mt-2'>
                                        <div className='col-5'>
                                            <label>Tender Closing Date : </label>
                                        </div>
                                        <div className='col-7'>
                                            <Input type='date' id='tenderClosingDate' />
                                        </div>
                                    </div>
                                    <div className='row mt-2'>
                                        <div className='col-5'>
                                            <label>Delivery Period :</label>
                                        </div>
                                        <div className='col-7'>
                                            <Input type='text' placeholder='3 months' id='deliveryPeriod' />
                                        </div>
                                    </div>
                                    <div className='row mt-2'>
                                        <div className='col-5'>
                                            <label>Delivery Location : </label>
                                        </div>
                                        <div className='col-7'>
                                            <Input type='text' placeholder='Delhi' id='deliveryLocation' />
                                        </div>
                                    </div>
                                    <div className='row mt-2'>
                                        <div className='col-5'>
                                            <label>Description : </label>
                                        </div>
                                        <div className='col-7'>
                                            <textarea type='text' placeholder='About Tender' id='description' />
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
                                            <Input type='number' placeholder='Price' id='annualRevenue' />
                                        </div>
                                    </div>
                                    <div className='row mt-2'>
                                        <div className='col-5'>
                                            <label>No. of Employees : </label>
                                        </div>
                                        <div className='col-7'>
                                            <Input type='number' placeholder='200' id='employeeNumber' />
                                        </div>
                                    </div>
                                    <div className='row mt-2'>
                                        <div className='col-5'>
                                            <label>Years in Business :</label>
                                        </div>
                                        <div className='col-7'>
                                            <Input type='number' placeholder='20' id='bussinessYears' />
                                        </div>
                                    </div>
                                    <div className='row mt-2'>
                                        <div className='col-5'>
                                            <label>Industries Served : </label>
                                        </div>
                                        <div className='col-7'>
                                            <Input type='number' placeholder='0' id='industriesServed' />
                                        </div>
                                    </div>
                                    <div className='row mt-2'>
                                        <div className='col-5'>
                                            <label>Certifications : </label>
                                        </div>
                                        <div className='col-7' style={{ display: 'flex', flexDirection: 'column' }}>
                                            <Input type='checkbox' id='certification' />UR
                                            <Input type='checkbox' id='certification' />ISO
                                            <Input type='checkbox' id='certification' />GST
                                            <Input type='checkbox' id='certification' />Other
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





                  







// setBacktoNext(!backtoNext);
                    {/* <div className='container'>
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
                    </div> */}
            
