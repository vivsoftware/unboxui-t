import React, { useEffect, useState } from 'react';
// import BidContain from './BidContain'
import Link from 'next/link';
import spring_boot_url from '../../../Utils/springApi';
import BidSubmit from './bidSubmit';
const bidViewContain = ({ BidTender, userDe }) => {
    const [details, setDetails] = useState(false);
    const [uploadRfq, setuploadRfq] = useState("");


    const handleBidProcess = (BidTender) => {
        setDetails(true);
    }
    const formatDate = (dateString) => {
        const originalDate = new Date(dateString);
        const day = originalDate.getDate();
        const month = originalDate.getMonth() + 1; // Months are zero-indexed, so add 1
        const year = originalDate.getFullYear() % 100; // Getting last two digits of the year

        // Padding single digits with a leading zero
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedYear = year < 10 ? `0${year}` : year;

        return `${formattedDay}-${formattedMonth}-${formattedYear}`;
    };

    console.log("bidtenderdetails", BidTender)


    ////////////////////////////////....attached...file...get...code.....//////////////////////////////////////////////////////////////////

    useEffect(() => {
        const bidDetails = {
            tenderId,
            userId,
            bidId,
            description,
            openingDate,
            closingDate,
            annualRevenue,
            numberOfEmployees,
            yearsInBusiness,
            industriesServed,
            certifications,
            bidAmount,
        };

        fetch(`${spring_boot_url}api/sellersbid/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bidDetails),
        }).then((resp) => {
            // setRfqData(resp.data);
            if (resp.ok === true) {


            }

        });
    }, [])



















    return (
        <>
            {details ? (<BidSubmit BidTender={BidTender} />) : (


                <div className='container message-display' style={{ maxHeight: '900px', overflow: 'auto' }}>
                    <div className='row mt-2'>
                        <div className='col-6'>
                            <h2 className='fw-normal'>Mr.{userDe?.firstName}</h2>
                            <h4>Unbox Industry</h4>
                        </div>
                        <div className='col-6 text-end'>
                            <h4>Member Since</h4>
                            <h6>Jul, 2020</h6>
                        </div>
                        <hr></hr>
                    </div>
                    <div className='row'>

                        <p>Dear Mr. {userDe?.firstName}, <br></br><br></br>

                            I have been introduced to your company by Unbox Industry.<br></br><br></br>

                            Below are the requirement details : <br></br>
                            Probable Requirement Type : Business Use<br></br>
                            {BidTender.purposeOfRfq == "product" ? (
                                <>

                                    <p>
                                        Tender was Published on {BidTender?.createdAt}
                                        Tender is Regrading  Product Requriment
                                    </p>
                                    <h3>Products enquired by the buyer :</h3>
                                    <table className='info-tableBid' >
                                        <thead >
                                            <tr>
                                                <th>Product Name</th>
                                                <th>Model Number</th>
                                                <th>Tender Create Date</th>
                                                <th>Tender Closing Date</th>
                                                <th>quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{BidTender.projectName}</td>
                                                <td>{BidTender.modelNo}</td>
                                                <td>{BidTender.createdAt}</td>
                                                <td>{BidTender.tenderClosingDate}</td>
                                                <td>{BidTender.quantity}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <span><h4>Our Application is {BidTender.purpose}</h4></span>

                                </>
                            ) : (
                                <>
                                </>
                            )}
                            <h3>Kindly Bid for the same.</h3>

                        </p>
                        <hr></hr>
                    </div>

                    <div className='row'>
                        <div className='col-8'>
                            <h5 className='mb-2'>Attached Documents:</h5>
                            {uploadRfq ? (
                                <Link href={`${spring_boot_url}api/rfqdoc/download/${BidTender?.rfqId}`}>
                                    <p> <img src='/image.svg' />Download </p>

                                </Link>
                            ) : (
                                <p>Buyer have no Attached Documents </p>
                            )}

                            {/* <p> <img src='/RFQ icon.svg' /> RFQ</p> */}

                            {/* <p> <img src='/Pdf.svg' /> Pdf</p> */}

                        </div>
                    </div>
                    <div className='row mb-2' >
                        <button className='btn back-btn' onClick={() => handleBidProcess(BidTender)} style={{ float: 'right' }}>Bid</button>
                    </div>
                </div >
            )}

        </>
    )
}

export default bidViewContain;

