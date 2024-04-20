
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import BlogNoSidebarContain from './layout/Blog';
import { CommonPath } from '../Components/Constant';
import BreadCrumb from '../Components/Element/BreadCrumb';
import FlowerSubscribe from '../Components/FlowerDemo/FlowerSubscribe';
import Layout4 from '../Layout/Layout4';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Enquire from './layout/Enquire';
import { fetchAPI } from '../Utils/api';
import { useRouter } from 'next/router';
import PaginationSidebar from '../Components/Blog/BlogNoSider/PaginationSidebar';


export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ['common'])) } });

const BlogNoSidebar = (context) => {

  ////////////changes//////////
  const [productData, setProductData] = useState([]);
  const [show, setShow] = useState([false]);
  const [currentPages, setCurrentPage] = useState(0);
  const [totalproducts, settotalproducts] = useState();
  const [lastpage, setlastpage] = useState();

  useEffect(() => {
    fetchAPI(`/blogs`, {
      populate: "*",
      pagination: {
        start: 0,
        limit: -1,
      },
    }).then((res) => {
      settotalproducts(res.data.length);
      setlastpage(Math.floor(res.data.length / 6) + 1)

    });
  }, []);
  
  ///////////////changes//////////////
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

    if (currentPages === Math.floor(totalproducts / 6)) {
      const nextPage = currentPages - 5;
      router.push(`/blogs?page=${nextPage}`);
      setCurrentPage(nextPage)
    } else {
      const nextPage = currentPages - 1;
      router.push(`/blogs?page=${nextPage}`);
      setCurrentPage(nextPage)
    }
  };

  const pageOne = async () => {
    const nextPage = 0;
    router.push(`/blogs?page=${nextPage}`);
    setCurrentPage(nextPage)
  };

  const pageTwo = async () => {
    const nextPage = 1;
    router.push(`/blogs?page=${nextPage}`);
    setCurrentPage(nextPage)

  };
  const pageThree = async () => {
    const nextPage = currentPages + 1;
    router.push(`/blogs?page=${nextPage}`);
    setCurrentPage(nextPage)

  };
  const backPage = async () => {
    if (currentPages > 0) {
      const nextPage = currentPages - 1;
      await router.push(`/blogs?page=${nextPage}`);
      setCurrentPage(nextPage);
    }
  };
  const nextPage = async () => {
    const nextPage = currentPages + 1;
    router.push(`/blogs?page=${nextPage}`);
    setCurrentPage(nextPage)

  };
  const pageLast = async () => {
    // const nextPage = 0++;
    const nextPage = parseInt(totalproducts / 20);
    router.push(`/blogs?page=${nextPage}`);
    setCurrentPage(`${lastpage}` - 1)
    // }
  };
  const pageClick = (pageNumber) => {
    router.push(`/blogs?page=${pageNumber}`);
    setCurrentPage(pageNumber);
  };

  const itemsPerPage = 6; // Adjust this based on your desired items per page

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
  ///////////////////end/////////////

  const { locale, query } = context;
  const page = parseInt(query?.page) || 0; // Get the page from the query parameters
  // Calculate the start index based on the page and limit
  const start = page * 25;

console.log("dfhdjhf",query);
  return (
    <Layout4>
      <Head>
        <title>Blogs </title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name="title" content="Blogs" />
        <meta name="description" content="Industrial Automation Blog Best List. DH Robotics Electric Gripper, Inductive Sensors Di-Soric, Robotic Welding, What are servo grippers ?" />
        <link rel='icon' type='image/x-icon' href={`${CommonPath}/favicon/2.png`} alt="unboxLogo" />
        <link rel="canonical" href="https://www.unboxindustry.com/blogs" />
      </Head>
      <BreadCrumb parent={''} title={''} />
      <h1 className='text-center mt-1 mb-2' style={{ fontSize: '30px' }}>Blogs</h1>
      <BlogNoSidebarContain pageNumber={currentPages} start={start} />


      {/* ///////////changes//////////////// */}
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
           
            <button className="btn pagination-prev-back ms-1" onClick={nextPage}>
              Next
            </button>
          </div>
        </div>
      </div>
      {/* //////////////end///////////////// */}
      <Enquire />
      <FlowerSubscribe />
      <PaginationSidebar />
    </Layout4>
  );
};

export default BlogNoSidebar;
