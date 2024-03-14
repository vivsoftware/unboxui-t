import React from 'react';
import SectionSoon from '../../Components/Pages/ComingSoon/SectionSoon';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { CommonPath } from '../../Components/Constant';
export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ['common'])) } });

const Coming_soon = () => {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' type='image/x-icon' href={`${CommonPath}/favicon/2.png`} />
      </Head>
      <SectionSoon />
    </>
  );
};

export default Coming_soon;
