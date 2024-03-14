import Head from 'next/head';
import React from 'react';
import { CommonPath } from '../../Components/Constant';
import FlowerSubscribe from '../../Components/FlowerDemo/FlowerSubscribe';
import OrderDetails from '../../Components/Pages/OrderSuccess/OrderDetails';
import TopSection from '../../Components/Pages/OrderSuccess/TopSection';
// import Layout1 from '../../Layout/Layout1';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout4 from '../../Layout/Layout4';
export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ['common'])) } });

const Order_success = () => {
  return (
    <Layout4>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' type='image/x-icon' href={`${CommonPath}/favicon/2.png`} />
      </Head>
      <TopSection />
      <OrderDetails />
      <FlowerSubscribe />
    </Layout4>
  );
};

export default Order_success;
