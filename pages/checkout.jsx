import Head from 'next/head';
import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState, useEffect } from 'react';
import { CommonPath } from '../Components/Constant';
import BreadCrumb from '../Components/Element/BreadCrumb';
import Layout4 from '../Layout/Layout4';
import FlowerSubscribe from '../Components/FlowerDemo/FlowerSubscribe/index';
import SectionCheckout from '../Components/Pages/Checkout';
import Logins from './login';
import { auth } from '../Config/firebase';
export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ['common'])) } });

const Checkout = () => {
  const [currentUser, setCurrentUser] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(currentUser);
    })
  }, []);
  return (
    <>
      {currentUser !== null ? (
        <Layout4>
          <Head>
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <link rel='icon' type='image/x-icon' href={`${CommonPath}/favicon/2.png`}alt="unboxLogo" />
            <link rel="canonical" href="https://www.unboxindustry.com/checkout" />
          </Head>
          <BreadCrumb parent={''} title={''} />
          <h1 className='text-center mt-1 mb-2' style={{fontSize:'30px'}}>Checkout</h1>
          <SectionCheckout />
          <FlowerSubscribe />
        </Layout4>
      ) : (

        <Logins />

      )}

    </>

  );

};


export default Checkout;
