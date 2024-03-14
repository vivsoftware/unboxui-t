import React from 'react'
import Head from 'next/head';
import Layout4 from '../../Layout/Layout4';
import BreadCrumb from '../../Components/Element/BreadCrumb';


const allIndustrialSolution = () => {
    return (
      <div>
          <Layout4>
          <Head>
          <title>Unbox Industry-Brands</title>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel="icon" href="/Box.ico" />
        </Head>
        <BreadCrumb parent={'With our partnerships with industry leaders in automation, we can offer you the best solution.'} title={'Brands'} />
        </Layout4>
      </div>
    )
  }

export default allIndustrialSolution;