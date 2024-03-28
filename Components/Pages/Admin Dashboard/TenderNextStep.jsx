import React, { useState } from 'react';
import { MdKeyboardBackspace } from "react-icons/md";
import { Input } from 'reactstrap';
import spring_boot_url from '../../../Utils/springApi';
import TenderContain from './TenderContain';
import TenderReview from './TenderReviews';


const TenderNextStep = ({ Tenderselectdata }) => {
    const [backtoNext, setBacktoNext] = useState(false);
    const [backtoTender, setBacktoTender] = useState(false);
    const [opportunityAmount, setopportunityAmount] = useState(false);
    const [tenderClosingDate, settenderClosingDate] = useState(false);
    const [deliveryPeriod, setdeliveryPeriod] = useState(false);
    const [diliveryLocation, setdiliveryLocation] = useState(false);
    const [anaualRevenue, setanaualRevenue] = useState(false);
    const [noOfEmployees, setnoOfEmployees] = useState(false);
    const [yearsInBusiness, setyearsInBusiness] = useState(false);
    const [industriesServed, setindustriesServed] = useState(false);
    const [certification, setcertification] = useState(false);
    const [tenderDiscription, settenderDescription] = useState(false);
    const [tenderCheck, settenderCheck] = useState(false);

    const [backtoBid, setBacktoBid] = useState(false);
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
            // 'certification'
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




    ///////////////////////////////////////////////////////////// TENDER CREATION LOGIC ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const CreateTender = () => {
        const userDetails = {
            purpose: `${Tenderselectdata?.purpose}`,
            productName: `${Tenderselectdata?.productName}`,
            email: `${Tenderselectdata?.email}`,
            modelNo: `${Tenderselectdata?.modelNo}`,
            createdBy: `${Tenderselectdata?.createdBy}`,
            rfqName: `${Tenderselectdata?.projectName}`,
            rfqId: `${Tenderselectdata?.id}`,
            phoneNumber: `${Tenderselectdata?.phoneNumber}`,
            deliveryDate: `${Tenderselectdata?.deliveryDate}`,
            purposeOfRfq: `${Tenderselectdata?.purposeOfRfq}`,
            description: `${Tenderselectdata?.description}`,
            quantity: `${Tenderselectdata?.quantity}`,
            tenderDiscription,
            opportunityAmount,
            tenderClosingDate,
            deliveryPeriod,
            diliveryLocation,
            anaualRevenue,
            noOfEmployees,
            yearsInBusiness,
            industriesServed,
            certification: 'UR',
            originalFilename: "FILE"

        };
        fetch(`${spring_boot_url}api/tender/${Tenderselectdata.userId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userDetails),
        })
            .then((resp) => {
                // setRfqData(resp.data);
                if (resp.ok === true) {
                    toast.warning(`Tender Publishing Please Wait.....`, {
                        position: toast.POSITION.BOTTOM_CENTER,
                    });
                    setTimeout(() => {
                        toast.success(`Tender Published to Seller `, {
                            position: toast.POSITION.BOTTOM_CENTER,
                        });
                        handleReload();
                    }, 3000);
                }
                else {
                    toast.error(`This Tender Allready exist `, {
                        position: toast.POSITION.BOTTOM_CENTER,
                    });
                }
            })
            .catch(error => {
                toast.success(`This Tender Allready exist `, {
                    position: toast.POSITION.BOTTOM_CENTER,
                });
            });
    }
    ///////////////end///////////////////
    
    // const CreateTender = () => {
    //     const userDetails = {
    //         purpose: `${selectRfqdata?.purpose}`,
    //         productName: `${selectRfqdata?.productName}`,
    //         email: `${selectRfqdata?.email}`,
    //         modelNo: `${selectRfqdata?.modelNo}`,
    //         createdBy: `${selectRfqdata?.createdBy}`,
    //         rfqName: `${selectRfqdata?.projectName}`,
    //         rfqId: `${selectRfqdata?.id}`,
    //         phoneNumber: `${selectRfqdata?.phoneNumber}`,
    //         deliveryDate: `${selectRfqdata?.deliveryDate}`,
    //         purposeOfRfq: `${selectRfqdata?.purposeOfRfq}`,
    //         description: `${selectRfqdata?.description}`,
    //         quantity: `${selectRfqdata?.quantity}`,
    //         tenderDiscription,
    //         opportunityAmount,
    //         tenderClosingDate,
    //         deliveryPeriod,
    //         diliveryLocation,
    //         anaualRevenue,
    //         noOfEmployees,
    //         yearsInBusiness,
    //         industriesServed,
    //         certification: 'UR',
    //         originalFilename: "FILE"

    //     };
    //     fetch(`${spring_boot_url}api/tender/${Tenderselectdata.userId}`, {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(userDetails),
    //     })
    //         .then((resp) => {
    //             // setRfqData(resp.data);
    //             if (resp.ok === true) {
    //                 toast.warning(`Tender Publishing Please Wait.....`, {
    //                     position: toast.POSITION.BOTTOM_CENTER,
    //                 });
    //                 setTimeout(() => {
    //                     toast.success(`Tender Published to Seller `, {
    //                         position: toast.POSITION.BOTTOM_CENTER,
    //                     });

    //                     //    const handleBidReview =() => {
    //                     //         setBacktoBid(!backtoBid);
    //                     //     }  //changes

    //                 }, 3000);
    //             }
    //             else {
    //                 toast.error(`This Tender Allready exist `, {
    //                     position: toast.POSITION.BOTTOM_CENTER,
    //                 });
    //             }
    //         })
    //         .catch(error => {
    //             toast.success(`This Tender Allready exist `, {
    //                 position: toast.POSITION.BOTTOM_CENTER,
    //             });
    //         });
    // };



    // console.log("selectedRFQ", selectRfqdata)
    return (
        <>
            {backtoNext ? (
                <TenderReview  Tenderselectdata={Tenderselectdata}/>
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

