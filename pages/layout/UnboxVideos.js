import YouTube from "react-youtube";
import React, { useState, useEffect } from 'react'
import Layout4 from '../../Layout/Layout4';
import Enquire from './Enquire';
import FlowerSubscribe from '../../Components/FlowerDemo/FlowerSubscribe';
import Head from 'next/head';
import Link from "next/link";
import { fetchAPI } from "../../Utils/api";

const UnboxVideos = (props) => {
    const getVideoIdFromLink = (link) => {
        if (typeof link !== 'string') {
            return null;
        }
        const regex = /(?:\/|%3D|v=|vi=)([0-9A-Za-z_-]{11})(?:[%#?&]|$)/;
        const match = link.match(regex);
        if (match) {
            return match[1];
        }
        return null;
    };
    const renderVideoThumbnail = (link) => {
        const videoId = getVideoIdFromLink(link);
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/default.jpg`;
        return (
            <div
                key={videoId}
            >
                <img src={thumbnailUrl} alt="video thumbnail" style={{ width: '100%' }} />
            </div>
        );

    };

    return (
        <Layout4 className="home-page">
            <Head>
                <title>Unbox Industry</title>
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel="icon" href="/Box.ico" alt="unboxLogo"/>
            </Head>
            <div className='container'>
                <div className='row'>
                <h3 className="text-center">Upcoming</h3>
                    {/* <div className='col-md-3'>

                    </div>
                    <div className='col-md-9'>
                        <div className='row mb-3'>
                            {props.alltopic.data.map((el) => {
                                return (
                                    <div className='col-md-4 mt-3'>
                                        <div className='card video-card' key={el.id}>
                                            <Link href={`/unboxvideo/${el.id}`}>
                                                <div className="col-4 mb-2 video-size" key={el.id}>
                                                    {renderVideoThumbnail(el.attributes.Video)}
                                                </div>
                                                {/* <video>{el.attributes.Video}</video> 
                                                {/* <Link href="/unboxVideo1"><video url={el.attributes.Video} 
                                                {/* autoPlay='true'
                                                width={300}
                                                height={250} 
                                                {/* ></video></Link> 
                                                {/* <h5 className='ms-2' style={{ color: '#FF8400' }}>{video.title}</h5> 
                                            </Link>
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



export async function getServerSideProps() {
    const data = await fetchAPI(`/unbox-videos`, {
        populate: '*',
    },)

    let alltopic = await data

    return {
        props: { alltopic: alltopic },

    } // will be passed to the page component as props

}





export default UnboxVideos
