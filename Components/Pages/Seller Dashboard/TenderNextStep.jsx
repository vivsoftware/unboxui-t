import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { MdKeyboardBackspace } from "react-icons/md";
import { toast } from 'react-toastify';
import { Input } from 'reactstrap';
import spring_boot_url from '../../../Utils/springApi';
import TenderContain from './TenderContain';
import TenderReview from './TenderReview';


const TenderNextStep = ({ Tenderselectdata }) => {
    const router = useRouter();

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

    const [backtoNext, setBacktoNext] = useState(false);

    const handleBacktoTender = () => {
        // setBacktoTender(true);
        setBacktoTender(!backtoTender)
    }
    const handleBidReview = () => {
        ///////////changes/////////////

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
        //////////////////end///////////////
        // setBacktoNext(!backtoNext);
    }
    const handleReload = () => {
        setTimeout(() => {

            router.reload();
        }, 2000);
    };

    console.log("Tenderselectdata in TenderNextStep", Tenderselectdata);
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
                toast.warning(`This Tender Allready exist `, {
                    position: toast.POSITION.BOTTOM_CENTER,
                });
            });
    }

    return (
        <>
            {backtoNext ? (
                <TenderReview Tenderselectdata={Tenderselectdata} />
            ) : backtoTender ? (
                <TenderContain />
            ) : (
 
                // {/* {backtoTender && <TenderContain />}
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

export default TenderNextStep

