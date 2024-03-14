import React from 'react'
import Layout4 from '../Layout/Layout4'
import Enquire from './layout/Enquire'
import FlowerSubscribe from '../Components/FlowerDemo/FlowerSubscribe'
import Head from 'next/head';
import BreadCrumb from '../Components/Element/BreadCrumb';
const PrivacyPolicy = () => {
    return (
        <>
            <Layout4>
                <Head>
                    <title>Unbox Industry-Privacy Policy</title>
                    <meta name='viewport' content='width=device-width, initial-scale=1' />
                    <meta name="title" content="Privacy Policy" />
                    <meta property="description" content="Our privacy policy outlines how we collect, use, and safeguard personal information provided to us by our clients." />
                    <link rel="icon" href="/Box.ico" alt="unboxLogo" />
                    <link rel="canonical" href="https://www.unboxindustry.com/privacy-policy" />
                </Head>
                <BreadCrumb parent={''} title={''} />
                <h1 className='text-center mt-1 mb-2' style={{ fontSize: '30px' }}>Privacy Policy</h1>
                <div className='container mt-2'>
                    <div className='row mt-2 mb-2'>
                        <p style={{ fontSize: '16px', lineHeight: '1.7rem' }}>At <strong>Unbox Industry</strong>, we take the privacy and protection of our client’s personal and business information very seriously.
                            Our privacy policy outlines how we collect, use, and safeguard personal information provided to us by our clients, including
                            business-to-business (B2B) customers.
                        </p>
                        <h5 className='fw-bold' style={{ fontSize: '20px' }}>Collection of Personal Information</h5>
                        <p style={{ fontSize: '16px', lineHeight: '1.7rem' }}>We collect personal information from our clients when they create an account, make a purchase, or interact with our website in
                            other ways. This information may include names, addresses, phone numbers, email addresses, and other contact information.
                        </p>
                        <h5 className='fw-bold' style={{ fontSize: '20px' }}>Use of Personal Information</h5>
                        <p style={{ fontSize: '16px', lineHeight: '1.7rem' }}>The personal information we collect from our clients is used for several purposes, including fulfilling orders, providing
                            customer support, and communicating with clients about our products and services. We may also use this information for
                            marketing purposes, such as sending newsletters or promotional offers.
                        </p>
                        <h5 className='fw-bold' style={{ fontSize: '20px' }}>Protection of Personal Information</h5>
                        <p style={{ fontSize: '16px', lineHeight: '1.7rem' }}>We use a variety of security measures to protect the personal information of our clients, including secure servers, firewalls,
                            and encryption. We also have policies in place to prevent unauthorized access to client information.
                        </p>
                        <h5 className='fw-bold' style={{ fontSize: '20px' }}>Sharing of Personal Information</h5>
                        <p style={{ fontSize: '16px', lineHeight: '1.7rem' }}>We do not share personal information with third parties, except in the following circumstances:</p>
                        <ul className="bullet-list">
                            <li>
                                <p style={{ fontSize: '16px', lineHeight: '1.7rem' }}>When necessary to fulfill an order or provide customer support</p>
                            </li>

                        </ul>
                        <h5 className='fw-bold' style={{ fontSize: '20px' }}>Security</h5>
                        <p style={{ fontSize: '16px', lineHeight: '1.7rem' }}>We take the security of your personal information seriously and have implemented appropriate measures to protect it from
                            unauthorized access, use, disclosure, or destruction. However, please be aware that no security measures are foolproof,
                            and there is always a risk of unauthorized access or use of your information.
                        </p>
                        <h5 className='fw-bold' style={{ fontSize: '20px' }}>Cookies</h5>
                        <p style={{ fontSize: '16px', lineHeight: '1.7rem' }}>We may use cookies to store information about your preferences and to personalize our website and services for you.
                            You can choose to disable cookies through your browser settings, but please note that this may limit your ability to
                            use certain features of our website. Changes to this Privacy Policy. We reserve the right to update this privacy policy
                            from time to time, and we will post any changes on our website. We encourage you to periodically review this policy for any
                            updates.
                        </p>
                        <h5 className='fw-bold' style={{ fontSize: '20px' }}>Contact Us</h5>
                        <p style={{ fontSize: '16px', lineHeight: '1.7rem' }}>If you have any questions about this privacy policy, please contact us at: +0124 414 8999.<br />Effective Date: 02/02/23.</p>
                    </div>
                </div>
                <Enquire />
                <FlowerSubscribe />
            </Layout4>
        </>
    )
}

export default PrivacyPolicy
