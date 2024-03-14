import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import Link from 'next/link';
import Image from 'next/image';
import { getStrapiMedia } from "../Utils/media";
import { fetchAPI } from '../Utils/api';
import Head from 'next/head';
import Layout4 from '../Layout/Layout4';
import BreadCrumb from '../Components/Element/BreadCrumb';
import FlowerSubscribe from '../Components/FlowerDemo/FlowerSubscribe';
import Enquire from './layout/Enquire';
import SkeletonLoader from '../Components/Element/SkeletonLoader';
const Brands = ({ removePadding, ...props }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const brands = props.alltopic?.data;
    setData(brands);
  }, []);
  if (!data) {
    return (
      <>
        <Head>
          <title>Brands</title>
          {data?.attributes?.SEO && (
            <>
              <meta name="description" content={metaDescription} />
              <meta property="title" content={metaTitle} />
              <meta property="keywords" content={keywords} />
              <meta property="image" content={metaImage} />
            </>
          )}
        </Head>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div className='text-center'>
            <Image src="/Logofinal.svg" width={200} height={64} className="mobile-logo" alt="unboxLogo"/>
            <p style={{ marginLeft: "20px" }}>Please Wait.....</p>
          </div>
        </div>
      </>
    )

    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div className='text-center'>
            <Image src="/Logofinal.svg" width={200} height={64} className="mobile-logo" alt="unboxLogo"/>
            <p style={{ marginLeft: "20px" }}>Please Wait.....</p>
          </div>
        </div>
      </>
    )
  }


  return (
    <Layout4>
      <Head>
        <title>Brands - Unbox Industry</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel="icon" href="/Box.ico" />
        <link rel="canonical" href="https://www.unboxindustry.com/brands" />
      </Head>
      <BreadCrumb parent={''} title={''} />
      <h1 className='text-center mt-1 mb-2' style={{fontSize:'30px'}}>Our Partner Brands</h1>
      <div className='d-none d-xl-block d-md-block d-sm-none'>
        <section className={`service-section ${!removePadding ? 'service-style-2 section-b-space' : ''}`}>
          <Container fluid={true}>
            <Row className='g-4 g-sm-3 '>
              {data.map((elem) => {
                return (
                  <Col xl='3' lg='3' md='4' sm='6' key={elem.id}>
                    {data? (
                      <Link href={`/brand/${elem.id}-${elem.attributes.brand_slug}`}>
                      <Image src={getStrapiMedia(elem.attributes.brand_image)} width={300} height={300} alt={elem.attributes.brand_name} />
                    </Link>
                    ):(
                      <SkeletonLoader/>
                    )}
                  </Col>
                );
              })}
            </Row>
          </Container>
        </section>
      </div>
      <div className='d-block d-xl-none d-md-none d-sm-block'>
        <section className={`service-section ${!removePadding ? 'service-style-2 section-b-space' : ''}`}>
          <Container fluid={true}>
            <Row className='g-4 g-sm-3 '>
              {data.map((elem) => {
                return (
                  <Col className='col-6' key={elem.id}>
                    <Link href={`/brand/${elem.id}-${elem.attributes.brand_slug}`}>
                      <Image src={getStrapiMedia(elem.attributes.brand_image)} width={150} height={150} alt={elem.attributes.brand_name} />
                    </Link>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </section>
      </div>
      <Enquire />
      <FlowerSubscribe />
    </Layout4>

  );
}
export async function getStaticProps(context) {
  // Fetch data from the API endpoint3
  const data = await fetchAPI('/brands', {
    populate: '*',
    pagination: {
      start: 0,
      limit: -1,
    },
  });
  return {
    props: {
      alltopic: data,
      // ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
export default Brands;


