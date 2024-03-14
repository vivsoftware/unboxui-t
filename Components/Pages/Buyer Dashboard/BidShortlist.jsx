import React, { useState, useEffet } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { VscUnverified } from "react-icons/vsc";
import { MdOutlineVerified } from "react-icons/md";
import BidCompare from "./BidCompare";


const BidShortlist = () => {

    const [backtoCompare, setBacktoCompare] = useState(false);

    const handleBacktoCompare = () => {
        setBacktoCompare(!backtoCompare);
    }
    return (
        <>
            {backtoCompare && <BidCompare />}
            {!backtoCompare && (
                <>

                    <div className="Compare">
                        <div>

                            <button onClick={handleBacktoCompare} style={{ fontSize: '20px' }}><MdKeyboardBackspace />Back</button>
                        </div>


                        <div className='RFQ-Card11'>
                            <div className='container'>
                                <div className='row'>
                                    <div col-10>
                                        <div className="button1">
                                            <MdOutlineVerified className='verified' style={{ color: 'green', fontSize: '44px', marginTop: '0px', justifyContent: 'end' }} />
                                        </div>
                                        <div className="circle0">
                                            <p></p>
                                        </div>
                                        <h4 style={{ marginRight: '-176px', fontSize: '14px', marginTop: '20px' }}>Finalized Bid</h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <div className="button1">
                            <MdOutlineVerified className='verified' style={{ color: 'green', fontSize: '44px', marginTop: '0px', justifyContent: 'end' }} />
                        </div>
                        <div className="circle0">
                            <p></p>
                        </div>
                        <h4 style={{ marginRight: '-176px', fontSize: '14px', marginTop: '20px' }}>Finalized Bid</h4> */}


                        <div className='RFQ-Card12'>
                            <div className='container'>
                                <div className='row'>
                                    
                                    <div col-10>
                                        <div className="button1">

                                        </div>
                                        <div className="circle1">
                                            <p></p>
                                        </div>
                                        <h4 style={{ marginRight: '160px', fontSize: '14px', marginTop: '20px' }}>Payment</h4>
                                    </div>
                                </div>

                                <div col-10>
                                    <div className="button1">

                                    </div>
                                    <div className="circle2">
                                        <p></p>
                                    </div>
                                    <h4 style={{ marginRight: '-260px', fontSize: '14px', marginTop: '20px' }}>Vendor Onboarding</h4>
                                </div>
                            </div>
                        </div>

                        <div className='RFQ-Card13'>
                            <div className='container'>
                                <div className='row'>
                                    <div col-10>
                                        <MdOutlineVerified className='verified' style={{ color: '#FF8400', fontSize: '70px' }} />
                                        <h2 style={{ color: '#FF8400' }}>Congratulations</h2>
                                        <h3 style={{ color: '#FF8400' }}>You've Finalized This Bid</h3> <br /> <br />
                                        <h3 style={{ color: 'grey', textAlign: 'left', paddingLeft: '260px' }}>Vender Name- &nbsp; <span><h2 style={{ color: 'black' }}>Xyz.Pvt.Ltd.</h2></span></h3> <br />
                                        <h3 style={{ color: 'grey', textAlign: 'left', paddingLeft: '260px' }}>Bid id- &nbsp; <span><h2 style={{ color: 'black' }}>1100</h2></span></h3> <br />
                                        <h3 style={{ color: 'grey', textAlign: 'left', paddingLeft: '260px' }}>Start Date- &nbsp; <span><h2 style={{ color: 'black' }}>2/12/22</h2></span></h3> <br />
                                        <h3 style={{ color: 'grey', textAlign: 'left', paddingLeft: '260px' }}>Delivery Period- &nbsp; <span><h2 style={{ color: 'black' }}>2 Months</h2></span></h3> <br />
                                        <h3 style={{ color: 'grey', textAlign: 'left', paddingLeft: '260px' }}>Bid Amount- &nbsp; <span><h2 style={{ color: 'black' }}>25,00,000</h2></span></h3> <br />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default BidShortlist;
