import React from 'react';
import { Col, Row } from 'reactstrap';
import { useHeaderScroll } from '../../../Utils/HeaderScroll';
import NavBar from '../../Element/NavBar';
import RightHeaderDifferent from '../../Element/RightHeaderDifferent';
import TopHeaderBar from '../../Element/TopHeaderBar';
import PrimarySearchAppBar from '../../../Components/Element/searchbar';
import Head from 'next/head';


const Header4 = ({ noStyle, isCategories, brandData, categories, industries }) => {
  const UpScroll = useHeaderScroll(false);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* //open graph tags..///// */}
        <meta property="og:title" content="Industrial Automation Company Industrial Automation Equipment  Industrial Robots  Cobots  & Gripper" />
        <meta property="og:site_name" content="Unbox Industry" />
        <meta property="og:url" content="https://www.unboxindustry.com" />
        <meta property="og:description" content="Unbox Industry is a one stop web platform for all Industrial Automation needs From gaining the knowledge to finding the product required and to select the right solution provider" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.unboxindustry.com/Logofinal.svg " />

        {/* //twitter tag...//////// */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Unbox Induistry" />
        <meta name="twitter:title" content="Industrial Automation Company | Industrial Automation Equipment " />
        <meta name="twitter:description" content="Unbox Industry is a one stop web platform for all Industrial Automation needs. From gaining the knowledge to finding the product required and to select the right solution provider." />
        <meta name="twitter:image" content="https://www.unboxindustry.com/Logofinal.svg" />


        <link rel="icon" href="/Box.ico" alt="unboxLogo" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-L44CEKP85D"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-L44CEKP85D');
            `,
          }}
        />
        {/* Google Tag Manager */}
        <link rel='manifest' href='/manifest.json' />
        <link rel='apple-touch-icon' href='/2.png'></link>
        <meta name='theme-color' content='#fff' />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w, d, s, l, i) {
                w[l] = w[l] || []; w[l].push({
                  'gtm.start': new Date().getTime(), event: 'gtm.js'
                }); var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
                'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
              })(window, document, 'script', 'dataLayer', 'GTM-P4X3S4VN');
            `,
          }}
        />
      </Head>
      <body>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P4X3S4VN"
          height="0" width="0" style={{display:"none",visibility:"hidden"}}></iframe></noscript>
      </body>
      <header id="home" className={`custom-header ${!noStyle ? `${UpScroll ? 'nav-down nav-up' : ''}` : ''}`}>
        <TopHeaderBar brands={brandData} categories={categories} industries={industries} />

        <div className="main-header navbar-searchbar">
          <div className="container-fluid">
            <Row>
              <Col lg="12">
                <div className="second-header">
                  <div className="d-none d-xl-block d-md-none">
                    <nav>
                      <NavBar brands={brandData} categories={categories} industries={industries} />
                    </nav>
                  </div>
                  <div className="d-block d-xl-none d-md-block mb-2">
                    <PrimarySearchAppBar />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header4;
