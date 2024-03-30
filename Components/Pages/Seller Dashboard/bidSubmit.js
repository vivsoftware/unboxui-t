
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { MdKeyboardBackspace, MdOutlineVerified } from "react-icons/md";
import { VscUnverified } from 'react-icons/vsc';
import { toast } from 'react-toastify';
import { Input } from 'reactstrap';
import spring_boot_url from '../../../Utils/springApi';
import BidNext from './BidNext';
import bidViewContain from './bidView';

const BidSubmit = ({ BidTender }) => {
    const [bidMessage, setBidMessage] = useState(false);
    const [message, setMessage] = useState(true);
    const [annualRevenue, setannualRevenue] = useState(true);
    const [yearsInBusiness, setyearsInBusiness] = useState(true);
    const [industriesServed, setindustriesServed] = useState(true);
    const [numberOfEmployees, setnumberOfEmployees] = useState(true);
    const [certifications, setcertifications] = useState(true);
    const [bidAmount, setbidAmount] = useState(true);
    const [technicalSpecs, settechnicalSpecs] = useState(true);
    const [otherDocs,setotherDocs] = useState(true); 
    const [bidSubmissionDate, setbidSubmissionDate] = useState(true);
    const [bidData, setBidData] = useState(false);


    const [backtoNext, setBacktoNext] = useState(false);

    const handleBacktoBids = () => {
        setMessage(!message);
        // setMessage(true);

    }
    const handleBidProcess = () => {

        const requiredFields = [
            'annualRevenue',
            'employeeNumber',
            'bussinessYears',
            'industriesServed',
            'certification',
            'bidAmount',
            // 'technicalSpecs',
            // 'otherDocs'
        ];


        const isFormValid = requiredFields.every(field => {
            const value = document.querySelector(`#${field}`).value.trim();
            return value !== ''; // Check if value is not empty
        });

        if (isFormValid) {
            // Store form data


            // Store form data
            const formData = {
                annualRevenue: document.querySelector('#annualRevenue').value,
                employeeNumber: document.querySelector('#employeeNumber').value,
                bussinessYears: document.querySelector('#bussinessYears').value,
                industriesServed: document.querySelector('#industriesServed').value,
                certification: document.querySelector('#certification').value,
                bidAmount: document.querySelector('#bidAmount').value,
                // technicalSpecs: document.querySelector('#technicalSpecs').value,
                // otherDocs: document.querySelector('#otherDocs').value,
            };

            localStorage.setItem('formData', JSON.stringify(formData));
            //setBacktoNext(true);
            setBidMessage(true);
        } else {
            alert('Please fill in all the required fields');
        }
        //////////////////end/////////////// 
        //setBidMessage(!bidMessage)
    }

    const handleReload = () => {
        setTimeout(() => {

            router.reload();
        }, 2000);
    };
    ////////////////////////////////////// Bid creation code ////////////////////////////////////..../////////////

    const CreateBid = () => {
        const userDetails = {
            tenderId: `${BidTender?.id}`,
            userId: `${BidTender?.userId}`,
            bidSubmissionDate: "546",
            description: `${BidTender.description}`,
            closingDate: "258",
            bidAmount,
            bidId: "45",
            annualRevenue,
            numberOfEmployees,
            yearsInBusiness,
            industriesServed,
            openingDate: "2323",
            certifications: 'UR',
            originalFilename: "FILE"

        };
        fetch(`${spring_boot_url}api/sellersbid/add`, {
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
    };




    return (
    <>
        {/* { bidMessage ? (
            <BidNext/>
         ) : message ? (
            <bidViewContain/>
         ) : ( 
            <> */}
      
            {bidMessage ? (<BidNext />) : (
           <>
        
                    <div className='container'>
                        <div className='row mt-2'>
                            <p onClick={handleBacktoBids} style={{ color: '#FF8400', fontSize: '20px' }}><MdKeyboardBackspace /> Back</p>
                            <div className='row mt-1'>
                                <p>Tender Id : {BidTender.id}</p>
                                <p>Description {BidTender.description} </p>
                                <p>Opening Date: 08-01-2024/Closing Date:never</p>
                            </div>
                            <div className='bid-creation-card'>
                                <div className='row'>
                                    <div className='col-6'>
                                        <div className='tender-specs-card'>
                                            <div className='container'>
                                                <div className='row mt-1'>
                                                    <div className='col-4'>
                                                        <label>Annual Revenue :</label>
                                                    </div>
                                                    <div className='col-7'>
                                                        <Input type='number' placeholder='10,00,00,000' id='annualRevenue' value={annualRevenue}
                                                            onChange={(e) => setannualRevenue(e.target.value)}
                                                            required />

                                                    </div>
                                                </div>
                                                <div className='row mt-1'>
                                                    <div className='col-4'>
                                                        <label>No. of Employees :</label>
                                                    </div>
                                                    <div className='col-7'>
                                                        <Input type='number' placeholder='200' id='employeeNumber' value={numberOfEmployees}
                                                            onChange={(e) => setnumberOfEmployees(e.target.value)}
                                                            required />
                                                    </div>
                                                </div>
                                                <div className='row mt-1'>
                                                    <div className='col-4'>
                                                        <label>Years in Business :</label>
                                                    </div>
                                                    <div className='col-7'>
                                                        <Input type='number' placeholder='20' id='bussinessYears' value={yearsInBusiness}
                                                            onChange={(e) => setyearsInBusiness(e.target.value)}
                                                            required />
                                                    </div>
                                                </div>
                                                <div className='row mt-1'>
                                                    <div className='col-4'>
                                                        <label>Industries Served :</label>
                                                    </div>
                                                    <div className='col-7'>
                                                        <Input type='number' placeholder='0' id='industriesServed' value={industriesServed}
                                                            onChange={(e) => setindustriesServed(e.target.value)}
                                                            required />
                                                    </div>
                                                </div>
                                                <div className='row mt-1'>
                                                    <div className='col-4'>
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
                                    <div className='col-6'>
                                        <div className='container'>
                                            <div className='row mt-1'>
                                                <div className='col-5'>
                                                    <label>Bid Amount :</label>
                                                </div>
                                                <div className='col-7'>
                                                    <Input type='number' placeholder='50,00,000' id='bidAmount' value={bidAmount}
                                                        onChange={(e) => setbidAmount(e.target.value)}
                                                        required />
                                                </div>
                                            </div>
                                            <div className='row mt-1'>
                                                <div className='col-5'>
                                                    <label>Upload Technical Specs: </label>
                                                </div>
                                                <div className='col-7'>
                                                    <Input type='file' placeholder='50,00,000' id='technicalSpecs' />
                                                </div>
                                            </div>
                                            <div className='row mt-1'>
                                                <label>Required Other Docs : </label>
                                            </div>
                                            <div className='row mt-1'>
                                                <div className='col-12'>
                                                    <div className='row mt-1'>
                                                        <div className='col-12'>
                                                            <div className='doc-card'>
                                                                <p className='text-center'>GST <MdOutlineVerified className='verified ' /></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='row mt-1'>
                                                        <div className='col-12'>
                                                            <div className='doc-card'>
                                                                <p className='text-center'>CIN <MdOutlineVerified className='verified ' /></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='row mt-1'>
                                                        <div className='col-12'>
                                                            <div className='doc-card'>
                                                                <p className='text-center'>CRC <MdOutlineVerified className='verified ' /></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='row mt-1'>
                                                        <div className='col-6'>
                                                            <div className='doc-card'>
                                                                <p className='text-center'>MSME <VscUnverified className='unverified ' /></p>
                                                            </div>
                                                        </div>
                                                        <div className='col-6'>
                                                            <Input type='file' />
                                                        </div>
                                                    </div>
                                                    <div className='row mt-1'>
                                                        <div className='col-6'>
                                                            <div className='doc-card'>
                                                                <p className='text-center'>Bank Mandot <VscUnverified className='unverified ' /></p>
                                                            </div>
                                                        </div>
                                                        <div className='col-6'>
                                                            <Input type='file' />
                                                        </div>
                                                    </div>
                                                    <div className='row mt-1'>
                                                        <div className='col-6'>
                                                            <div className='doc-card'>
                                                                <p className='text-center'>CC Copy <VscUnverified className='unverified ' /></p>
                                                            </div>
                                                        </div>
                                                        <div className='col-6'>
                                                            <Input type='file' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row mt-5' style={{ display: 'flex', justifyContent: 'end' }}>
                                <button className='btn back-btn' onClick={() => CreateBid()} style={{ float: 'right' }}>Bid</button>

                                <button className='btn back-btn' onClick={() => handleBidProcess()} style={{ float: 'right' }}>Next</button>
                                {/* <button className='btn compare-btn'>Review</button>
                        <button className='btn compare-btn ms-2'>Submit</button> */}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default BidSubmit;