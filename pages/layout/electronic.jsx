import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ElectronicCollection from '../../Components/ElectronicDemo/ElectronicCollection';
import ElectronicHomeSlider from '../../Components/ElectronicDemo/ElectronicHomeSlider';
import ElectronicHurryUp from '../../Components/ElectronicDemo/ElectronicHurryUp';
import ElectronicInstagramShop from '../../Components/ElectronicDemo/ElectronicInstagramShop';
import ElectronicTopBanner from '../../Components/ElectronicDemo/ElectronicTopBanner';
import FashionService from '../../Components/FashionDemo/FashionService';
import Brand from '../../Components/FlowerDemo/BrandSlider';
import Layout4 from '../../Layout/Layout4';
import { fetchAPI } from '../../Utils/api';
import FlowerSubscribe from '../../Components/FlowerDemo/FlowerSubscribe';
import Enquire from './Enquire';
import NewProducts from '../../Components/ElectronicDemo/ElectronicNewProducts';

export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ['common'])) } });

const Electronic = () => {
  const [data, setData] = useState(null);
  const [productData, setProductData] = useState(null);
  
  const isCategories = true;
  useEffect(() => {
    document.documentElement.style.setProperty('--theme-color', '#0163d2');
      fetchAPI(`/homepage`,{
        populate: '*',
      }).then((res)=>{
        setData(res.data.attributes);
      });
      
      fetchAPI(`/products`,{
        populate: '*',
        pagination: {
          limit: -1,
        },
      }).then((res)=>{
        setProductData(res.data);
      });
  }, []);
  const removePadding = true;
if(!data && !productData){
  return <p>Loading.....</p>
}
console.log(data);
 
  return (
    <Layout4 isCategories={isCategories} className="home-page">
      <Head>
        {/* <title>Unbox Industry</title> */}
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel="icon" href="/Box.ico" />
      </Head>
      <ElectronicHomeSlider mainSlider={data.hero_slider} />
      <FashionService removePadding={removePadding} />
      <ElectronicTopBanner bannerData={data.featured_section}  />
      <ElectronicCollection productData={productData} />
      <ElectronicHurryUp newtabsection={data} />
      <ElectronicInstagramShop bannerData={productData} />
      <NewProducts newVideo={data.new_product}/>
      <Brand />
      <Enquire/>
      <FlowerSubscribe/>
    </Layout4>
  );

};

export default Electronic;