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
    //chnaged hook to null from false
    const [opportunityAmount, setopportunityAmount] = useState('');
    const [tenderClosingDate, settenderClosingDate] = useState('');
    const [deliveryPeriod, setdeliveryPeriod] = useState('');
    const [diliveryLocation, setdiliveryLocation] = useState('');
    const [anaualRevenue, setanaualRevenue] = useState('');
    const [noOfEmployees, setnoOfEmployees] = useState('');
    const [yearsInBusiness, setyearsInBusiness] = useState('');
    const [industriesServed, setindustriesServed] = useState('');
    const [certification, setcertification] = useState('');
    const [tenderDiscription, settenderDescription] = useState('');
    const [tenderCheck, settenderCheck] =useState('');

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

    console.log("Tenderselectdata in TenderReview", Tenderselectdata);
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
    fetch(`${spring_boot_url}api/tender/create/${Tenderselectdata.userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDetails),
    })
        .then((resp) => {
            // setRfqData(resp.data);

            console.log("create tender response", resp);
            console.log("create tender response status", resp.status);
            if (resp.ok === true) {
                toast.warning(`Tender Publishing Please Wait.....`, {
                    position: toast.POSITION.BOTTOM_CENTER,
                });
                setTimeout(() => {
                    toast.success(`Tender Published to Seller `, {
                        position: toast.POSITION.BOTTOM_CENTER,
                    });
                    //handleReload(); to be implemented
                }, 3000);
            }
            else {
                toast.error(`Getting Wrong Status Check Response`, {
                    position: toast.POSITION.BOTTOM_CENTER,
                });
            }
        })
        .catch(error => {
            toast.warn(`This Tender Allready exist error`, {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        });
        console.log("create tender Called");
}

    

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