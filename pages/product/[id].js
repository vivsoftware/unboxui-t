import Head from 'next/head';
import React, { useEffect, useState } from 'react'
import { CommonPath } from '../../Components/Constant';
import BreadCrumb from '../../Components/Element/BreadCrumb';
import FlowerSubscribe from '../../Components/FlowerDemo/FlowerSubscribe';
import ProductSection from '../../Components/Products/Product4ImageContain/ProductSection';
import ProductLeftSidebarContain from '../../Components/Products/ProductLeftSidebarContain';
import Layout4 from '../../Layout/Layout4';
import Enquire from '../layout/Enquire';
import StartModel from '../../Layout/Element/StartModel';
import EnquireProductModal from '../../Components/Pages/UserDashboard/EnquireProductModal';
import { auth } from '../../Config/firebase';
import spring_boot_url from '../../Utils/springApi';
import { useRouter } from 'next/router';
import { fetchAPI } from '../../Utils/api';
import axios from 'axios';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ProductDetailsByID = (props) => {
  const [user, setUser] = useState(null);
  const [userDe, setuserDe] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const data = props.alltopic?.data;

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setUser(user);

      if (user && user.email) {
        try {
          const response = await axios.get(`${spring_boot_url}api/users/email?email=${user.email}`);
          console.log(response.data.json);
          setuserDe(response.data);
          startTimer(); // Start the timer
        } catch (error) {
          console.error(error);
        }
      } else if (user && user.phoneNumber) {
        let phoneNumberd = user.phoneNumber;
        phoneNumberd = phoneNumberd.replace(/\+/g, "");
        console.log("phonenumbereeeee", phoneNumberd);
        axios.get(`${spring_boot_url}api/users/phone?phoneNumber=${phoneNumberd}`)
          .then(resp => {
            console.log(resp.data.json);
            localStorage.setItem("data", JSON.stringify(resp.data));
            setuserDe(resp.data);
            startTimer(); // Start the timer

            if (resp.data) {
              
            }


          });
       

      }
    });
  }, []);


  return (
    <Layout4>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' type='image/x-icon' href={`${CommonPath}/favicon/2.png`} alt="unboxLogo" />
      </Head>
      <BreadCrumb parent={''} title={''} />
      <ProductLeftSidebarContain data= {data} />
      <ProductSection />
      <Enquire />
      <FlowerSubscribe />
    {userDe=== null? (
      <StartModel/>
    ):(
      <p></p>
    )}
      <EnquireProductModal />
    </Layout4>
  );
 
}
export async function getServerSideProps(context) {
  // Extract the id parameter from the context
  const { id } = context.query;

  // Fetch data from the API endpoint
  const data = await fetchAPI(`/products/${id}`, {
    populate: '*',
  });

  // Replace 'locale' with the appropriate locale variable
  const locale = 'en'; // Change this to your desired locale

  return {
    props: {
      alltopic: data,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
export default ProductDetailsByID