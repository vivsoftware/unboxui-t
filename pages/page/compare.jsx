import React from 'react';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { CommonPath } from '../../Components/Constant';
import BreadCrumb from '../../Components/Element/BreadCrumb';
import FlowerSubscribe from '../../Components/FlowerDemo/FlowerSubscribe';
import CompareTable from '../../Components/Pages/Compare/CompareTable';
import Layout4 from '../../Layout/Layout4';


export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ['common'])) } });

const Compare = () => {
  return (
    <Layout4>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' type='image/x-icon' href={`${CommonPath}/favicon/2.png`} />
      </Head>
      <BreadCrumb parent={'Compare'} title={'Compare'} />
      <CompareTable />
      <FlowerSubscribe />
    </Layout4>
  );
};

export default Compare;
