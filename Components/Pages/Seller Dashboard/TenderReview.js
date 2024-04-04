import React, { useState,useEffect } from 'react';
import { useRouter } from 'next/router';
import { Input } from 'reactstrap';
import { toast } from 'react-toastify'
import { MdKeyboardBackspace, MdOutlineVerified } from "react-icons/md";
import spring_boot_url from '../../../Utils/springApi';
import BidSubmit from './bidSubmit';
import TenderNextStep from './TenderNextStep';



const TenderReview = ({ Tenderselectdata }) => {
    const [backtoNext, setBacktoNext] = useState(false);
    const [formData, setFormData] = useState({});
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

    const router = useRouter();

    useEffect(() => {
        // Retrieve the stored form data from local storage
        const storedData = localStorage.getItem('formData');
        if (storedData) {
            setFormData(JSON.parse(storedData));
        }
    }, []);

    const handleBacktoTenders = () => {
        setBacktoNext(!backtoNext);
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
        console.log("create tender Called");
}

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
    //         tenderDiscription: `${formData.description}`,
    //         opportunityAmount: `${formData.opportunityAmount}`,
    //         tenderClosingDate: `${formData.tenderClosingDate}`,
    //         deliveryPeriod: `${formData.deliveryPeriod}`,
    //         diliveryLocation: `${formData.deliveryLocation}`,
    //         anaualRevenue: `${formData.annualRevenue}`,
    //         noOfEmployees: `${formData.employeeNumber}`,
    //         yearsInBusiness: `${formData.bussinessYears}`,
    //         industriesServed: `${formData.industriesServed}`,
    //         certification: 'UR',
    //         originalFilename: "FILE"

    //     };
    //     fetch(`${spring_boot_url}api/tender/${selectRfqdata.userId}`, {
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

                
    //                 }, 3000);

    //                 router.reload();

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

    // const router = useRouter();

    ////////////end///////////


    const handleBidReview = () => {
        // You can add navigation logic here if needed
        // For now, I'm setting backtoNext to true
       // setBacktoNext(true);
        CreateTender();
    }


    return (
        <>
        {backtoNext ? (
            <TenderNextStep Tenderselectdata={Tenderselectdata}/>
        ) : (
            <div className='container'>
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
                                                <td><Input type='number' placeholder='Price' value={formData.opportunityAmount || ''} disabled /></td>
                                            </tr>
                                            <tr className='table-row'>
                                                <td>2</td>
                                                <td>Tender Closing Date :</td>
                                                <td><Input type='date' value={formData.tenderClosingDate || ''} disabled /></td>
                                            </tr>
                                            <tr className='table-row'>
                                                <td>3</td>
                                                <td>Delivery Period :</td>
                                                <td><Input type='text' value={formData.deliveryPeriod || ''} disabled /></td>
                                            </tr>
                                            <tr className='table-row'>
                                                <td>4</td>
                                                <td>Delivery Location :</td>
                                                <td> <Input type='text' value={formData.deliveryLocation || ''} disabled /></td>
                                            </tr>
                                            <tr className='table-row'>
                                                <td>5</td>
                                                <td>Description :</td>
                                                <Input type='textarea' value={formData.description || ''} disabled />
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
                                                <td><Input type='number' placeholder='Price' value={formData.annualRevenue || ''} disabled /></td>
                                            </tr>
                                            <tr className='table-row'>
                                                <td>2</td>
                                                <td>No. of Employees :</td>
                                                <td>  <Input type='number' placeholder='200' value={formData.employeeNumber || ''} disabled /></td>
                                            </tr>
                                            <tr className='table-row'>
                                                <td>3</td>
                                                <td>Years in Business :</td>
                                                <td><Input type='number' placeholder='20' value={formData.bussinessYears || ''} disabled /></td>
                                            </tr>
                                            <tr className='table-row'>
                                                <td>4</td>
                                                <td>Industries Served :</td>
                                                <td><Input type='number' placeholder='0' value={formData.industriesServed || ''} disabled /></td>
                                            </tr>
                                            <tr className='table-row'>
                                                <td>5</td>
                                                <td>Certifications :</td>
                                                <td>
                                                    <Input type='number' placeholder='0' value={formData.certification || ''} disabled />
                                                    {/* <Input type='checkbox' />UR &ensp;
                                                        <Input type='checkbox' />ISO &ensp;
                                                        <Input type='checkbox' />GST &ensp;
                                                        <Input type='checkbox' />OTHERS <br /><br /> */}

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
        )}
    </>

    )
}

export default TenderReview ;