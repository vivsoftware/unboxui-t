/* eslint-disable @next/next/no-page-custom-font */
import React, { useEffect } from 'react';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { appWithTranslation } from 'next-i18next';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import CartSuccessModal from '../Components/Element/CartSuccessModal';
import CommonMobileView from '../Components/Element/CommonMobileView';
import Overlay from '../Layout/Overlay';
import '../public/assets/scss/app.scss';
import { store } from '../ReduxToolkit/store';
import CommonModel from '../Components/Element/CommonModel';
import CModel from '../Components/Element/compareModel';
import SizeModal from '../Components/Element/SizeModal';
// import YoutubeModal from '../Components/FashionDemo/YoutubeModal';
import DeleteModal from '../Components/Pages/UserDashboard/DeleteModal';
import ConfirmDeleteModal from '../Components/Pages/UserDashboard/ConfirmDeleteModal';
import CopyConfigModal from '../Layout/Common/Customizer/CopyConfigModal';
import CustomErrorComponent from './_error';
import ErrorBoundary from './errorBoundary';


function MyApp({ Component, pageProps }) {
  const bootstarpRtl = '/assets/css/bootstrap.min.css';
  const router = useRouter();

  useEffect(() => {
    router.pathname.search('/product') === -1 && document.body.classList.remove('stickyCart');
    if (router.pathname === '/page/coming_soon') {
      document.body.classList.add('light-gray-bg');
    } else if (router.pathname !== '/page/coming_soon') {
      document.body.classList.remove('light-gray-bg');
    }

  }, [router.pathname]);
  const pathArr = router.pathname.split('/');
  const titleName = pathArr[pathArr.length - (pathArr[pathArr.length - 1][0] == '[' ? 2 : 1)].split('_').map((data) => data.split().map((char, i) => char.charAt(0).toUpperCase() + char.slice(1)) + ' ');
  return (
    <>
    <ErrorBoundary>
      <Head>
      
        <meta charset="UTF-8" />
        <meta name="author" content="YOUR NAME" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
     
        <script defer src="https://unboxindustry.com"></script>
        <title>{titleName}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link id="rtl-link" rel="stylesheet" type="text/css" href={bootstarpRtl} />
        <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        {/* <script src='https://checkout.stripe.com/checkout.js'></script> */}
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
        <Overlay />
        <CartSuccessModal />
        {
          pathArr.includes('register') || pathArr.includes('login') || pathArr.includes('forgot_password') || pathArr.includes('coming_soon') || pathArr.includes('user_dashboard') !== true &&
          <CommonMobileView />
        }
        <ToastContainer />
        <SizeModal />
        <CommonModel />
        <DeleteModal />
        <ConfirmDeleteModal />
        {/* <YoutubeModal /> */}
        <CopyConfigModal />
        <CModel />
      </Provider>
      {/* <CustomErrorComponent/> */}
      </ErrorBoundary>
    </>
  );
}

export default appWithTranslation(MyApp);
