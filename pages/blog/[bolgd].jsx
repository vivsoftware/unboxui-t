import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { CommonPath } from '../../Components/Constant';
import BreadCrumb from '../../Components/Element/BreadCrumb';
import Img from '../../Components/Element/Images';
import SkeletonLoader from '../../Components/Element/SkeletonLoader';
import FlowerSubscribe from '../../Components/FlowerDemo/FlowerSubscribe';
import Layout4 from '../../Layout/Layout4';
import { fetchAPI } from '../../Utils/api';
import { getStrapiMedia } from '../../Utils/media';
import Enquire from '../layout/Enquire';

const Blogd = (props) => {
  const router = useRouter();
  const id = parseInt(router.query.bolgd);
  const data = props.alltopic.data.find((item) => item.id === id);

  if (!data) {
    return <SkeletonLoader />;
  }

  const {
    banner_image,
    additional_image,
    description,
    additional_description,
    title,
    date,
  } = data.attributes;

  const { metaTitle, metaDescription, metaImage, keywords, canonicalURL } = data.attributes.SEO || {};
  console.log("additional_image", data)
  return (
    <Layout4>
      <Head>
      <title>{title}</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' type='image/x-icon' href={`${CommonPath}/favicon/2.png`} alt="unboxLogo" />
        
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
      <div className='container'>
      <h1 className='text-center mt-1 mb-2' style={{fontSize:'30px'}}>Blog</h1>
        <section className='masonary-blog-section'>
          <div className='blog-image-box'>
            <Img src={getStrapiMedia(banner_image)} className='card-img-top mt-2' alt={title} />
            <span className='blog-para mt-3' dangerouslySetInnerHTML={{ __html: `${description}` }}></span>
            {additional_image.data === null ? (
              <p></p>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Img src={getStrapiMedia(additional_image)} alt={title} />
              </div>

            )}
            {additional_description === null ? (
              <p></p>
            ) : (
              <span className='blog-para mt-3' style={{ lineHeight: '23px' }} dangerouslySetInnerHTML={{ __html: `${additional_description}` }}></span>
            )}

          </div>
          {/* <CommentDetails /> */}
          <Enquire />
        </section>
      </div>
      <FlowerSubscribe />
    </Layout4>
  );
};

export async function getServerSideProps() {

  const data = await fetchAPI(`/blogs`, {
    populate: '*',
  });
  let alltopic = await data;
  return {
    props: { alltopic: alltopic },
  };
}

export default Blogd;
