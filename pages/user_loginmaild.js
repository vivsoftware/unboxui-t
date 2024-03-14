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
import axios from 'axios';
import spring_boot_url from '../Utils/springApi';
import { auth } from '../Config/firebase';
import SaveupdateAddressModal from '../Components/Pages/UserDashboard/UpdateAddress';
import { toast } from 'react-toastify';

export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ['common'])) } });

const UserDashboardd = () => {
  const [user, setUser] = useState(null);
  const [userDe, setUserDe] = useState(null);
  const router = useRouter();
  const [email, setemail] = useState(null);
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setUser(user)
      console.log("user", user)
      if (user.email) {
        axios.get(`${spring_boot_url}api/users/email?email=${user.email}`)
          .then(resp => {
            console.log(resp.data.json);
            localStorage.setItem("data", JSON.stringify(resp.data));
            setUserDe(resp.data);
            user_Login();
          });
      } else if (user.phoneNumber) {
        let phoneNumberd = user.phoneNumber
        phoneNumberd = phoneNumberd.replace(/\+/g, "");
        console.log("phonenumbereeeee", phoneNumberd);
        axios.get(`${spring_boot_url}api/users/phone?phoneNumber=${phoneNumberd}`)
          .then(resp => {
            console.log(resp.data.json);
            localStorage.setItem("data", JSON.stringify(resp.data));
            setUserDe(resp.data);
            user_Login();
          });
      }
    })
  }, [])

  const user_Login = () => {
    const student = {
      name: "User",
      phone: `${userDe.phoneNumber}`,
      email: `${userDe.email}`,
      message: `User is login at ${dateTime.toLocaleString()}`
    };

    fetch(`${spring_boot_url}contactUs/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    })
      .then((resp) => {
        if (resp.ok === true) {
          toast(`User login successfully`, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
          router.push("/user_dashboard");

        }
      });
  };

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

export default UserDashboardd;
