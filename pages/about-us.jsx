import Head from 'next/head'
import React from 'react'
import { BsCheckLg } from 'react-icons/bs'
import { FaLinkedin } from "react-icons/fa"
import { Col, Row } from 'reactstrap'
import BreadCrumb from '../Components/Element/BreadCrumb'
import Img from '../Components/Element/Images'
import Brand from '../Components/FlowerDemo/BrandSlider'
import FlowerSubscribe from '../Components/FlowerDemo/FlowerSubscribe'
import { AboutService } from '../Data/AboutService'
import Layout4 from '../Layout/Layout4'
import Enquire from './layout/Enquire'

const About = () => {
  return (
    <div>
      <Layout4>
        <Head>
          <title>About Us - Unbox Industry</title>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta name='description' content='We connect millions of buyers and sellers around the world, empowering people & creating economic opportunity for all.' />
          <meta name='keywords' content='solution provider, Marketing Platform' />
          <link rel="canonical" href="https://www.unboxindustry.com/about-us" />
          <link rel="icon" href="/Box.ico" alt="unboxLogo" />
        </Head>
        <BreadCrumb parent={''} title={''} />
        <div className='container about-us mt-2'>
          <h1 className='text-center mt-1 mb-2' style={{ fontSize: '30px' }}>About Us</h1>
          <Img src="/Team.jpg" className="wholeteam" alt="UnboxTeam"></Img>
          <h2 className=''>Welcome to Unbox Industry</h2>
          <h4 className=''>We connect millions of buyers and sellers around the world, empowering people & creating economic opportunity for all.</h4>
          <p className=''>Unbox Industry is a one stop web platform for all Industrial Automation needs. From gaining the knowledge to finding the product required and to select the right solution provider, unbox Industry provides everything on a single platform. Unbox Industry is the world’s first platform that focuses on all the challenges faced by the industry while adopting an automation solution.</p>
        </div>
        <div className='container about-services'>
          <h3>Unbox Industry provides following services through its platform</h3>
          <Row className='g-4 g-sm-3 ms-3'>
            {AboutService.map((elem) => {
              return (
                <Col xl='4' sm='6' key={elem.id}>
                  <div className='service-wraps mt-4'>
                    <div className='card about-service'>
                      <div className='about-icon mt-2 mb-2'>{elem.icon}</div>
                      <div className='about-service'>
                        <h3 className='mb-2'>{elem.title}</h3>
                        <span className='font-light'>{elem.subtitle}</span>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
          <Row>
            <h4 className='mt-5'>Why Unbox Industry Marketplace</h4>
            <Col lg-6 sm-6 className='mt-3'>
              <p><BsCheckLg className='me-2 about_Icon'></BsCheckLg>Huge access of National & International brands</p>
              <p><BsCheckLg className='me-2 about_Icon'></BsCheckLg>Expert Industry Consultation for free</p>
              <p><BsCheckLg className='me-2 about_Icon'></BsCheckLg>Get your material at your door step anywhere in the India</p>
            </Col>
            <Col lg-6 sm-6 className='mt-3'>
              <p><BsCheckLg className='me-2 about_Icon'></BsCheckLg>Find Capable and Certified Solution Providers</p>
              <p><BsCheckLg className='me-2 about_Icon'></BsCheckLg>To implement the affordable automation</p>
              <p><BsCheckLg className='me-2 about_Icon'></BsCheckLg>To get the knowledge and latest news of Automation Industries</p>
            </Col>
          </Row>
        </div>
        <div className=' container team-container' >
          <h3 style={{ fontSize: '30px' }}>Our Team</h3>
          <div className='row mt-5' >
            <div className='col-md-3 col-sm-6'>
              <div className='team'>
                <Img src="/Aman-Sir.jpg" className="team-image" alt="Aman"></Img>
                <h3>Aman Jain</h3>
                <span>Founder & Director</span>
                <p style={{ textAlign: "center" }}>(CEO) <a href="https://www.linkedin.com/in/aman-jain-40385061?" className='linkedIn' target='blank'><FaLinkedin /></a>

                </p>
                <br />
              </div>

            </div>


            <div className='col-md-3 col-sm-6'>
              <div className='team'>

                <Img src="/maam.jpeg" className="team-image" alt="Onisha" />
                <h3>Onisha Jain</h3>
                <span>Co-Founder & Director</span>
                <p style={{ textAlign: "center" }}>(COO)<a href="https://www.linkedin.com/in/onisha-gupta-76261a149/" className='linkedIn' target='_blank'><FaLinkedin /></a>
                </p>

                <br />
              </div>
            </div>
            <div className='col-md-3 col-sm-6'>
              <div className='team'>
                <Img src="/Pawan.jpg" className="team-image" alt="Pawan"></Img>
                <h3>Pawan Singh</h3>
                <span>Supplier Onboarding & Finacnce </span>
                <p style={{ textAlign: "center" }}>(CFO)<a href='https://www.linkedin.com/in/pawan-singh-404b71177?' className='linkedIn' target='blank'><FaLinkedin /></a> </p>
                <br />
              </div>
            </div>
            <div className='col-md-3 col-sm-6'>
              <div className='team'>
                <Img src="/Gopal-420.png" className="team-image" alt="Gopal"></Img>
                <h3>Gopal Kumar</h3>
                <span> Software Developer & service</span>
                <p style={{ textAlign: "center" }}>(CTO) <a href='https://www.linkedin.com/in/gopal-kumar-379b4a112?' target='blank' className='linkedIn'><FaLinkedin /></a>
                </p>
                <br />
              </div>
            </div>
          </div>
          <div className='row mt-3 mb-3'>
            <div className='col-md-3 col-sm-6'>
              <div className='team'>

                <Img src="/Anurag.jpg" className="team-image" alt="Anurag"></Img>
                <h3>Anurag Tiwari</h3>
                <span>Inside Sales Executive</span>
                <a href='https://www.linkedin.com/in/anurag-tiwari-396793191' target='blank' className='linkedIn'><FaLinkedin /></a>

                <br />
              </div>
            </div>
            <div className='col-md-3 col-sm-6'>
              <div className='team'>

                <Img src="/Shivangni.jpeg" className="team-image" alt="Shivangni"></Img>
                <h3>Shivangni Shukla</h3>
                <span>Digital Marketer</span> 
                <a href='https://www.linkedin.com/in/shivangni-shukla-5ab556237/' target='blank' className='linkedIn'><FaLinkedin /></a>

                <br />
              </div>
            </div>
            <div className='col-md-3 col-sm-6'>
              <div className='team'>
                <Img src="/You2.png" className="team-image" alt="Person"></Img>
                <h3>Could Be You</h3>
                <span>to start your career with us <a>Click Here</a></span>
                <br />
              </div>
            </div>
          </div>
          <div className='row mt-3 mb-3'>

          </div>
        </div>
        <Brand />
        <Enquire />
        <FlowerSubscribe />
      </Layout4>
    </div>
  )
}

export default About
