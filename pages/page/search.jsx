import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { CommonPath } from '../../Components/Constant';
import BreadCrumb from '../../Components/Element/BreadCrumb';
// import ArrivalCards from '../../Components/FashionDemo/FashionNewArrival/ArrivalCards';
import FlowerSubscribe from '../../Components/FlowerDemo/FlowerSubscribe';
import SearchContain from '../../Components/Pages/Search/SearchContain';
import Layout4 from '../../Layout/Layout4';
import { getAPIData } from '../../Utils';

export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ['common'])) } });

const Search = () => {
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    const type = 'products';
    getAPIData(`${process.env.API_URL}${type}`).then((res) => {
      setProductData(res?.data);
    });
  }, []);
  return (
    <Layout4>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' type='image/x-icon' href={`${CommonPath}/favicon/2.png`} />
      </Head>
      <BreadCrumb parent={'Search'} title={'Search'} />
      <SearchContain />
      <section className='ratio_asos section-b-space'>
        <Container>
          {/* <ArrivalCards productData={productData} /> */}
        </Container>
      </section>
      <FlowerSubscribe />
    </Layout4>
  );
};

export default Search;
