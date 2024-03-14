"use client"
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout4 from '../Layout/Layout4';
import React, { useEffect, useState, useMemo } from 'react';
import { fetchAPI } from '../Utils/api';
import FlowerSubscribe from '../Components/FlowerDemo/FlowerSubscribe';
import Enquire from './layout/Enquire';
import { useRouter } from 'next/router';
import Image from 'next/image';
import StartModel from '../Layout/Element/StartModel';
import { auth } from '../Config/firebase';
import spring_boot_url from '../Utils/springApi';
import axios from 'axios';
import Slider from 'react-slick';
import SkeletonLoader from '../Components/Element/SkeletonLoader';
import { getStrapiMedia } from '../Utils/media';
import ElectronicCollection from '../Components/ElectronicDemo/ElectronicCollection';
import ElectronicInstagramShop from '../Components/ElectronicDemo/ElectronicInstagramShop';
import ElectronicHurryUp from '../Components/ElectronicDemo/ElectronicHurryUp';
import FashionService from "../Components/FashionDemo/FashionService";
import Categories from '../Components/ElectronicDemo/Categories';
import ElectronicHomeSlider from '../Components/ElectronicDemo/ElectronicHomeSlider';
import ElectronicTopBanner from '../Components/ElectronicDemo/ElectronicTopBanner';
import CategorizedProducts from '../Components/ElectronicDemo/Category/categorizedProducts';
import Brand from '../Components/FlowerDemo/BrandSlider';
import Customers from '../Components/ElectronicDemo/Customers';
import cameraCategory from '../Components/ElectronicDemo/Category/camera';

const cache = {};

export const getServerSideProps = async ({ locale }, props) => {
  // Check if the data is already cached
  const cachedData = cache['homepage_data'];
  if (cachedData) {
    return {
      props: {
        data: cachedData,
        ...(await serverSideTranslations(locale, ['common'])),
      },
    };
  }
  // Fetch data from Strapi
  const data = await fetchAPI('/homepage', {
    populate: '*',
  });
  // Cache the fetched data
  cache['homepage_data'] = data;
  return {
    props: {
      data,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

function Home(props) {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [productData, setProductData] = useState(null);
  const [category, setCategory] = useState(null);
  const [user, setUser] = useState(null);
  const [userDe, setuserDe] = useState(null);
  const [showStartModel, setShowStartModel] = useState(false);
  const [camera, setCamera] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dealsoftheday, setdealsoftheday] = useState(true);
  const [newarrivals, setnewarrivals] = useState(true);
  const [cobot, setcobot] = useState(true);

  useEffect(() => {
    document.documentElement.style.setProperty('--theme-color', '#0163d2');
    fetchAPI(`/homepage`, {
      populate: '*',
    }).then((res) => {
      setData(res.data.attributes);

    });

    fetchAPI(`/dealsofthedays`, {
      populate: '*',
      pagination: {
        limit: -1,
      },
    }).then((res) => {
      setdealsoftheday(res.data);
    });

    fetchAPI(`/categories`, {
      populate: '*',
      pagination: {
        limit: -1,
      },
    }).then((res) => {
      setCategory(res.data);
    });


  }, []);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user && user.email) {
        try {
          const response = await axios.get(`${spring_boot_url}api/users/email?email=${user.email}`);
          setuserDe(response.data);
          // startTimer(); // Start the timer
        } catch (error) {
          console.error(error);
        }
      } else if (user && user.phoneNumber) {
        let phoneNumberd = user.phoneNumber;
        phoneNumberd = phoneNumberd.replace(/\+/g, "");
        axios.get(`${spring_boot_url}api/users/phone?phoneNumber=${phoneNumberd}`)
          .then(resp => {
            console.log(resp.data.json);
            localStorage.setItem("data", JSON.stringify(resp.data));
            setuserDe(resp.data);
            if (resp.data) {
            }
          });
      }
    });
  }, []);

  useEffect(() => {
    // Check if the page is being refreshed
    const isRefreshing = performance.navigation.type === 1;
    if (isRefreshing && userDe === null) {
      setTimeout(() => {
        setShowStartModel(true);
      }, 10000); // 3000 milliseconds (3 seconds)
    } else if (!isRefreshing && userDe === null) {
      // If it's not a refresh but the user is null, show the StartModel immediately
      setShowStartModel(true);
    }
  }, [userDe]);
  // Memoize data for performance
  const memoizedData = useMemo(() => {
    return data;
  }, [data]);
  const removePadding = true;
  if (!memoizedData) {
    return (
      <>
        <Layout4 className="home-page">
          <Head>
            <title>Home</title>
            <meta name="description" content="Unbox Industry offers automation products and solutions with high performance and reliability including drives, control systems, industrial robots & cobots." />
            <meta name="keywords" content="industrial automation, industrial automation products, industrial robots & cobots, industrial grippers and sensors, cameras and industrial robot protective covers" />
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <link rel="icon" href="/Box.ico" alt="unboxLogo" />
          </Head>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className='text-center'>
              <Image src="/Logofinal.svg" alt="unboxLogo" width={200} height={64} className="mobile-logo" />
              <p style={{ marginLeft: "20px" }}>Please Wait.....</p>
            </div>
          </div>
          <Enquire />
          <FlowerSubscribe />
        </Layout4>
      </>
    );
  }
  const newVideo = [data?.NewProductVideo1,
  data?.NewProductVideo2,
  data?.NewProductVideo3,
  data?.NewProductVideo4,
  data?.NewProductVideo5,
  data?.NewProductVideo6,]
  const mobileBanner = [data?.MobileBanner1, data?.MobileBanner2, data?.MobileBanner3]
  return (
    <>
      <Layout4 className="home-page">
        <Head>
          <title>Unbox Industry</title>
          <meta name="description" content="Unbox Industry offers automation products and solutions with high performance and reliability including drives,control systems, industrial robots & cobots." />
          <meta name="keywords" content="industrial automation,industrial automation products, indusrtrial robots & cobots, industrial grippers and sensors, cameras and industrial robot protective covers  " />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel="icon" href="/Box.ico" alt="unboxLogo" />
          <link rel="canonical" href="https://www.unboxindustry.com" />
        </Head>
        <div className='d-none d-xl-block d-md-block d-sm-none'>
          {!data ? (
            <SkeletonLoader />
          ) : (
            <ElectronicHomeSlider mainSlider={data?.hero_slider} />
          )}
        </div>
        <div className='d-block d-xl-none d-md-none d-sm-block slider-container ms-2 me-2'>
          <Slider autoplay='true' pauseOnHover='false' indicators='false' arrows='false' prevIcon={null} nextIcon={null}>
            {mobileBanner?.map((banner) => (
              <img src={getStrapiMedia(banner)} style={{ maxWidth: '100%', height: 'auto' }} alt='Mobile Banner'/>
            ))}
            {/* <img src="Banner1.png" style={{ maxWidth: '100%', height: 'auto' }} />
              <img src="Banner2.png" style={{ maxWidth: '100%', height: 'auto' }} />
              <img src="Banner3.png" style={{ maxWidth: '100%', height: 'auto' }} /> */}
          </Slider>
        </div>
        {!(data) ? (
          <SkeletonLoader />
        ) : (
          <ElectronicTopBanner bannerData={data?.featured_section} />
        )}
        <FashionService removePadding={removePadding} />
        {!(dealsoftheday) ? (
          <SkeletonLoader />
        ) : (
          <ElectronicCollection productData={dealsoftheday} />
        )}
        {category ? (
          <Categories category={category} />
        ) : (
          <SkeletonLoader />
        )}
        {!(data) ? (
          <SkeletonLoader />
        ) : (
          <ElectronicHurryUp newtabsection={data} />
        )}
        {!(dealsoftheday) ? (
          <SkeletonLoader />
        ) : (
          <ElectronicInstagramShop />
        )}
        {!(data) ? (
          <SkeletonLoader />
        ) : (
          <Customers />
        )}
        {!(data) ? (
          <SkeletonLoader />
        ) : (
          <CategorizedProducts />
        )}
        {/* <cameraCategory/> */}
        {/* {/* <NewProducts newVideo={newVideo} /> */}
        {!data ? (
          <SkeletonLoader />
        ) : (
          <Brand />
        )}
        <Enquire />
        <FlowerSubscribe />
        {showStartModel && userDe === null ? <StartModel /> : null}
      </Layout4>
    </>
  );
}

export default Home;