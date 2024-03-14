import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useState } from 'react';
import Layout4 from '../../Layout/Layout4';
import { fetchAPI } from '../../Utils/api';
import Head from 'next/head';
import BreadCrumb from '../../Components/Element/BreadCrumb';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ShopLeftSidebarContain from '../layout/Shop';
import FlowerSubscribe from '../../Components/FlowerDemo/FlowerSubscribe';
import CanvasOffset from '../../Components/Shop/ShopCanvasFilter/CanvasOffset';
import { getAPIData } from '../../Utils';
import Enquire from '../layout/Enquire';
const productByBrands = (props) => {
  const router = useRouter();
  const { slug } = router.query;
  const [productData, setProductData] = useState([]);
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState([false]);
  const [currentPages, setCurrentPage] = useState(0);

  // const handleLoadMore = async () => {
  //   setShow(true);
  //   // const nextPage = 0++;
  //   const nextPage = currentPage + 1;
  //   router.push(`/category?page=${nextPage}`);
  //   setCurrentPage(nextPage + 1)
  // };
  // const handleLoadless = async () => {
  //   const nextPage = currentPage - 1;
  //   router.push(`/category?page=${nextPage}`);
  //   setCurrentPage(nextPage - 1)
  // };

  useEffect(() => {
    const types = ['products'];
    types.map((type) => {
      getAPIData(`${process.env.API_URL}${type}`).then((res) => {
        type === 'products' && setProductData(res?.data);
      });
    });
    slug && fetchAPI(`/categories/${slug}`, {
      populate: {
        products: {
          populate: '*',
          start: `${currentPages}`*20,
          limit: '20',
        }
      }
    }).then((res) => {
      setProducts(res.data.attributes.products?.data)
      // setProducts(props.seoData?.data.attributes?.metaDescription)

    })
  }, [router])

  const backPage = async () => {
    if (currentPages > 0) {
      const nextPage = currentPages - 1;
      await router.push(`/category/${slug}?page=${nextPage}`);
      setCurrentPage(nextPage);
    }
  };
  const nextPage = async () => {
    if (products > 20){
    const nextPage = currentPages + 1;
    router.push(`/category/${slug}?page=${nextPage}`);
    setCurrentPage(nextPage)
  }
  };
  // setProducts( props.alltopic.data.attributes.products?.data)
  console.log("caterefedgf, curre", products)
  return (
    <Layout4>
      <Head>
        <title>{props.seoData?.data.attributes.category_name}</title>
        {props.seoData?.data.attributes?.SEO && (
          <>
            <meta name="description" content={props.seoData?.data.attributes?.metaDescription} />
            <meta property="title" content={props.seoData?.data.attributes?.metaTitle} />
            <meta property="image" content={props.seoData?.data.attributes?.metaImage} />
            <meta property="keywords" content={props.seoData?.data.attributes?.keywords} />
            <meta property="canonicalURL" content={props.seoData?.data.attributes?.canonicalURL} />
          </>
        )}
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <BreadCrumb parent={''} title={''} />
      <h1 className='text-center mt-1 mb-2' style={{ fontSize: '30px' }}>All Products</h1>
      <ShopLeftSidebarContain productData={productData} products={products} show={show} />

      <div className='container text-center'>
        <div className='row d-flex justify-content-center align-items-center'>
          <div className='col-1'>
            <button className="btn pagination-prev-back" onClick={backPage} disabled={currentPages === 0}>Prev</button>
          </div>
          {/* <div className='col-1'>
        <button className="btn" onClick={pageOne}>{1}</button>
        </div>
        <div className='col-1'>
        <button  className="btn" onClick={pageTwo}>{2}</button>
        </div>*/}
          <div className='col-1'>
            <p>{currentPages + 1}</p>
          </div>
          <div className='col-1'>
            <button className="btn pagination-prev-back" onClick={nextPage} disabled={products < 20}>Next</button>
          </div>
        </div>
      </div>
      <Enquire />
      <FlowerSubscribe />
      {/* <CanvasOffset productData={productData} products={props.alltopic.data.attributes?.products?.data}/> */}
    </Layout4>
  )
}
export async function getServerSideProps(context) {
  // Extract the id parameter from the context
  const { slug } = context.query;
  const {  query } = context;

  const numbersArray = slug.match(/\d+/g);
  // setbrandproducts(numbersArray.map(Number))
  const numbers = numbersArray.map(Number);


  const page = parseInt(query.page) || 0; // Get the page from the query parameters
  // Calculate the start index based on the page and limit
  const start = page * 20;
  const brandData = await fetchAPI(`/categories/${numbers}`, {
    populate: '*',
    revalidate: 60,
    pagination: {
      start: 0,
      limit: 20,
    },
  });
  // Replace 'locale' with the appropriate locale variable
  const locale = 'en'; // Change this to your desired locale
    return {
      props: {
        // alltopic: data,
        seoData: brandData,
        ...(await serverSideTranslations(locale, ['common'])),
      },
    };
  }




export default productByBrands;
