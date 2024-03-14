import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { CommonPath } from '../../Components/Constant';
import BreadCrumb from '../../Components/Element/BreadCrumb';
import FlowerSubscribe from '../../Components/FlowerDemo/FlowerSubscribe';
import ShopLeftSidebarContain from './Shop';
import Layout4 from '../../Layout/Layout4';
import { getAPIData } from '../../Utils';
import CanvasOffset from '../../Components/Shop/ShopCanvasFilter/CanvasOffset';
import Enquire from './Enquire';
import { fetchAPI } from '../../Utils/api';
import SearchLeftSidebarContain from './Search';
import { useRouter } from 'next/router';


export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ['common'])) } });

const SearchPage = () => {
  const [productData, setProductData] = useState([]);
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const Data = router.query;
  useEffect(() => {
    const types = ['products'];
    types.map((type) => {
      getAPIData(`${process.env.API_URL}${type}`).then((res) => {
        type === 'products' && setProductData(res?.data);
      });
    });

    Data.s && fetchAPI(`/products?filters[$and][0][product_name][$contains]=${JSON.parse(decodeURIComponent(Data.s))}&populate=*`).then((res)=>{

      setProducts(res.data);
    });
  }, [router]);
  return (
    <Layout4>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' type='image/x-icon' href={`${CommonPath}/favicon/2.png`} />
      </Head>
      <BreadCrumb parent={'All Products'} title={'All Products'} />
      <SearchLeftSidebarContain productData={productData} products={products} />
      <Enquire/>
      <FlowerSubscribe />
      <CanvasOffset productData={productData} />
    </Layout4>
  );
};

export default SearchPage;
