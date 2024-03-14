import Head from 'next/head';
import React from 'react';
import { CommonPath } from '../../Components/Constant';
import BreadCrumb from '../../Components/Element/BreadCrumb';
import FlowerSubscribe from '../../Components/FlowerDemo/FlowerSubscribe';
import SectionSvg from '../../Components/Pages/404/SectionSvg';
import Layout4 from '../../Layout/Layout4';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ['common'])) } });

const Error = () => {
    return (
        <div>
            <Head>
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' type='image/x-icon' href={`${CommonPath}/favicon/2.png`} />
            </Head>
            <BreadCrumb parent={'404'} title={'Mail send!'} />

           <h1>mail send on your register email please click on link given on mail to login </h1>

            <FlowerSubscribe />


            </div>
    );
};

export default Error;
