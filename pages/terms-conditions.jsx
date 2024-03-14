import React from 'react'
import Layout4 from '../Layout/Layout4';
import Head from 'next/head';
import Enquire from './layout/Enquire'
import FlowerSubscribe from '../Components/FlowerDemo/FlowerSubscribe'
import BreadCrumb from '../Components/Element/BreadCrumb';
const TermsConditions = () => {
    return (
        <>
            <Layout4>
                <Head>
                    <title>Unbox Industry-Copyright</title>
                    <meta name='viewport' content='width=device-width, initial-scale=1' />
                    <meta name="title" content="Terms & Conditions" />
                    <meta property="description" content="The website reserves the right to modify the terms and conditions at any time without prior notice." />
                    <link rel="icon" href="/Box.ico" alt="unboxLogo" />
                    <link rel="canonical" href="https://www.unboxindustry.com/terms-conditions" />
                </Head>
                <BreadCrumb parent={''} title={''} />
                <h1 className='text-center mt-1 mb-2' style={{ fontSize: '30px' }}>Terms & Conditions</h1>
                <div className='container mt-2 '>
                    <div className='row mt-2 mb-2'>
                        <p style={{ fontSize: '16px', lineHeight: '1.7rem' }}><strong>Acceptance of Terms:</strong> The use of this website constitutes
                            acceptance of these terms and conditions.
                        </p>
                        <p style={{ fontSize: '16px', lineHeight: '1.7rem' }}><strong>Modifications of Terms:</strong> The website reserves the right to
                            modify the terms and conditions at any time without prior notice.
                        </p>
                        <p style={{ fontSize: '16px', lineHeight: '1.7rem' }}><strong>Use of Website:</strong> The website provides information and
                            services for business customers and is not intended for personal or consumer use.
                        </p>
                        <p style={{ fontSize: '16px', lineHeight: '1.7rem' }}><strong>User Conduct:</strong> Users agree not to use the website for any
                            illegal or inappropriate purposes and to comply with all applicable laws and regulations
                        </p>
                        <p style={{ fontSize: '16px', lineHeight: '1.7rem' }}><strong>Intellectual Property: </strong>All content on the website,
                            including but not limited to text, graphics, logos, and software, is the property of the website or its licensors and is
                            protected by copyright and other intellectual property laws.Disclaimer of Warranties: The website provides the information and
                            services “as is” without any representations or warranties of any kind, either express or implied, including but not limited to,
                            warranties of merchantability, fitness for a particular purpose, or non-infringement.
                        </p>
                        <p style={{ fontSize: '16px', lineHeight: '1.7rem' }}><strong>Limitation of Liability: </strong>The website shall not be liable
                            for any damages or losses arising from the use of the website or the information or services provided, whether such damages are
                            direct, indirect, incidental, special, or consequential.
                        </p>
                        <p style={{ fontSize: '16px', lineHeight: '1.7rem' }}><strong>Indemnification: </strong>Users agree to indemnify and hold the
                            website harmless from any claims or expenses arising from their use of the website or violation of these terms and conditions.
                        </p>
                        <p style={{ fontSize: '16px', lineHeight: '1.7rem' }}><strong>Governing Law: </strong> These terms and conditions shall be
                            governed by and construed in accordance with the laws of the jurisdiction in which the website is based.
                        </p>
                        <p style={{ fontSize: '16px', lineHeight: '1.7rem' }}><strong>Dispute Resolution: </strong> Any disputes arising out of or
                            related to these terms and conditions shall be resolved through binding arbitration.
                        </p>
                        <p style={{ fontSize: '16px', lineHeight: '1.7rem' }}>These terms and conditions should be reviewed and tailored by a legal professional to meet the specific needs and
                            requirements of the website and its business.</p>
                    </div>
                </div>
                <Enquire />
                <FlowerSubscribe />
            </Layout4>
        </>
    )
}

export default TermsConditions
