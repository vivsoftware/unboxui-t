import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";

const Dashboard = ({ userDe, rfq, tender }) => {
    const [user, setUser] = useState(null);
    const [RfqNo, setRfqNo] = useState(null);
    const [TenderNo, setTendero] = useState(null);
    const [BuyerInfo, setBuyerInfo] = useState(null);
    const [SellerInfo, setSellerInfo] = useState(null);
    const [data, setData] = useState(null);


    useEffect(() => {
        setUser(userDe)
    }, [])
    const handleRFQ = () => {
        return (
            <div className={`${activeTab === '0' ? 'active' : ''}`} tabId={0}></div>
        )
    }


    useEffect(() => {
        // setData(getBuyerLength())

    }, []);
    console.log("sfasfaf", userDe)


    const data11 = [
        ["RFQs", "Tenders"],
        ["RFQs", rfq?.length],
        ["Tenders", tender?.length],

    ];

    const rfqtender = {
        title: "RFQS & Tender",
        sliceVisibilityThreshold: 0.6, // 20%
        colors: ['#ff8400', '#5f5f5f'],


    };


    const options = {

        title: "Company Performance",

        sliceVisibilityThreshold: 0.2, // 20%
        // colors: ['#ff7f50', '#b8860b'],
        radius: ['50%'],
        // height: ['10px'],
        // width: ['10px'],

    };

    const data12 = [
        ["", ""],
        ["", 33],
        ["", 26],
    ];

    const options1 = {
        title: "Company Performance",
        sliceVisibilityThreshold: 0.2, // 20%
        // colors: ['#ff7f50', '#b8860b'],
        // height: ['10px'],
        // width: ['10px'],
        radius: ['50%'],

    };


    return (

        <>

            {/* <Appani className='ani1' /> */}


            <div>

                <h4>Hi.{userDe?.firstName}</h4>
                <p>Welcome to your dashboard</p>

            </div>
            {/* <CustomBarChart data1={data1} /> */}
            {/* <StackBars/> */}
            {/* desktop view upper block */}
            <div className='grid-container sm-6' id="upper">
                <div className=' grid-item '>
                    <div >
                        <h5 className='rfq-text'> RFQs</h5>
                        <p className='rfq-text' style={{ fontSize: '50px', marginTop: '38px', color: '#015867' }}>{rfq?.length}</p>
                    </div>
                </div>
                <div className=' grid-item'>
                    <h5 className='rfq-text'>Tenders</h5>
                    <p className='rfq-text' style={{ fontSize: '50px', marginTop: '38px', color: '#015867' }}>{tender?.length}</p>
                </div>
                <div className=' grid-item'>
                    <h5 className='rfq-text'>Bids</h5>
                    <p className='rfq-text' style={{ fontSize: '50px', marginTop: '38px', color: '#015867' }}>{0}</p>
                </div>

                {/* <RecipeReviewCard /> */}
                {/* <card className='grid-item2'>
                    <img height={120} width={200} src="https://www.unboxindustry.com/_next/image?url=https%3A%2F%2Fstrapi.unboxindustry.com%2Fuploads%2F1684237488053_4bb22bf76e.jpeg&w=384&q=75" />
                </card> */}
            </div >


            {/* mobile view view upper block */}
            <div className='upperblock01' id="grid01_mobile">
                <div className=' grid-itemmobile ' style={{ borderSpacing: "1px" }}>
                    <div >
                        <h5 className='rfq-textmobile'> RFQs</h5>
                        <p className='rfq-textmobile' style={{ fontSize: '30px', marginTop: '14px', color: '#015867' }}>{rfq?.length}</p>
                    </div>
                </div>
                <div className=' grid-itemmobile'>
                    <h5 className='rfq-textmobile'>Tenders</h5>
                    <p className='rfq-textmobile' style={{ fontSize: '30px', marginTop: '14px', color: '#015867' }}>{tender?.length}</p>
                </div>
                <div className=' grid-itemmobile'>
                    <h5 className='rfq-textmobile'>Bids</h5>
                    <p className='rfq-textmobile' style={{ fontSize: '3    0px', marginTop: '14px', color: '#015867' }}>0</p>
                </div>
            </div >


            {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/* desktop view 2nd block */}

            <div className='gridrfq-containerR' id="grid1">
                <div className='detailsR' id='grid'>
                    <h3 className='text-center mb-1'>RFQ Details</h3>
                    <div className='row ms-1'>
                        <table>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Phone</th>
                            </tr>
                            <tbody>
                                {rfq?.slice(0, 5).map((buyer, index) => (
                                    <tr key={index + 1}>
                                        <td>{index + 1}</td>
                                        <td>{buyer.id}</td>
                                        <td>{buyer?.firstName}</td>
                                        <td>{buyer?.phoneNumber}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='row'>
                        <div className='col-12 text-end'>
                            <button className='btn' style={{ backgroundColor: 'white', color: "#FF8400", height: '20px', padding: '0' }} >View All</button>
                        </div>
                    </div>
                </div>
                <div className='detailsR' id='grid'>
                    <h3 className='text-center mb-1'>Tender Details</h3>
                    <div className='row ms-1'>
                        <table>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Phone</th>
                            </tr>
                            <tbody>
                                {tender?.slice(0, 5).map((seller, index) => (
                                    <tr key={index + 1}>
                                        <td>{index + 1}</td>
                                        <td>{seller.id}</td>
                                        <td>{seller?.firstName}</td>
                                        <td>{seller?.phoneNumber}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='row'>
                        <div className='col-12 text-end'>
                            <button className='btn' style={{ backgroundColor: 'white', color: "#FF8400", height: '20px', padding: '0' }} >View All</button>
                        </div>
                    </div>
                </div>
                <div className='detailsR' id='grid'>
                    <h3 className='text-center mb-1'>Bids Details</h3>
                    <div className='row ms-1'>
                        <table>
                            <tr>
                                <th>Date</th>
                                <th>TId</th>
                                <th>Project Name</th>
                            </tr> 
                            <tbody>
                                {RfqNo?.slice(0, 5).map((tender, index) => (
                                    <tr key={index + 1}>
                                        <td>{index + 1}</td>
                                        <td>{tender.id}</td>
                                        <td>{tender?.projectName}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='row'>
                        <div className='col-12 text-end'>
                            <button className='btn' style={{ backgroundColor: 'white', color: "#FF8400", height: '20px', padding: '0' }} >View All</button>
                        </div>
                    </div>
                </div>
            </div>



            {/* <div className='gridrfq-container01' id="grid01">
                <div className='details001' id='grid01'>
                    <h3 className='text-center mb-1' style={{marginLeft: '100px'}}>RFQs Details</h3>
                    <div className='row ms-1' style={{width: '100px'}}>
                        <table>
                            <tr>
                                <th>RId</th>
                                <th>Name</th>
                                <th>Project Name</th>
                                <th>PhoneNumber</th>
                            </tr>
                            <tbody>
                                {rfq?.slice(0, 5).map((buyer, index) => (
                                    <tr key={index + 1}>
                                        <td>{index + 1}</td>
                                        <td>{buyer.id}</td>
                                        <td>{buyer?.projectName}</td>
                                        <td>{buyer?.phoneNumber}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                </div>
                <div className='row'>
                    <div className='col-12 text-end'>
                        <button className='btn' style={{ backgroundColor: 'white', color: "#FF8400", height: '20px', padding: '0' }} >View All</button>
                    </div>
                </div>
            </div>
            <div className='details001' id='grid01'>
                <h3 className='text-center mb-1' style={{marginLeft: '100px'}}>Tenders Details</h3>
                <div className='row ms-1' style={{width: '100px'}}>
                    <table>
                        <tr>
                                <th>TId</th>
                                <th>Name</th>
                                <th>Project Name</th>
                                <th>PhoneNumber</th>
                            </tr>
                        <tbody>
                            {tender?.slice(0, 5).map((seller, index) => (
                                <tr key={index + 1}>
                                    <td>{index + 1}</td>
                                    <td>{seller.id}</td>
                                    <td>{seller?.projectName}</td>
                                    <td>{seller?.phoneNumber}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='row'>
                    <div className='col-12 text-end'>
                        <button className='btn' style={{ backgroundColor: 'white', color: "#FF8400", height: '20px', padding: '0' }} >View All</button>
                    </div>
                </div>
            </div>
           
            <div className='details001' id='grid01'>
                <h3 className='text-center' style={{marginLeft: '100px'}}>Bids Details</h3>
                <div className='row ms-1'style={{width: '100px'}}>
                    <table>
                        <tr>
                            <th>Sr.no</th>
                            <th>Bids ID</th>
                            <th>Project Name</th>
                        </tr>
                        <tbody>
                            {RfqNo?.slice(0, 5).map((rfq, index) => (
                                <tr key={index + 1}>
                                    <td>{index + 1}</td>
                                    <td>{rfq.id}</td>
                                    <td>{rfq?.purposeOfRfq}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='row'>
                    <div className='col-12 text-end'>
                        <button className='btn' style={{ backgroundColor: 'white', color: "#FF8400", height: '20px', padding: '0' }} >View All</button>
                    </div>
                </div>
            </div>
        </div >
      */}

            {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            {/* <card className='mx-10'>
                    <img height={200} src='https://www.unboxindustry.com/_next/image?url=https%3A%2F%2Fstrapi.unboxindustry.com%2Fuploads%2FBlack_and_Orange_Modern_Food_Promotion_Instagram_Post_a2555d9fa0_1_1_1_943108e1fb.jpg&w=384&q=75' />
                </card> */}

            {/* mobile view 2nd block */}

            <div className='secondblock1' id="grid02_mobile">
                <div className='detailsmobile1' id="grid02_mobile">
                    <h3 className='text-center mb-1'>RFQs Details</h3>
                    <div className='row ms-1'>
                        <table>
                            <tr>
                                <th>RId</th>
                                <th>Name</th>
                                <th>Project Name</th>
                                <th>PhoneNumber</th>

                            </tr>
                            {/* <tbody>
                                    {BuyerInfo?.slice(0, 5).map((buyer, index) => (
                                        <tr key={index + 1}>
                                            <td>{index + 1}</td>
                                            <td>{buyer.id}</td>
                                            <td>{buyer?.projectName}</td>
                                            <td>{buyer?.phoneNumber}</td>
                                        </tr>
                                    ))}
                                </tbody> */}
                        </table>
                    </div>
                    <div className='row'>
                        <div className='col-12 text-end'>
                            <button className='btn' style={{ backgroundColor: 'white', color: "#FF8400", height: '20px', padding: '0' }} >View All</button>
                        </div>
                    </div>
                </div>
                <div className='detailsmobile1' id="grid02_mobile">
                    <h3 className='text-center mb-1'>Tenders Details</h3>
                    <div className='row ms-1'>
                        <table>
                            <tr>
                                <th>TId</th>
                                <th>Name</th>
                                <th>Project Name</th>
                                <th>PhoneNumber</th>

                            </tr>
                            {/* <tbody>
                                    {SellerInfo?.slice(0, 5).map((seller, index) => (
                                        <tr key={index + 1}>
                                            <td>{index + 1}</td>
                                            <td>{seller.id}</td>
                                            <td>{seller?.projectName}</td>
                                            <td>{seller?.phoneNumber}</td>
                                        </tr>
                                    ))}
                                </tbody> */}
                        </table>
                    </div>
                    <div className='row'>
                        <div className='col-12 text-end'>
                            <button className='btn' style={{ backgroundColor: 'white', color: "#FF8400", height: '20px', padding: '0' }} >View All</button>
                        </div>
                    </div>
                </div>
                {/* <card className='mx-10'>
                    <img height={200} src='https://www.unboxindustry.com/_next/image?url=https%3A%2F%2Fstrapi.unboxindustry.com%2Fuploads%2FBlack_and_Orange_Modern_Food_Promotion_Instagram_Post_a2555d9fa0_1_1_1_943108e1fb.jpg&w=384&q=75' />
                </card> */}

                <div className='detailsmobile1' id="grid02_mobile">
                    <h3 className='text-center mb-1'>Bids Details</h3>
                    <div className='row ms-1'>
                        <table>
                            <tr>
                                <th>Sr.no</th>
                                <th>Bids Id</th>
                                <th>Bids Name</th>
                            </tr>
                            {/* <tbody>
                                    {SellerInfo?.slice(0, 5).map((seller, index) => (
                                        <tr key={index + 1}>
                                            <td>{index + 1}</td>
                                            <td>{seller.id}</td>
                                            <td>{seller?.firstName}</td>
                                            <td>{seller?.phoneNumber}</td>
                                        </tr>
                                    ))}
                                </tbody> */}
                        </table>
                    </div>
                    <div className='row'>
                        <div className='col-12 text-end'>
                            <button className='btn' style={{ backgroundColor: 'white', color: "#FF8400", height: '20px', padding: '0' }} >View All</button>
                        </div>
                    </div>
                </div>
                {/* <card className='mx-10'>
                    <img height={200} src='https://www.unboxindustry.com/_next/image?url=https%3A%2F%2Fstrapi.unboxindustry.com%2Fuploads%2FBlack_and_Orange_Modern_Food_Promotion_Instagram_Post_a2555d9fa0_1_1_1_943108e1fb.jpg&w=384&q=75' />
                </card> */}
            </div >
            {/* </div > */}

            {/* <card className='mx-10'>
                    <img height={200} src='https://www.unboxindustry.com/_next/image?url=https%3A%2F%2Fstrapi.unboxindustry.com%2Fuploads%2FBlack_and_Orange_Modern_Food_Promotion_Instagram_Post_a2555d9fa0_1_1_1_943108e1fb.jpg&w=384&q=75' />
                </card> */}

            {/* desktop view of 3rd block */}
            {/* <div className='details11' id='last1'> */}
            <div className='details01' id='last1'>
                <div className='details012' id='last1' >
                    {/* <div> */}
                    <Chart
                        chartType="PieChart"
                        data={data11}
                        options={rfqtender}
                        width={"0%"}
                        height={"0%"}
                    />
                    {/* </div> */}

                </div>
            </div>
            <div className='details02' id='last1'>
                <div className='details013' id='last1'>
                    <Chart
                        chartType="PieChart"
                        data={data12}
                        options={options1}
                        width={"0%"}
                        height={"0%"}
                    />
                </div>
            </div>
            {/* </div> */}


            {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            {/* mobile view of 3rd block */}

            {/* <div className='details1' id='grid4_mobile'> */}
            {/* <div className='secondblock1' id='grid02_mobile'> */}
            <div className='details012' id='grid04_mobile'>
                <div>
                    <Chart
                        chartType="PieChart"
                        data={data11}
                        options={options}
                        width={"0%"}
                        height={"0%"}
                    />
                </div>
            </div>
            {/* </div> */}
            {/* <div className='details2' id='grid4_mobile'> */}
            <div className='details013' id='grid04_mobile' >
                <Chart
                    chartType="PieChart"
                    data={data12}
                    options={options1}
                    width={"0%"}
                    height={"0%"}
                />
            </div>
            {/* </div> */}
        </>
    )
}
export default Dashboard;


