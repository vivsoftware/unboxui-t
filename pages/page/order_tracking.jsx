import Head from 'next/head';
import React from 'react';
import { CommonPath } from '../../Components/Constant';
import BreadCrumb from '../../Components/Element/BreadCrumb';
import FlowerSubscribe from '../../Components/FlowerDemo/FlowerSubscribe';
import OrderTracking from '../../Components/Pages/OrderTracking/OrderTracking';
import Layout4 from '../../Layout/Layout4';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ['common'])) } });

const Order_tracking = () => {
  return (
    <Layout4>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' type='image/x-icon' href={`${CommonPath}/favicon/2.png`} />
      </Head>
      <BreadCrumb parent={'Order Tracking'} title={'Order Tracking'} />
      <OrderTracking />
      <FlowerSubscribe />
    </Layout4>
  );
};

export default Order_tracking;
