import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import DetainTabSection from '../Common/DetailTabsection';
import ProductDetailStatic from '../Product4ImageContain/ProductDetailStatic';
import AutoFadeSliderStatic from '../Common/AutoFadeSliderStatic';
import { useRouter } from 'next/router';
import { fetchAPI } from '../../../Utils/api';
import Image from 'next/image';
import Head from 'next/head';

const ProductLeftSidebarContain = (data) => {
  const router = useRouter();
  const { id } = router.query;
  const [singleProduct, setSingleProduct] = useState(null);
  const [variations, setVariationData] = useState(null);
  const [mvariation2s, setmVariationData] = useState(null);
  const [payload, setPayload] = useState(null);
  const [idd, setidd] = useState(null);
  const [video, setVideo] = useState(null);
  useEffect(() => {
    const productData = data.data;
    // Check if SEO data exists
    if (productData?.attributes.SEO) {
      const { metaTitle, metaDescription, metaImage, keywords, structuredData } = productData.attributes.SEO;
      console.log("Title", keywords)
      // Update document title
      document.title = productData.attributes.title;
      // Update meta description
      const metaDescTag = document.querySelector('meta[name="description"]');
      if (metaDescTag) {
        metaDescTag.content = metaDescription;
      } else {
        const newMetaDescTag = document.createElement('meta');
        newMetaDescTag.name = 'description';
        newMetaDescTag.content = metaDescription;
        document.head.appendChild(newMetaDescTag);
      }
      // Update meta image
      const metaImageTag = document.querySelector('meta[name="og:image"]');
      if (metaImageTag) {
        metaImageTag.content = metaImage?.data.attributes.url;
      } else {
        const newMetaImageTag = document.createElement('meta');
        newMetaImageTag.name = 'og:image';
        newMetaImageTag.content = metaImage?.data.attributes.url;
        document.head.appendChild(newMetaImageTag);
      }
    }
    setSingleProduct(productData);
  }, [router]);
  if (!singleProduct) {
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
    <>
      <Head>
        <title>{singleProduct.attributes.product_name}</title>
        {/* {singleProduct?.attributes?.SEO && (
          <>
            <meta name="description" content={singleProduct.attributes.SEO.metaDescription} />
            <meta property="title" content={singleProduct.attributes.title} />
            <meta property="image" content={singleProduct.attributes.SEO.metaImage?.data.attributes.url} />
          </>
        )} */}
      </Head>
      <section>
        <div className='container-fluid'>
          <Row className='gx-4 gy-5'>
            <Col lg='12' xs='12'>
              <div className='details-items'>
                <Row className='g-4'>
                  <Col md='6'>
                    <AutoFadeSliderStatic singleProduct={singleProduct} id={id} payload={payload} setPayload={setPayload} />
                  </Col>
                  <Col md='6'>
                    <ProductDetailStatic singleProduct={singleProduct} id={id} variations={variations} />
                  </Col>
                </Row>
              </div>
            </Col>
            <DetainTabSection singleProduct={singleProduct} video={video} />
          </Row>
        </div>
      </section>
    </>
  );
};
export default ProductLeftSidebarContain;

