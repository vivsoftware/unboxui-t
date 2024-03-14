import React, { useState } from 'react';
import BidContain from './BidContain';
import { MdKeyboardBackspace } from 'react-icons/md';
import BidShortlist from './BidShortlist';


const BidCompare = () => {

    const [backtoContain, setBacktoContain] = useState(false);
    const [backtoShortlist, setBacktoShortlist] = useState(false);

    const handleBacktoContain = () => {
        // setBacktoContain(!backtoContain);
        setBacktoContain(true);
    }

    const handleBidShortlist = () => {
        setBacktoShortlist(!backtoShortlist);
    }

    return (
        <>

            {backtoShortlist ? (       //changes for working back and next button together "IMPORTTANT"
                <BidShortlist />
            ) : backtoContain ? (
                <BidContain />
            ) : (

                // {/* {backtoContain && <BidContain />}
                // {!backtoContain && ( */}

                <>
                    <div className='bids'>
                        <div>
                            <button onClick={handleBacktoContain} style={{ fontSize: '20px', justifyContent: 'end' }}><MdKeyboardBackspace />Back</button>
                        </div>


                        {/* <div className='bid-compare'> */}
                        <div className='RFQ-Card1' >
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-10'>
                                        <h5>Quoted Value: 26,00,000</h5> <br /> <br />
                                        <h5>Delivery Period: 2 Months</h5> <br /> <br />
                                        <h5>Delivery Location: Mumbai</h5> <br /> <br />
                                        <h5>Annual Revenue: 5 Cr</h5> <br /> <br />
                                        <h5> Years in Bussiness: 2</h5> <br /> <br />
                                        <h5>Certifications: UR ISO GST Company</h5>
                                        {/* <div>
                                            <button className='btn btn-primary' style={{ justifyContent: 'center', marginTop: '20px' }}>Shortlist</button>
                                        </div> */}
                                        <div>
                                            <button className='btn btn-primary' onClick={() => handleBidShortlist()} style={{ justifyContent: 'center', marginTop: '20px' }}>Shortlist</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <div className='bid-compare'> */}
                        <div className='RFQ-Card2' >
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-10'>
                                        <h5>Quoted Value: 26,00,000</h5> <br /> <br />
                                        <h5>Delivery Period: 2 Months</h5> <br /> <br />
                                        <h5>Delivery Location: Mumbai</h5> <br /> <br />
                                        <h5>Annual Revenue: 5 Cr</h5> <br /> <br />
                                        <h5> Years in Bussiness: 2</h5> <br /> <br />
                                        <h5>Certifications: UR ISO GST Company</h5>
                                        {/* <div>
                                            <button className='btn btn-primary' style={{ justifyContent: 'center', marginTop: '80px' }}>Shortlist</button>
                                        </div> */}

                                        <div>
                                            <button className='btn btn-primary' onClick={() => handleBidShortlist()} style={{ justifyContent: 'center', marginTop: '80px' }}>Shortlist</button>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                        {/* </div> */}

                        {/* <div className='bid-compare'> */}
                        <div className='RFQ-Card3' >
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-10'>
                                        <h5>Quoted Value: 26,00,000</h5> <br /> <br />
                                        <h5>Delivery Period: 2 Months</h5> <br /> <br />
                                        <h5>Delivery Location: Mumbai</h5> <br /> <br />
                                        <h5>Annual Revenue: 5 Cr</h5> <br /> <br />
                                        <h5> Years in Bussiness: 2</h5> <br /> <br />
                                        <h5>Certifications: UR ISO GST Company</h5>
                                    </div>

                                    <div>
                                        <button className='btn btn-primary' onClick={() => handleBidShortlist()} style={{ justifyContent: 'center', marginTop: '20px' }}>Shortlist</button>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                    {/* // // </div> */}
                    {/* // </div> */}

                </>
            )}

        </>
    )
}

export default BidCompare;
