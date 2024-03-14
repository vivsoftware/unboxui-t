import Head from 'next/head';
import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { CommonPath } from '../Components/Constant';
import BreadCrumb from '../Components/Element/BreadCrumb';
import ProductCart from '../Components/Pages/Cart';
import Layout4 from '../Layout/Layout4';
import FlowerSubscribe from '../Components/FlowerDemo/FlowerSubscribe/index';
import Enquire from './layout/Enquire';


export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ['common'])) } });

const Cart = () => {
  return (
    <Layout4>
      <Head>
        <title>Cart - Unbox Industry</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name="title" content="Cart" />
        <meta name="description" content="If you are looking for a credit we will be happy to help you." />
        <link rel='icon' type='image/x-icon' href={`${CommonPath}/favicon/2.png`}alt="unboxLogo" />
        <link rel="canonical" href="https://www.unboxindustry.com/cart" />
      </Head>
      <BreadCrumb parent={''} title={''} />
      <h1 className='text-center mt-1 mb-2' style={{fontSize:'30px'}}>Cart</h1>
      <ProductCart />
      <Enquire/>
      <FlowerSubscribe />
    </Layout4>
  );
};

export default Cart;
