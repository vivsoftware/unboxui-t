// import React from 'react'
import React from 'react';
import { Chart } from "react-google-charts";

const Dashboard = ({ tender, rfq, userDe }) => {

    const data11 = [
        ["RFQs", "Tenders"],
        ["RFQs", rfq?.length],
        ["Tenders", tender?.length],

    ];

    const options = {

        title: "RFQS & Tender",
        sliceVisibilityThreshold: 0.6, // 20%
        colors: ['#ff8400', '#5f5f5f'],

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
                <div className=' grid-item'>
                    <h5 className='rfq-text'>Users</h5>
                    <p className='rfq-text' style={{ fontSize: '50px', marginTop: '38px', color: '#015867' }}>47</p>
                </div>
                <div className=' grid-item'>
                    <h5 className='rfq-text'>Purchases</h5>
                    <p className='rfq-text' style={{ fontSize: '50px', marginTop: '38px', color: '#015867' }}>0</p>
                </div>
                {/* <RecipeReviewCard /> */}
                {/* <card className='grid-item2'>
              <img height={120} width={200} src="https://www.unboxindustry.com/_next/image?url=https%3A%2F%2Fstrapi.unboxindustry.com%2Fuploads%2F1684237488053_4bb22bf76e.jpeg&w=384&q=75" />
          </card> */}
            </div >


            {/* mobile view view upper block */}
            <div className='upperblock' id="grid1_mobile">
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
                    <p className='rfq-textmobile' style={{ fontSize: '3    0px', marginTop: '14px', color: '#015867' }}>{0}</p>
                </div>
                <div className=' grid-itemmobile'>
                    <h5 className='rfq-textmobile'>Users</h5>
                    <p className='rfq-textmobile' style={{ fontSize: '30px', marginTop: '14px', color: '#015867' }}>47</p>
                </div>
                <div className=' grid-itemmobile'>
                    <h5 className='rfq-textmobile'>Purchases</h5>
                    <p className='rfq-textmobile' style={{ fontSize: '30px', marginTop: '14px', color: '#015867' }}>0</p>
                </div>
            </div >
            {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/* desktop view 2nd block */}

            <div className='gridrfq-container' id="grid1">
                <div className='details' id='grid'>
                    <h3 className='text-center mb-1'>RFQ Details</h3>
                    <div className='row ms-1'>
                        <table>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Project</th>
                                <th>PhoneNumber</th>

                            </tr>
                            <tbody>
                                {rfq?.slice(0, 5).map((rfq, index) => (
                                    <tr key={index + 1}>
                                        <td>{index + 1}</td>
                                        <td>{rfq.id}</td >
                                        <td>{rfq?.projectName}</td>
                                        <td>{rfq?.phoneNumber}</td>
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
                <div className='details' id='grid'>
                    <h3 className='text-center mb-1'>Tender Details</h3>
                    <div className='row ms-1'>
                        <table>
                            <tr>
                                <th>TId</th>
                                <th>Name</th>
                                <th>Project</th>
                                <th>Phone Number</th>
                            </tr>
                            <tbody>
                                {tender?.slice(0, 5).map((tender, index) => (
                                    <tr key={index + 1}>
                                        <td>{index + 1}</td>
                                        <td>{tender.id}</td>
                                        <td>{tender?.projectName}</td>
                                        <td>{tender?.phoneNumber}</td>
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
                <div className='gridrfq-container'>
                    <div className='details' id='grid'>
                        <h3 className='text-center'>Bids Details</h3>
                        <div className='row ms-1'>
                            <table>
                                <tr>
                                    <th>Sr.no</th>
                                    <th>Id</th>
                                    <th>Project Name</th>
                                </tr>
                                {/* <tbody>
                              {RfqNo?.slice(0, 5).map((rfq, index) => (
                                  <tr key={index + 1}>
                                      <td>{index + 1}</td>
                                      <td>{rfq.id}</td>
                                      <td>{rfq?.purposeOfRfq}</td>
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
                    <div className='details' id='grid'>
                        <h3 className='text-center mb-1'>User Details</h3>
                        <div className='row ms-1'>
                            <table>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                </tr>
                                {/* <tbody>
                              {TenderNo?.slice(0, 5).map((tender, index) => (
                                  <tr key={index + 1}>
                                      <td>{index + 1}</td>
                                      <td>{tender.id}</td>
                                      <td>{tender?.purposeOfRfq}</td>
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
                {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}



                {/* mobile view 2nd block */}

                <div className='secondblock' id="grid2_mobile">
                    <div className='detailsmobile' id="grid2_mobile">
                        <h3 className='text-center mb-1'>RFQ Details</h3>
                        <div className='row ms-1'>
                            <table>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Project Name</th>
                                </tr>
                                {/* <tbody>
                              {BuyerInfo?.slice(0, 5).map((buyer, index) => (
                                  <tr key={index + 1}>
                                      <td>{index + 1}</td>
                                      <td>{buyer.id}</td>
                                      <td>{buyer?.firstName}</td>
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
                    <div className='detailsmobile' id="grid2_mobile">
                        <h3 className='text-center mb-1'>Tender Details</h3>
                        <div className='row ms-1'>
                            <table>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Project Name</th>
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

                    <div className='detailsmobile' id="grid2_mobile">
                        <h3 className='text-center mb-1'>Bids Details</h3>
                        <div className='row ms-1'>
                            <table>
                                <tr>
                                    <th>Sr.no</th>
                                    <th>RFQ Id</th>
                                    <th>Project Name</th>
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
                    </div><div className='detailsmobile' id="grid2_mobile" >
                        <h3 className='text-center mb-1'>User Details</h3>
                        <div className='row ms-1'>
                            <table>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Phone</th>
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
            </div >

            {/* <card className='mx-10'>
              <img height={200} src='https://www.unboxindustry.com/_next/image?url=https%3A%2F%2Fstrapi.unboxindustry.com%2Fuploads%2FBlack_and_Orange_Modern_Food_Promotion_Instagram_Post_a2555d9fa0_1_1_1_943108e1fb.jpg&w=384&q=75' />
          </card> */}

            {/* desktop view of 3rd block */}

            <div className='detailsS' id='last'>
                <h3 className='text-center mb-1'>Purchase Details</h3>
                <div className='row ms-1'>
                    <table>
                        <tr>
                            <th>Date</th>
                            <th>PId</th>
                            <th>Project Name</th>
                        </tr>
                        {/* <tbody>
                      {TenderNo?.slice(0, 5).map((tender, index) => (
                          <tr key={index + 1}>
                              <td>{index + 1}</td>
                              <td>{tender.id}</td>
                              <td>{tender?.purposeOfRfq}</td>
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
                <div className='details10' id='last'>
                    <div className='details122' id='last' >
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
                </div>
                <div className='details20' id='last'>
                    <div className='details133' id='last'>
                        <Chart
                            chartType="PieChart"
                            data={data12}
                            options={options1}
                            width={"0%"}
                            height={"0%"}
                        />
                    </div>
                </div>
            </div>






            {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            {/* mobile view of 3rd block */}
            <div className='secondblock' id='grid2_mobile'>
                <div className='detailsmobile' id='grid2_mobile'>
                    <h3 className='text-center mb-1'>Purchase Details</h3>
                    <div className='row ms-1'>
                        <table>
                            <tr>
                                <th>Date</th>
                                <th>PId</th>
                                <th>Project Name</th>
                            </tr>
                            {/* <tbody>
                          {RfqNo?.slice(0, 5).map((rfq, index) => (
                              <tr key={index + 1}>
                                  <td>{rfq.id}</td>
                                  <td>{rfq?.purposeOfRfq}</td>
                              </tr>
                          ))}
                      </tbody> */}
                        </table>
                        {/* </div> */}
                        <div className='row'>
                            <div className='col-12 text-end'>
                                <button className='btn' style={{ backgroundColor: 'white', color: "#FF8400", height: '15px', padding: '0' }} >View All</button>
                            </div>
                        </div>
                    </div>

                </div >

                {/* <div className='details1' id='grid4_mobile'> */}
                <div className='details12' id='grid4_mobile'>
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
                <div className='details13' id='grid4_mobile' >
                    <Chart
                        chartType="PieChart"
                        data={data12}
                        options={options1}
                        width={"0%"}
                        height={"0%"}
                    />
                </div>
            </div>




        </>
    )
}





export default Dashboard
