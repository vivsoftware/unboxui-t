import React, { useState, useEffect } from 'react'
import Head from 'next/head';
import { BsCheckLg } from "react-icons/bs";
import Layout4 from '../../Layout/Layout4';
import BreadCrumb from '../../Components/Element/BreadCrumb';
import Img from '../../Components/Element/Images';
import { height } from '@mui/system';
import { useRouter } from 'next/router';
import FlowerSubscribe from '../../Components/FlowerDemo/FlowerSubscribe';
import { fetchAPI } from '../../Utils/api';
import { getStrapiMedia } from '../../Utils/media';
import Enquire from '../layout/Enquire';
import SkeletonLoader from '../../Components/Element/SkeletonLoader';

const Automotivies_and_Subcontractors = (props) => {
    const router = useRouter();
    const id = parseInt(router.query.industries);
    const data = props.alltopic.data.find((item) => item.id === id);

    if (!data) {
        return <SkeletonLoader />;
    }

    const {
        Images,
        Description,
        SubTitle,
        Title,
        SubTitle1,
        SubTitle2,
        SubTitle3,
        SubTitle1_Description,
        SubTitle2_Description,
        SubTitle3_Description,
        ApplicationsTitle,
        Application_Name,
        Application_Name2,
        Application_Name3,
        Application_Name4,
        Application_Image,
        Application_Image2,
        Application_Image3,
        Application_Image4,
    } = data.attributes;
    
    const { metaTitle, metaDescription, metaImage, keywords, canonicalURL } = data.attributes.SEO || {};
    return (
        <div>
            <Layout4>
                <Head>
                    <title>{Title}</title>
                    <meta name='viewport' content='width=device-width, initial-scale=1' />
                    <link rel="icon" href="/Box.ico" alt="unboxLogo" />
                    {metaTitle && (
          <>
            <meta name="description" content={metaDescription || ''} />
            <meta property="title" content={metaTitle || ''} />
            <meta property="keywords" content={keywords || ''} />
            <meta property="image" content={metaImage || ''} />
            <meta property="canonicalURL" content={canonicalURL || ''} />
          </>
        )}
                </Head>
                <BreadCrumb parent={''} title={''} />
                <div className='container mt-3'>
                    <h1 className='headingstyle mb-3'>{Title}</h1>
                    <div className='row'>
                        <div className='col-md-8 col-sm-6'>
                            <p dangerouslySetInnerHTML={{ __html: Description }} />
                        </div>
                        <div className='col-md-4 col-sm-6'>
                            <Img src={getStrapiMedia(Images)} className='card-img-top' alt={Title} />
                        </div>
                    </div>
                    <div className='row'>
                        <h2 className='text-center mt-3 mb-4' style={{ color: '#FF8400', fontSize: '30px', fontWeight: 'normal' }}>{SubTitle}</h2>
                        <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12'>
                            <div className='industrial_advantage_card'>
                                <h3>{SubTitle1}</h3>
                                <div className='row mt-3'>
                                    <div className='col-2'><BsCheckLg className='tick-icon' /></div>
                                    <div className='col-10'><p>{SubTitle1_Description}</p></div>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12'>
                            <div className='industrial_advantage_card'>
                                <h3>{SubTitle2}</h3>
                                <div className='row mt-3'>
                                    <div className='col-2'><BsCheckLg className='tick-icon' /></div>
                                    <div className='col-10'><p>{SubTitle2_Description}</p></div>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12'>
                            <div className='industrial_advantage_card'>
                                <h3>{SubTitle3}</h3>
                                <div className='row mt-3'>
                                    <div className='col-2'><BsCheckLg className='tick-icon' /></div>
                                    <div className='col-10'><p>{SubTitle3_Description}
                                    </p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='application-container mb-3'>
                        <div className='row'>
                            <h2 style={{ fontSize: '30px', fontWeight: 'normal' }}>{ApplicationsTitle}</h2>
                            <div className='col-xl-3 col-md-4 col-sm-12'>
                                <div className=' card application-card' style={{ display: 'flex', alignItems: 'center' }}>
                                    <Img src={getStrapiMedia(Application_Image)} style={{ width: '250px', height: '250px' }} className='card-img-top' alt={Application_Name} />
                                    <p className='mt-4 mb-2 '>{Application_Name}</p>
                                </div>
                            </div>
                            <div className='col-xl-3 col-md-4 col-sm-12'>
                                <div className=' card application-card' style={{ display: 'flex', alignItems: 'center' }}>
                                    <Img src={getStrapiMedia(Application_Image2)} style={{ width: '250px', height: '250px' }} className='card-img-top' alt={Application_Name2} />
                                    <p className='mt-4 mb-2'>{Application_Name2}</p>
                                </div>
                            </div>
                            <div className='col-xl-3 col-md-4 col-sm-12'>
                                <div className=' card application-card' style={{ display: 'flex', alignItems: 'center' }}>
                                    <Img src={getStrapiMedia(Application_Image3)} style={{ width: '250px', height: '250px' }} className='card-img-top' alt={Application_Name3} />
                                    <p className='mt-4 mb-2'>{Application_Name3}</p>
                                </div>
                            </div>
                            <div className='col-xl-3 col-md-4 col-sm-12'>
                                <div className=' card application-card' style={{ display: 'flex', alignItems: 'center' }}>
                                    <Img src={getStrapiMedia(Application_Image4)} style={{ width: '250px', height: '250px' }} className='card-img-top' alt={Application_Name4} />
                                    <p className='mt-4 mb-2'>{Application_Name4}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Enquire />
                <FlowerSubscribe />
            </Layout4>
        </div>
    )
};

export async function getServerSideProps() {
    const data = await fetchAPI(`/industrial-solutions`, {
        populate: '*',
    },)

    let alltopic = await data

    return {
        props: { alltopic: alltopic },

    } // will be passed to the page component as props

}

export default Automotivies_and_Subcontractors;
