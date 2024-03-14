import React from 'react'
import Layout4 from '../../Layout/Layout4';
import { caseStudies } from '../../Data/caseStudies';
import Enquire from './Enquire';
import FlowerSubscribe from '../../Components/FlowerDemo/FlowerSubscribe';
import Head from 'next/head';
import Link from 'next/link';
const CaseStudies = () => {
  return (
    <Layout4 className="home-page">
    <Head>
        <title>Unbox Industry</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel="icon" href="/Box.ico" />
    </Head>
    <div className='container'>
        <div className='row'>
            <h3 className='text-center'>Upcoming</h3>
            {/* <div className='col-md-3'>

            </div>
            <div className='col-md-9'>
                <div className='row mb-3'>
                    {caseStudies.map(video => {
                        return (
                            <div className='col-md-4 mt-3'>

                                <div className='card video-card' key={video.id}>
                                    <Link href={video.link}><video src=''
                                        autoPlay='true'
                                        width={300}
                                        height={250}
                                    ></video></Link>
                                    <h5 className='ms-2' style={{ color: '#FF8400' }}>{video.title}</h5>
                                </div>

                            </div>
                        )
                    })}
                </div>
            </div> */}
        </div>
    </div>
    <Enquire />
    <FlowerSubscribe />
</Layout4>
  )
}

export default CaseStudies
