import React from 'react'
import Layout4 from '../Layout/Layout4';
import Head from 'next/head';
import Enquire from './layout/Enquire'
import FlowerSubscribe from '../Components/FlowerDemo/FlowerSubscribe'
import BreadCrumb from '../Components/Element/BreadCrumb';
const Copyright = () => {
    return (
        <>
            <Layout4>
                <Head>
                    <title>Copyright </title>
                    <meta name='viewport' content='width=device-width, initial-scale=1' />
                    <meta name="title" content="Copyright" />
                    <meta name="description" content="At Unbox Industry, we respect the intellectual property rights of others and expect our users to do the same." />
                    <link rel="icon" href="/Box.ico" alt="unboxLogo" />
                    <link rel="canonical" href="https://www.unboxindustry.com/copyright_" />
                </Head>
                <BreadCrumb parent={''} title={''} />
                <h1 className='text-center mt-1 mb-2' style={{fontSize:'30px'}}>Copyright</h1>
                <div className='container mt-2'>
                    <div className='row mt-2 mb-2' style={{ fontSize: '12px' }}>
                        <p style={{ fontSize: '16px', lineHeight: '1.7rem' }}>At <strong>Unbox Industry</strong>, we respect the intellectual property rights
                            of others and expect our users to do the same. This Copyright Policy outlines our procedures for handling claims of copyright
                            infringement on our website.<br /><br />Procedure for Reporting Copyright Infringement: If you believe that your work has been
                            copied and is accessible on our website in a way that constitutes copyright infringement, you may provide us with a written
                            notice of infringement. The notice must include the following information:
                        </p>
                        <ul style={{ listStyle: 'disc' }} className='ordered-list' >
                            <li><p style={{ fontSize: '16px', lineHeight: '1.7rem' }}>A description of the copyrighted work that you claim has been infringed.</p></li>
                            <li ><p style={{ fontSize: '16px', lineHeight: '1.7rem' }}>A description of where the material that you claim is infringing is located on our website.</p></li>
                            <li><p style={{ fontSize: '16px', lineHeight: '1.7rem' }}>Your contact information, including your address, telephone number, and email address.</p></li>
                            <li><p style={{ fontSize: '16px', lineHeight: '1.7rem' }}>A statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner,
                                its agent, or the law.
                            </p>
                            </li>
                            <li><p style={{ fontSize: '16px', lineHeight: '1.7rem' }}>A statement by you, made under penalty of perjury, that the information in your notice is accurate and that you are
                                the copyright owner or are authorized to act on the copyright owner’s behalf.
                            </p>
                            </li>
                        </ul>
                        <p style={{ fontSize: '16px', lineHeight: '1.7rem' }}>Please send your written notice of infringement to info@unboxindustry.com<br /><br />
                            Procedure for Counter-Notification: If we remove or disable access to material in response to a copyright infringement notice,
                            we will make a good faith effort to contact the owner of the affected material so that they may make a counter-notification.
                            If you believe that your material was removed or disabled as a result of mistake or misidentification, you may provide us with
                            a counter-notification that includes the following information:
                        </p>
                        <ol>
                            <li><p style={{ fontSize: '16px', lineHeight: '1.7rem' }}>A description of the material that was removed or to which access was
                                disabled and the location at which the material appeared before it was removed or disabled.
                            </p>
                            </li>
                            <li><p style={{ fontSize: '16px', lineHeight: '1.7rem' }}>Your contact information, including your address, telephone number,
                                and email address.
                            </p>
                            </li>
                            <li><p style={{ fontSize: '16px', lineHeight: '1.7rem' }}>A statement by you that you have a good faith belief that the material
                                was removed or disabled as a result of mistake or misidentification.
                            </p>
                            </li>
                            
                        </ol>
                        <p style={{ fontSize: '16px', lineHeight: '1.7rem' }}>Please send your written counter-notification to info@unboxindustry.com<br /><br />Repeat Infringer Policy: We take the
                            protection of intellectual property rights seriously and will take appropriate action against repeat infringers.<br /><br />
                            Disclaimer: We reserve the right to remove or disable access to material that we determine in our sole discretion to be
                            infringing, or to remove or disable access to user accounts of repeat infringers. Our procedures for handling claims of
                            copyright infringement are provided as a service to copyright owners and are not intended to impose a burden on legitimate
                            users of our website.<br /><br />
                            Contact Us: If you have any questions or concerns about our Copyright Policy, please contact us at 0124-414-8999
                        </p>
                    </div>
                </div>
                <Enquire />
                <FlowerSubscribe />
            </Layout4>
        </>
    )
}

export default Copyright
