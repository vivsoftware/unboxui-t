import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { CommonPath } from '../Components/Constant';
import BreadCrumb from '../Components/Element/BreadCrumb';
import FlowerSubscribe from '../Components/FlowerDemo/FlowerSubscribe';
import ShopLeftSidebarContain from './layout/Shop';
import Layout4 from '../Layout/Layout4';
import CanvasOffset from '../Components/Shop/ShopCanvasFilter/CanvasOffset';
import Enquire from './layout/Enquire';
import { fetchAPI } from '../Utils/api';
import { useRouter } from 'next/router';
import { Col, Container, Row } from 'reactstrap';
// import ReactPaginate from 'react-paginate';

const ShopLeftSidebar = (props) => {
  const [productData, setProductData] = useState([]);
  const [show, setShow] = useState([false]);
  const [currentPages, setCurrentPage] = useState(0);
  const [totalproducts, settotalproducts] = useState();
  const [lastpage, setlastpage] = useState();

  useEffect(() => {
    setShow(false)
    setProductData(props.alltopic.data);
    fetchAPI(`/products`, {
      populate: "*",
      pagination: {
        start: 0,
        limit: -1,
      },
    }).then((res) => {
      settotalproducts(res.data.length);
      setlastpage(Math.floor(res.data.length / 20) + 1)

    });
  }, []);


  let items = [];

  for (let i = 1; i <= `${lastpage}`; i++) {
    items.push(i);
  }
  console.log(items);
  const router = useRouter();
  const handleLoadMore = async () => {
    // const nextPage = 0++;
    const nextPage = currentPages + 1;
    router.push(`/shop?page=${nextPage}`);
    // Redirect to the same page with a query parameter to specify the starting point
    // window.location.href = `/shop?page=${nextPage}`;
    setCurrentPage(nextPage)
  };
  const handleLoadless = async () => {
    // const nextPage = 0++;

    if (currentPages === Math.floor(totalproducts / 20)) {
      const nextPage = currentPages - 5;
      router.push(`/shop?page=${nextPage}`);
      setCurrentPage(nextPage)
    } else {
      const nextPage = currentPages - 1;
      router.push(`/shop?page=${nextPage}`);
      setCurrentPage(nextPage)
    }
  };

  const pageOne = async () => {
    const nextPage = 0;
    router.push(`/shop?page=${nextPage}`);
    setCurrentPage(nextPage)
  };

  const pageTwo = async () => {
    const nextPage = 1;
    router.push(`/shop?page=${nextPage}`);
    setCurrentPage(nextPage)

  };
  const pageThree = async () => {
    const nextPage = currentPages + 1;
    router.push(`/shop?page=${nextPage}`);
    setCurrentPage(nextPage)

  };
  const backPage = async () => {
    if (currentPages > 0) {
      const nextPage = currentPages - 1;
      await router.push(`/shop?page=${nextPage}`);
      setCurrentPage(nextPage);
    }
  };
  const nextPage = async () => {
    const nextPage = currentPages + 1;
    router.push(`/shop?page=${nextPage}`);
    setCurrentPage(nextPage)

  };
  const pageLast = async () => {
    // const nextPage = 0++;
    const nextPage = parseInt(totalproducts / 20);
    router.push(`/shop?page=${nextPage}`);
    // setCurrentPage(nextPage)
    // if(currentPages=== lastpage){
    setCurrentPage(`${lastpage}` - 1)
    // }
  };
  const pageClick = (pageNumber) => {
    router.push(`/shop?page=${pageNumber}`);
    setCurrentPage(pageNumber);
  };

  const itemsPerPage = 5; // Adjust this based on your desired items per page

  const totalItems = totalproducts;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const renderButtons = () => {
    const buttons = [];
    const totalPagesToShow = 3; // Change this value to control how many page buttons to show at a time

    for (let i = currentPages; i < currentPages + totalPagesToShow; i++) {
      buttons.push(
        <button
          key={i + 1}
          className={`btn pagination-prev-back ms-1 ${currentPages === i ? 'active' : ''}`}
          onClick={() => pageClick(i)}
        >
          {i + 1}
        </button>
      );
    }

    return buttons;
  };
  return (
    <Layout4>
      <Head>
        <title>Shop - Unbox Industry</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name="description" content="Shop automation products and solutions with high performance including grippers,industrial & mobile robots, cobots, dispensers and cameras at best price." />
        <meta name='keywords' content="all industrial equipments " />
        <link rel='icon' type='image/x-icon' href={`${CommonPath}/favicon/2.png`} alt="unboxLogo" />
        <link rel="canonical" href="https://www.unboxindustry.com/shop" />
      </Head>
      <BreadCrumb parent={'All Products'} title={''} />
      <h1 className='text-center mt-1' style={{ fontSize: '30px' }}>All Products</h1>
      <ShopLeftSidebarContain productData={productData} products={props.alltopic.data} show={show} />
      {/* <div className='container text-center'>
       <div className='row d-flex justify-content-center align-items-center'>
        <div className='col-12'>
        <button className="btn pagination-prev-back ms-1" onClick={backPage} disabled={currentPages === 0}>Prev</button>        
          <button className="btn pagination-prev-back ms-1" onClick={pageOne}>1</button>         
          <button className="btn pagination-prev-back ms-1" onClick={pageTwo}>2</button>
          <span className='ms-1'>....</span>
          <button className="btn pagination-prev-back ms-1">{currentPages +1}</button>
           <button className="btn pagination-prev-back ms-1" onClick={nextPage}>Next</button>
           </div>
          </div>
       </div> */}
      <div className='container text-center'>
        <div className='row d-flex justify-content-center align-items-center'>
          <div className='col-12'>
            <button className="btn pagination-prev-back ms-1" onClick={backPage} disabled={currentPages === 0}>
              Prev
            </button>
            <button className="btn pagination-prev-back ms-1" onClick={pageOne} >
              1
            </button>
            <button className="btn pagination-prev-back ms-1" onClick={pageTwo} >
              2
            </button>
            <span className='ms-1'>....</span>
            {currentPages > 2 && (
              <button className="btn pagination-prev-back ms-1" onClick={() => pageClick(currentPages)}>
                {currentPages}
              </button>
            )}
            {renderButtons()}
            {/* {currentPages + 5 < totalPages && <span className='ms-1'>....</span>}
          {currentPages + 1 < totalPages && (
            <></>
            // <button className="btn pagination-prev-back ms-1" onClick={() => pageClick(currentPages + 1)}>
            //   {currentPages + 1}
            // </button>
          )} */}
            <button className="btn pagination-prev-back ms-1" onClick={nextPage}>
              Next
            </button>
          </div>
        </div>
      </div>
      <Enquire />
      <FlowerSubscribe />
      <CanvasOffset productData={productData} products={props.alltopic.data} />
    </Layout4>
  );
}
export async function getServerSideProps(context) {
  const { locale, query } = context;
  const page = parseInt(query.page) || 0; // Get the page from the query parameters
  // Calculate the start index based on the page and limit
  const start = page * 25;
  // Fetch data from the API endpoint
  const data = await fetchAPI('/products', {
    populate: '*',
    revalidate: 60,
    pagination: {
      start,
      limit: 20,
    },
  });
  return {
    props: {
      alltopic: data,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default ShopLeftSidebar;



