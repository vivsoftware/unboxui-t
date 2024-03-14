import Head from 'next/head';
import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { CommonPath } from '../Components/Constant';
import BreadCrumb from '../Components/Element/BreadCrumb';
import FlowerSubscribe from '../Components/FlowerDemo/FlowerSubscribe';
import WishlistProducts from '../Components/Pages/WishList/WishlistProducts';
import Layout4 from '../Layout/Layout4';
import Enquire from './layout/Enquire';

export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ['common'])) } });

const Wishlist = () => {
  return (
    <Layout4>
      <Head>
        <title>Wishlist - Unbox Industry</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' type='image/x-icon' href={`${CommonPath}/favicon/2.png`} alt="unboxLogo" />
        <link rel="canonical" href="https://www.unboxindustry.com/wishlist" />
      </Head>
      <BreadCrumb parent={''} title={''} />
      <h1 className='text-center mt-1 mb-2' style={{fontSize:'30px'}}>Wishlist</h1>
      <WishlistProducts />
      <Enquire />
      <FlowerSubscribe />
    </Layout4>
  );
};

export default Wishlist;
