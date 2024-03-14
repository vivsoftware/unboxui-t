import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { CommonPath } from '../Components/Constant';
import BreadCrumb from '../Components/Element/BreadCrumb';
import DashboardSidebar from '../Components/Pages/UserDashboard/DashboardSidebar';
import Layout4 from '../Layout/Layout4';
import PaymentCardModal from '../Components/Pages/UserDashboard/PaymentCardModal';
import ProfileModal from '../Components/Pages/UserDashboard/ProfileModal';
import SaveAddressModal from '../Components/Pages/UserDashboard/SaveAddressModal';
import { useRouter } from 'next/router';
import SaveupdateAddressModal from '../Components/Pages/UserDashboard/UpdateAddress';

export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ['common'])) } });

const UserDashboard = () => {

  const [user, setUser] = useState(null);
  const [userDe, setUserDe] = useState(null);
  const router = useRouter();

  return (
    <Layout4>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' type='image/x-icon' href={`${CommonPath}/favicon/2.png`} alt="unboxLogo"/>
      </Head>
      <BreadCrumb parent={'User Dashboard'} title={'User Dashboard'} />
      <DashboardSidebar user={user} />
      <PaymentCardModal />
      <SaveAddressModal />
      <SaveupdateAddressModal />
      <ProfileModal />
    </Layout4>
  );
};

export default UserDashboard;
