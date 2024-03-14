import React, {useState} from 'react'
import YouTube from "react-youtube";
import FlowerSubscribe from '../../Components/FlowerDemo/FlowerSubscribe';
import Layout4 from '../../Layout/Layout4'
import Enquire from '../layout/Enquire';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { fetchAPI } from '../../Utils/api';

const unboxVideo = (props) => { 
  const router = useRouter()
  const id = router.query.unboxVideo1;
  const idd = id - 1;

  const unvideos = props.alltopic.data[idd].attributes.Video;
  const renderVideo = () => {
      const videoOpts = {
        height: '390',
        width: '640',
        playerVars: {
          showRelatedVideos: 0,
          rel: 0,
        },
      };  
      return  <YouTube videoId = 'EZ9w2epmvS0' opts={videoOpts}  onReady={() => console.log('Video is ready')} />;
  };


  return (
    <Layout4>
         <Head>
        <title>Unbox Industry</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel="icon" href="/Box.ico" />
      </Head>
        <div className='container mt-2'>
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
            <div className="video-wrapper">{renderVideo()}</div>
          </div>
        </div>
        <Enquire/>
        <FlowerSubscribe/>
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





export default unboxVideo
