import React, { useEffect } from 'react';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useDispatch, useSelector } from 'react-redux';
import BlogDetails from '../../Components/Blog/BlogDetails';
import { CommonPath } from '../../Components/Constant';
import BreadCrumb from '../../Components/Element/BreadCrumb';
import FlowerSubscribe from '../../Components/FlowerDemo/FlowerSubscribe';
import Layout4 from '../../Layout/Layout4';
import RelatedBlog from '../../Components/Blog/BlogDetails/RelatedBlog';
// import { getAllUsers } from '../../Service/FetchApi';

export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ['common'])) } });

const Blog_details = () => {
  const dispatch = useDispatch();
  const types = 'GETBLOGDATA';
  const { Blogdatanew } = useSelector((state) => state.BlogReducer);
  // useEffect(() => {
  //   !Blogdatanew && dispatch(getAllUsers('blog', types));
  // }, []);
  return (
    <Layout4>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' type='image/x-icon' href={`${CommonPath}/favicon/2.png`} alt="unboxLogo" />
      </Head>
      {/* <BreadCrumb parent={'Blog Details'} title={'Blog Details'} />
      <BlogDetails />
      <RelatedBlog />
      <FlowerSubscribe /> */}
    </Layout4>
  );
};

export default Blog_details;
